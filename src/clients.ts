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

const tokenPrefix = 'NEXT_PUBLIC_SHOPIFY_TOKEN_' as const

/**
 * Returns the Shopify storefront token for the given store.
 */
function token(name: string): string {
  return requireEnvVar(`${tokenPrefix}${name}`)
}

const clientOptions: Record<string, ClientOptions> = {
  bearBelts: {
    uri: 'bear-belts',
    shopifyStorefrontAccessToken: token('BEAR_BELTS'),
  },
  pocketBearsApparel: {
    uri: 'pocket-bears-apparel',
    shopifyStorefrontAccessToken: token('POCKET_BEARS_APPAREL'),
  },
  mythicalMoods: {
    uri: 'mythical-moods',
    shopifyStorefrontAccessToken: token('MYTHICAL_MOODS'),
  },
  auraEssence: {
    uri: 'aura-and-essence',
    shopifyStorefrontAccessToken: token('AURA_ESSENCE'),
  },
  // sizzleSoak temporarily disabled
  // sizzleSoak: {
  //   uri: 'sizzle-soak',
  //   shopifyStorefrontAccessToken: requireEnvVar('NEXT_PUBLIC_SHOPIFY_TOKEN_SIZZLE_SOAK'),
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
