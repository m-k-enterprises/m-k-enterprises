import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { loader } from 'graphql.macro';

import { clients } from '../clients';
import { StorefrontData, StorefrontResponse } from './shopifyTypes';
import { BrandKey } from './brandConfig';

const storefrontQuery = loader('../storefront.gql');

// 10s network timeout for Shopify storefront requests: long enough for typical responses,
// but short enough to fail fast and surface errors promptly in the UI.
const SHOPIFY_REQUEST_TIMEOUT_MS = 10 * 1000;



// Cache Shopify storefront responses for a short period to reduce network and API load
const CACHE_TTL_MINUTES = 5;
const CACHE_TTL_MS = CACHE_TTL_MINUTES * 60 * 1000;
const CACHE_MAX_ENTRIES = 10;
const STORE_LOAD_ERROR_MESSAGE = 'Failed to load storefront data';

// In-memory cache lives for the lifetime of the JS context (browser tab).
// In development with Webpack/CRA HMR, caches are cleared on module dispose (see below).
const storefrontDataCache = new Map<string, { data: StorefrontData; expiresAt: number }>();
// Track in-flight requests per cache key to de-duplicate concurrent fetches.
const inflightRequests = new Map<string, { promise: Promise<StorefrontData>; abort?: () => void }>();

const touchCacheEntry = (cacheKey: string, value: { data: StorefrontData; expiresAt: number }) => {
  // Refresh key order for LRU behavior.
  if (storefrontDataCache.has(cacheKey)) {
    storefrontDataCache.delete(cacheKey);
  }
  storefrontDataCache.set(cacheKey, value);

  if (storefrontDataCache.size > CACHE_MAX_ENTRIES) {
    const oldestKey = storefrontDataCache.keys().next().value as string | undefined;
    if (oldestKey) {
      storefrontDataCache.delete(oldestKey);
    }
  }
};

interface WebpackHotModule {
  hot: {
    dispose(callback: () => void): void;
  };
}

/**
 * Type guard that determines whether a value is a Webpack hot module object exposing a `dispose` handler.
 *
 * @param moduleRef - Value to test for the Webpack hot-module shape
 * @returns `true` if `moduleRef` has a `hot.dispose` function, `false` otherwise
 */
function hasWebpackHotModule(moduleRef: unknown): moduleRef is WebpackHotModule {
  return (
    typeof moduleRef === 'object' &&
    moduleRef !== null &&
    'hot' in (moduleRef as { hot?: unknown }) &&
    typeof (moduleRef as { hot?: { dispose?: unknown } }).hot?.dispose === 'function'
  );
}

if (
  process.env.NODE_ENV === 'development' &&
  typeof module !== 'undefined' &&
  hasWebpackHotModule(module) &&
  module.hot
) {
  // Reset in-memory caches on Webpack/CRA hot reloads so each fresh dev bundle
  // starts from a clean state. `module.hot` is injected only in development builds.
  const hot = module.hot;
  hot.dispose(() => {
    storefrontDataCache.clear();
    inflightRequests.clear();
  });
}
/**
 * Retrieve the Apollo Client instance for a given brand key.
 *
 * @param clientKey - The brand key identifying the client
 * @returns The Apollo Client associated with `clientKey`
 */
function getClient(clientKey: BrandKey): ApolloClient<NormalizedCacheObject> {
  return clients[clientKey];
}

/**
 * Produce the cache key for a given brand.
 *
 * @param clientKey - Brand identifier used to scope the storefront cache entry
 * @returns The cache key in the form `storefront:<BrandKey>`
 */
function getCacheKey(clientKey: BrandKey): string {
  return `storefront:${clientKey}`;
}

/**
 * Enforces a fail-fast timeout for an asynchronous operation, rejecting with a timeout error if the deadline elapses.
 *
 * @param promise - The promise representing the asynchronous operation to wrap.
 * @param timeoutMs - Timeout duration in milliseconds.
 * @param context - Optional context string appended to the timeout error message in parentheses.
 * @param onTimeout - Optional callback invoked when the timeout occurs (before the returned promise rejects).
 * @returns The resolved value of the wrapped operation if it completes before the timeout; otherwise rejects with an `Error` whose message is `Shopify request timed out` optionally followed by ` (context)`.
 */
