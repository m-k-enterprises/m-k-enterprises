const realEnv = process.env;
const tokenPrefix = 'NEXT_PUBLIC_SHOPIFY_TOKEN_';

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...realEnv,
    [`${tokenPrefix}BEAR_BELTS`]: 'a',
    [`${tokenPrefix}POCKET_BEARS_APPAREL`]: 'b',
    [`${tokenPrefix}MYTHICAL_MOODS`]: 'c',
    [`${tokenPrefix}AURA_ESSENCE`]: 'd',
  } as NodeJS.ProcessEnv;
});

afterEach(() => {
  process.env = realEnv;
});

test('throws if any token missing', () => {
  delete process.env[`${tokenPrefix}BEAR_BELTS`];
  expect(() => require('./clients')).toThrow(`${tokenPrefix}BEAR_BELTS`);
});

test('exports clients when tokens present', () => {
  const { clients } = require('./clients');
  expect(clients.bearBelts).toBeTruthy();
});

export {}

