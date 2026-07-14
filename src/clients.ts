import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import type { BrandKey } from './services/brandConfig';

interface ClientOptions {
  uri: string;
  shopifyStorefrontAccessToken: string;
}

const storefrontPaths: Record<BrandKey, string> = {
  bearBelts: 'bear-belts',
  pocketBearsApparel: 'pocket-bears-apparel',
  mythicalMoods: 'mythical-moods',
};

const clientCache = new Map<BrandKey, ApolloClient<NormalizedCacheObject>>();

function requireEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }

  return value;
}

function getStorefrontToken(clientKey: BrandKey): string {
  switch (clientKey) {
    case 'bearBelts':
      return requireEnvVar(
        'NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS',
        process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS,
      );
    case 'pocketBearsApparel':
      return requireEnvVar(
        'NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL',
        process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL,
      );
    case 'mythicalMoods':
      return requireEnvVar(
        'NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS',
        process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS,
      );
  }
}

function newClient(options: ClientOptions): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: `https://${options.uri}.myshopify.com/api/2022-10/graphql.json`,
    cache: new InMemoryCache(),
    headers: {
      'X-Shopify-Storefront-Access-Token': options.shopifyStorefrontAccessToken,
    },
  });
}

function getClient(clientKey: BrandKey): ApolloClient<NormalizedCacheObject> {
  const cachedClient = clientCache.get(clientKey);
  if (cachedClient) {
    return cachedClient;
  }

  const client = newClient({
    uri: storefrontPaths[clientKey],
    shopifyStorefrontAccessToken: getStorefrontToken(clientKey),
  });
  clientCache.set(clientKey, client);

  return client;
}

/**
 * Lazily configured Apollo clients for each active Shopify storefront.
 *
 * Lazy creation allows Next.js to prerender the loading UI without requiring
 * browser-only storefront tokens during the server build phase.
 */
export const clients = {
  get bearBelts() {
    return getClient('bearBelts');
  },
  get pocketBearsApparel() {
    return getClient('pocketBearsApparel');
  },
  get mythicalMoods() {
    return getClient('mythicalMoods');
  },
};
