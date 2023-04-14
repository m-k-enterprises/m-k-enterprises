import { ApolloClient, ApolloClientOptions, InMemoryCache } from "@apollo/client";

interface ClientOptions extends Partial<ApolloClientOptions<{}>> {
  shopifyStorefrontAccessToken: string
}

const clientOptions: Record<string, ClientOptions> = {
  bearBelts: {
    uri: 'bear-belts',
    shopifyStorefrontAccessToken: '1a84bba7608ae9b7f41a2ada2ed9c027'
  },
  pocketBearsApparel: {
    uri: 'pocket-bears-apparel',
    shopifyStorefrontAccessToken: '54225ccecffca9cdf820eb2731875a1c'
  },
  sizzleSoak: {
    uri: 'sizzle-soak',
    shopifyStorefrontAccessToken: 'dc452ad191d85ab510f87a622bdc9b1d'
  }
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

export const clients = {
  bearBelts: newClient(clientOptions.bearBelts),
  pocketBearsApparel: newClient(clientOptions.pocketBearsApparel),
  sizzleSoak: newClient(clientOptions.sizzleSoak)
}