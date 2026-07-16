/** @jest-environment node */

const realEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...realEnv,
    NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS: 'a',
    NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL: 'b',
    NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS: 'c',
  };
});

afterEach(() => {
  process.env = realEnv;
});

test('throws if any token missing', async () => {
  delete process.env.NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS;
  const { clients } = await import('./clients');

  expect(() => clients.bearBelts).toThrow('NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS');
});

test('exports clients when tokens present', async () => {
  const { clients } = await import('./clients');
  expect(clients.bearBelts).toBeTruthy();
});

export {};
