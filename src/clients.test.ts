const realEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...realEnv,
    REACT_APP_SHOPIFY_TOKEN_BEAR_BELTS: 'a',
    REACT_APP_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL: 'b',
    REACT_APP_SHOPIFY_TOKEN_MYTHICAL_MOODS: 'c',
    REACT_APP_SHOPIFY_TOKEN_AURA_ESSENCE: 'd',
  };
});

afterEach(() => {
  process.env = realEnv;
});

test('throws if any token missing', () => {
  delete process.env.REACT_APP_SHOPIFY_TOKEN_BEAR_BELTS;
  expect(() => require('./clients')).toThrow('REACT_APP_SHOPIFY_TOKEN_BEAR_BELTS');
});

test('exports clients when tokens present', () => {
  const { clients } = require('./clients');
  expect(clients.bearBelts).toBeTruthy();
});

export {}