function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  context?: string,
  onTimeout?: () => void
): Promise<T> {
  return new Promise((resolve, reject) => {
    // Enforce a fail-fast deadline for Shopify requests; canceled if the wrapped promise settles first.
    const timeoutId = setTimeout(() => {
      const suffix = context ? ` (${context})` : '';
      onTimeout?.();
      reject(new Error(`Shopify request timed out${suffix}`));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

/**
 * Normalise an unknown error value into an Error, prefixing its message with context.
 *
 * @param error - The value to normalise into an Error; if already an Error it is returned unchanged.
 * @param context - A short description to prefix the resulting error message with
 * @returns An Error whose message includes the provided context and the original error details
 */
function toError(error: unknown, context: string): Error {
  if (error instanceof Error) {
    const message = error.message ? `${context}: ${error.message}` : `${context}: Unknown error`;
    const wrappedError = new Error(message);
    (wrappedError as { cause?: unknown }).cause = error;
    return wrappedError;
  }

  let details = '';
  if (typeof error === 'string') {
    details = error;
  } else {
    try {
      details = JSON.stringify(error);
    } catch {
      details = String(error);
    }
  }

  return new Error(`${context}: ${details || 'Unknown error'}`);
}

/**
 * Fetch Shopify storefront data for the given brand.
 *
 * This function applies a per-brand, in-memory cache with a fixed TTL to reduce
 * network and API load. Results are cached under a key derived from the
 * {@link BrandKey} and reused for subsequent calls until the entry expires.
 *
 * Caching behavior:
 * - If a non-expired cached entry exists and {@link options.force} is not set,
 *   the cached {@link StorefrontData} is returned without issuing a network request.
 * - If {@link options.force} is true, the cache is bypassed and a fresh network
 *   request is made; the new result then replaces any existing cache entry.
 * - Cache entries expire after {@link CACHE_TTL_MS} (currently
 *   {@link CACHE_TTL_MINUTES} minutes) from the time they are stored.
 *
 * Request de-duplication:
 * - Concurrent calls for the same {@link BrandKey} share a single inflight
 *   network request. The first call creates the request; subsequent calls made
 *   before it settles receive the same Promise instance from the `inflight` map.
 * - When the request settles (either success or failure), the `inflight` entry
 *   for that key is cleared.
 *
 * Timeout handling:
 * - The underlying Apollo `client.query` call is wrapped by {@link withTimeout}
 *   with a timeout of {@link SHOPIFY_REQUEST_TIMEOUT_MS} milliseconds. If the request does not
 *   complete within this time, the returned Promise rejects with an
 *   `Error` whose message includes "Shopify request timed out" and, when
 *   available, the client context.
 *
 * Error conditions:
 * - Network, GraphQL, or other runtime errors produced by `client.query` are
 *   propagated and causes the returned Promise to reject with the same error.
 * - If the timeout elapses first, the returned Promise rejects with a timeout
 *   `Error` created by this helper.
 *
 * @param clientKey - BrandKey identifier used to select the Shopify client.
 * @param options - Optional cache control settings (use `force` to bypass cache).
 * @returns The storefront data for the requested brand.
 */
export async function fetchStorefrontData(
  clientKey: BrandKey,
  options: { force?: boolean } = {}
): Promise<StorefrontData> {
  const cacheKey = getCacheKey(clientKey);
  const cached = storefrontDataCache.get(cacheKey);
  const isCacheValid = cached ? cached.expiresAt > Date.now() : false;
  if (cached && !isCacheValid) {
    storefrontDataCache.delete(cacheKey);
  }

  if (!options.force && cached && isCacheValid) {
    touchCacheEntry(cacheKey, cached);
    return cached.data;
  }

  const existing = inflightRequests.get(cacheKey);
  if (existing && !options.force) {
    return existing.promise;
  }
  if (existing && options.force) {
    existing.abort?.();
    inflightRequests.delete(cacheKey);
  }
  const client = getClient(clientKey);
  // Use an AbortSignal when available to cancel the underlying request on timeout/force refresh;
  // withTimeout remains the single source of timeout deadlines and clears its timer on settle.
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
  const signal = controller?.signal;

  const abortRequest = controller
    ? () => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      }
    : undefined;

  let requestWithCleanup: Promise<StorefrontData>;
  const request = withTimeout(
    client
      .query<StorefrontData>({
        query: storefrontQuery,
        fetchPolicy: 'no-cache',
        context: signal ? { fetchOptions: { signal } } : undefined,
      })
      .then((result) => result.data),
    SHOPIFY_REQUEST_TIMEOUT_MS,
    `client: ${clientKey}`,
    abortRequest
  );

  const requestWithCache = request.then((data) => {
    try {
      if (inflightRequests.get(cacheKey)?.promise === requestWithCleanup) {
        touchCacheEntry(cacheKey, {
          data,
          expiresAt: Date.now() + CACHE_TTL_MS,
        });
      }
    } catch (error) {
      // Log cache population errors at debug level so they don't affect callers but can be diagnosed.
      console.debug('Failed to populate storefront data cache', {
        clientKey,
        cacheKey,
        error,
      });
    }
    return data;
  });

  requestWithCleanup = requestWithCache.finally(() => {
    if (inflightRequests.get(cacheKey)?.promise === requestWithCleanup) {
      inflightRequests.delete(cacheKey);
    }
  });

  inflightRequests.set(cacheKey, { promise: requestWithCleanup, abort: abortRequest });
  return requestWithCleanup;
}

/**
 * Clears the in-memory storefront cache for a specific brand or for all brands.
 *
 * @param clientKey - When provided, removes the cache entry for the given brand; when omitted, clears all cache entries.
 */
export function clearStorefrontCache(clientKey?: BrandKey) {
  if (clientKey) {
    storefrontDataCache.delete(getCacheKey(clientKey));
    return;
  }
  storefrontDataCache.clear();
}

/**
 * React hook that provides Shopify storefront data and loading state for a given brand.
 *
 * @param clientKey - The BrandKey identifying which storefront client/brand to load data for
 * @returns An object with:
 *  - `data`: the fetched `StorefrontData` or `null` if unavailable,
 *  - `error`: an `Error` describing the last failure or `null` if none,
 *  - `loading`: `true` while a fetch is in progress, `false` otherwise,
 *  - `retry`: a function that re-fetches storefront data bypassing the cache
 */
export function useStorefrontData(clientKey: BrandKey): StorefrontResponse {
  const mountedRef = React.useRef(false);
  const [state, setState] = React.useState<{
    data: StorefrontData | null;
    error: Error | null;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: true,
  });

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadData = React.useCallback(
    async (force?: boolean) => {
      if (!mountedRef.current) {
        return;
      }
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await fetchStorefrontData(clientKey, { force });
        if (!mountedRef.current) {
          return;
        }
        setState({ data, error: null, loading: false });
      } catch (error) {
        if (!mountedRef.current) {
          return;
        }
        const normalizedError = toError(error, STORE_LOAD_ERROR_MESSAGE);
        setState({ data: null, error: normalizedError, loading: false });
        return;
      }
    },
    [clientKey]
  );

  React.useEffect(() => {
    let active = true;

    if (!mountedRef.current) {
      return () => {
        active = false;
      };
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetchStorefrontData(clientKey)
      .then((data) => {
        if (!active || !mountedRef.current) {
          return;
        }
        setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (!active || !mountedRef.current) {
          return;
        }
        setState({ data: null, error: toError(error, STORE_LOAD_ERROR_MESSAGE), loading: false });
      });

    return () => {
      active = false;
    };
  }, [clientKey]);

  const retry = React.useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    retry,
  };
}