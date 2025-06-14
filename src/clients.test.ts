const realEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...realEnv,
    REACT_APP_BEAR_BELTS_TOKEN: 'a',
    REACT_APP_POCKET_BEARS_APPAREL_TOKEN: 'b',
    REACT_APP_SIZZLE_SOAK_TOKEN: 'c',
  };
});

afterEach(() => {
  process.env = realEnv;
});

test('throws if any token missing', () => {
  delete process.env.REACT_APP_BEAR_BELTS_TOKEN;
  expect(() => require('./clients')).toThrow('REACT_APP_BEAR_BELTS_TOKEN');
});

test('exports clients when tokens present', () => {
  const { clients } = require('./clients');
  expect(clients.bearBelts).toBeTruthy();
});

