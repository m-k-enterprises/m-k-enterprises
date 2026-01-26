import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { loader } from 'graphql.macro';

import { clients } from '../clients';
import { StorefrontData, StorefrontResponse } from './shopifyTypes';
import { BrandKey } from './brandConfig';

const storefrontQuery = loader('../storefront.gql');

// 10s network timeout for Shopify storefront requests: long enough for typical responses,
// but short enough to fail fast and surface errors promptly in the UI.
const TIMEOUT_MS = 10 * 1000;

// Cache Shopify storefront responses for a short period to reduce network and API load
const CACHE_TTL_MINUTES = 5;
const CACHE_TTL_MS = CACHE_TTL_MINUTES * 60 * 1000;

const cache = new Map<string, { data: StorefrontData; expiresAt: number }>();
const inflight = new Map<string, Promise<StorefrontData>>();

interface WebpackHotModule {
  hot: {
    dispose(callback: () => void): void;
  };
}

function hasHotModule(value: unknown): value is WebpackHotModule {
  return (
    typeof value === 'object' &&
    value !== null &&
    'hot' in (value as { hot?: unknown }) &&
    typeof (value as { hot?: { dispose?: unknown } }).hot?.dispose === 'function'
  );
}

if (
  process.env.NODE_ENV === 'development' &&
  typeof module !== 'undefined' &&
  hasHotModule(module) &&
  module.hot
) {
  // Reset in-memory caches on Webpack/CRA hot reloads so each fresh dev bundle
  // starts from a clean state. `module.hot` is injected only in development builds.
  const hot = module.hot;
  hot.dispose(() => {
    cache.clear();
    inflight.clear();
  });
}
function getClient(clientKey: BrandKey): ApolloClient<NormalizedCacheObject> {
  return clients[clientKey];
}

function getCacheKey(clientKey: BrandKey): string {
  return `storefront:${clientKey}`;
}

function getTimeoutSignal(timeoutMs: number): AbortSignal | undefined {
  if (typeof AbortSignal === 'undefined') {
    return undefined;
  }

  const timeout = (AbortSignal as { timeout?: (ms: number) => AbortSignal }).timeout;
  return typeof timeout === 'function' ? timeout(timeoutMs) : undefined;
}

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

function toError(error: unknown, context: string): Error {
  if (error instanceof Error) {
    return error;
  }

  const details = typeof error === 'string' ? error : JSON.stringify(error);
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
 *   with a timeout of {@link TIMEOUT_MS} milliseconds. If the request does not
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
  const cached = cache.get(cacheKey);

  const existing = inflight.get(cacheKey);
  if (existing) {
    return existing;
  }

  if (!options.force && cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }
  const client = getClient(clientKey);
  const timeoutSignal = getTimeoutSignal(TIMEOUT_MS);
  const controller =
    !timeoutSignal && typeof AbortController !== 'undefined' ? new AbortController() : undefined;
  const signal = timeoutSignal ?? controller?.signal;
  const request = withTimeout(
    client
      .query<StorefrontData>({
        query: storefrontQuery,
        fetchPolicy: 'no-cache',
        context: signal ? { fetchOptions: { signal } } : undefined,
      })
      .then((result) => result.data),
    TIMEOUT_MS,
    `client: ${clientKey}`,
    controller
      ? () => {
          if (!controller.signal.aborted) {
            controller.abort();
          }
        }
      : undefined
  );

  const requestWithCache = request.then((data) => {
    try {
      cache.set(cacheKey, {
        data,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
    } catch {
      // Ignore cache population errors so they don't affect callers.
    }
    return data;
  });

  const requestWithCleanup = requestWithCache.finally(() => {
    inflight.delete(cacheKey);
  });

  inflight.set(cacheKey, requestWithCleanup);
  return requestWithCleanup;
}

export function clearStorefrontCache(clientKey?: BrandKey) {
  if (clientKey) {
    cache.delete(getCacheKey(clientKey));
    return;
  }
  cache.clear();
}

export function useStorefrontData(clientKey: BrandKey): StorefrontResponse {
  const [state, setState] = React.useState<{
    data: StorefrontData | null;
    error: Error | null;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: true,
  });

  const loadData = React.useCallback(
    async (force?: boolean) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await fetchStorefrontData(clientKey, { force });
        setState({ data, error: null, loading: false });
      } catch (error) {
        setState({ data: null, error: toError(error, 'Failed to load storefront data'), loading: false });
      }
    },
    [clientKey]
  );

  React.useEffect(() => {
    let active = true;

    fetchStorefrontData(clientKey)
      .then((data) => {
        if (!active) {
          return;
        }
        setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (!active) {
          return;
        }
        setState({ data: null, error: toError(error, 'Failed to load storefront data'), loading: false });
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
