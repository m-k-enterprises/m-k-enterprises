import { ApolloClient, ApolloClientOptions, InMemoryCache } from '@apollo/client';

interface ClientOptions extends Partial<ApolloClientOptions<{}>> {
  shopifyStorefrontAccessToken: string
}

function requireEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env variable: ${name}`)
  }
  return value
}

const clientOptions: Record<string, ClientOptions> = {
  bearBelts: {
    uri: 'bear-belts',
    shopifyStorefrontAccessToken: requireEnvVar('REACT_APP_SHOPIFY_TOKEN_BEAR_BELTS')
  },
  pocketBearsApparel: {
    uri: 'pocket-bears-apparel',
    shopifyStorefrontAccessToken: requireEnvVar('REACT_APP_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL')
  },
  mythicalMoods: {
    uri: 'mythical-moods',
    shopifyStorefrontAccessToken: requireEnvVar('REACT_APP_SHOPIFY_TOKEN_MYTHICAL_MOODS')
  },
  auraEssence: {
    uri: 'aura-essence',
    shopifyStorefrontAccessToken: requireEnvVar('REACT_APP_SHOPIFY_TOKEN_AURA_ESSENCE')
  },
  // sizzleSoak temporarily disabled
  // sizzleSoak: {
  //   uri: 'sizzle-soak',
  //   shopifyStorefrontAccessToken: requireEnvVar('REACT_APP_SHOPIFY_TOKEN_SIZZLE_SOAK'),
  // }
};

function newClient(options: ClientOptions) {
  return new ApolloClient({
    uri: `https://${options.uri}.myshopify.com/api/2022-10/graphql.json`,
    cache: new InMemoryCache(),
    headers: {
      'X-Shopify-Storefront-Access-Token': options.shopifyStorefrontAccessToken
    }
  });
}

/**
 * Pre-configured Apollo clients for each Shopify store.
 */
export const clients = {
  bearBelts: newClient(clientOptions.bearBelts),
  pocketBearsApparel: newClient(clientOptions.pocketBearsApparel),
  mythicalMoods: newClient(clientOptions.mythicalMoods),
  auraEssence: newClient(clientOptions.auraEssence),
  // sizzleSoak: newClient(clientOptions.sizzleSoak),
};
