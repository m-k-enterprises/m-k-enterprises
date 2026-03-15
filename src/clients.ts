import { ApolloClient, ApolloClientOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import type { BrandKey } from './services';

interface ClientOptions extends Partial<ApolloClientOptions<NormalizedCacheObject>> {
  shopifyStorefrontAccessToken: string
}

const SHOPIFY_STOREFRONT_API_VERSION = '2026-01';

function requireEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

const clientDefinitions: Record<BrandKey, { uri: string; getToken: () => string | undefined; envVarName: string }> = {
  bearBelts: {
    uri: 'bear-belts',
    envVarName: 'NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS',
    getToken: () => process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS,
  },
  pocketBearsApparel: {
    uri: 'pocket-bears-apparel',
    envVarName: 'NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL',
    getToken: () => process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL,
  },
  mythicalMoods: {
    uri: 'mythical-moods',
    envVarName: 'NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS',
    getToken: () => process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS,
  },
  // sizzleSoak temporarily disabled
  // sizzleSoak: {
  //   uri: 'sizzle-soak',
  //   envVarName: 'NEXT_PUBLIC_SHOPIFY_TOKEN_SIZZLE_SOAK',
  //   getToken: () => process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_SIZZLE_SOAK,
  // },
  // auraEssence temporarily disabled
  // auraEssence: {
  //   uri: 'aura-and-essence',
  //   envVarName: 'NEXT_PUBLIC_SHOPIFY_TOKEN_AURA_ESSENCE',
  //   getToken: () => process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_AURA_ESSENCE,
  // },
};

const clientCache = new Map<BrandKey, ApolloClient<NormalizedCacheObject>>();

function newClient(options: ClientOptions) {
  return new ApolloClient({
    uri: `https://${options.uri}.myshopify.com/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`,
    cache: new InMemoryCache(),
    headers: {
      'X-Shopify-Storefront-Access-Token': options.shopifyStorefrontAccessToken,
    },
  });
}

function getClientOptions(clientKey: BrandKey): ClientOptions {
  const definition = clientDefinitions[clientKey];

  return {
    uri: definition.uri,
    shopifyStorefrontAccessToken: requireEnvVar(definition.envVarName, definition.getToken()),
  };
}

export function getClient(clientKey: BrandKey): ApolloClient<NormalizedCacheObject> {
  const cachedClient = clientCache.get(clientKey);
  if (cachedClient) {
    return cachedClient;
  }

  const client = newClient(getClientOptions(clientKey));
  clientCache.set(clientKey, client);
  return client;
}

/**
 * Pre-configured Apollo clients for each Shopify store.
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
  // get sizzleSoak() {
  //   return getClient('sizzleSoak');
  // },
  // get auraEssence() {
  //   return getClient('auraEssence');
  // },
};
