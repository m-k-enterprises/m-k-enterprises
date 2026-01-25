import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { loader } from 'graphql.macro';

import { clients } from '../clients';
import { StorefrontData, StorefrontResponse } from './shopifyTypes';
import { BrandKey } from './brandConfig';

const storefrontQuery = loader('../storefront.gql');

// Cache Shopify storefront responses for a short period to reduce network and API load
// 10s network timeout for Shopify storefront requests: long enough for typical responses,
// but short enough to fail fast and surface errors promptly in the UI.
const TIMEOUT_MS = 10 * 1000;

const CACHE_TTL_MINUTES = 5;
const CACHE_TTL_MS = CACHE_TTL_MINUTES * 60 * 1000;


const cache = new Map<string, { data: StorefrontData; expiresAt: number }>();
const inflight = new Map<string, Promise<StorefrontData>>();

if (process.env.NODE_ENV === 'development' && typeof module !== 'undefined') {
  // Reset in-memory caches on Webpack/Cra hot reloads so each fresh dev bundle
  // starts from a clean state. `module.hot` is injected only in development builds.
  const hot = (module as any).hot;
  if (hot) {
    hot.dispose(() => {
      cache.clear();
      inflight.clear();
    });
  }
}

function getClient(clientKey: BrandKey): ApolloClient<NormalizedCacheObject> {
  return clients[clientKey];
}

function getCacheKey(clientKey: BrandKey): string {
  return `storefront:${clientKey}`;
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, context?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    // Note: the timeout fires after timeoutMs unless the promise settles first and clears it.
    const timeoutId = setTimeout(() => {
      const suffix = context ? ` (${context})` : '';
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

export async function fetchStorefrontData(
  clientKey: BrandKey,
  options: { force?: boolean } = {}
): Promise<StorefrontData> {
  const cacheKey = getCacheKey(clientKey);
  const cached = cache.get(cacheKey);

  if (!options.force && cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const existing = inflight.get(cacheKey);
  if (existing) {
    return existing;
  }

  const client = getClient(clientKey);
  const request = withTimeout(
    client.query<StorefrontData>({
      query: storefrontQuery,
      fetchPolicy: 'network-only',
    }).then((result) => result.data),
    TIMEOUT_MS,
    `client: ${clientKey}`
  ).then((data) => {
    cache.set(cacheKey, {
      data,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });
    return data;
  }).finally(() => {
    inflight.delete(cacheKey);
  });

  inflight.set(cacheKey, request);
  return request;
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
        setState({ data: null, error: error as Error, loading: false });
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
        setState({ data: null, error: error as Error, loading: false });
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
