const realEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...realEnv,
    NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS: 'a',
    NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL: 'b',
    NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS: 'c',
    NEXT_PUBLIC_SHOPIFY_TOKEN_AURA_ESSENCE: 'd',
  };
});

afterEach(() => {
  process.env = realEnv;
});

test('throws if any token missing', () => {
  delete process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS;
  expect(() => require('./clients')).toThrow('NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS');
});

test('exports clients when tokens present', () => {
  const { clients } = require('./clients');
  expect(clients.bearBelts).toBeTruthy();
});

export {}

