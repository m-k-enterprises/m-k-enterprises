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

const SHOPIFY_STOREFRONT_API_VERSION = '2026-07';

const clientCache = new Map<BrandKey, ApolloClient<NormalizedCacheObject>>();

/**
 * Retrieves a configured environment variable value.
 *
 * @param name - The environment variable name used in the missing-value error
 * @param value - The environment variable value
 * @returns The configured value
 * @throws If `value` is missing
 */
function requireEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }

  return value;
}

/**
 * Retrieves the configured Shopify Storefront access token for a brand.
 *
 * @param clientKey - The brand whose storefront token is required
 * @returns The configured Shopify Storefront access token
 */
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

/**
 * Creates an Apollo client for a Shopify storefront.
 *
 * @param options - The storefront hostname segment and access token.
 * @returns A configured Apollo client for the storefront's GraphQL API.
 */
function newClient(options: ClientOptions): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: `https://${options.uri}.myshopify.com/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`,
    cache: new InMemoryCache(),
    headers: {
      'X-Shopify-Storefront-Access-Token': options.shopifyStorefrontAccessToken,
    },
  });
}

/**
 * Retrieves the Apollo client for a storefront, creating and caching it when necessary.
 *
 * @param clientKey - Identifies the storefront whose client should be retrieved
 * @returns The Apollo client configured for the specified storefront
 */
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
