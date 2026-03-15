const realEnv = process.env;
const realFetch = global.fetch;

const noopFetch: typeof fetch = async () => new Response(null, { status: 200 });

beforeEach(() => {
  jest.resetModules();
  global.fetch = noopFetch;
  process.env = {
    ...realEnv,
    NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS: 'a',
    NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL: 'b',
    NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS: 'c',
    // NEXT_PUBLIC_SHOPIFY_TOKEN_AURA_ESSENCE: 'd',
  };
});

afterEach(() => {
  global.fetch = realFetch;
  process.env = realEnv;
});

test('throws if any token missing', async () => {
  delete process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS;
  const { getClient } = await import('./clients');
  expect(() => getClient('bearBelts')).toThrow('NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS');
});

test('exports clients when tokens present', async () => {
  const { getClient } = await import('./clients');
  expect(getClient('bearBelts')).toBeTruthy();
});

test('throws a descriptive error for an unknown client key', async () => {
  const { getClient } = await import('./clients');
  const invalidClientKey = 'unknown-brand' as import('./services').BrandKey;

  expect(() => getClient(invalidClientKey)).toThrow('Unknown Shopify client key: unknown-brand');
});

export {}
