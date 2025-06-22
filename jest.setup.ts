import '@testing-library/jest-dom/extend-expect';
import 'cross-fetch/polyfill';

const tokenPrefix = 'NEXT_PUBLIC_SHOPIFY_TOKEN_';
beforeAll(() => {
  process.env[`${tokenPrefix}BEAR_BELTS`] ||= 'a';
  process.env[`${tokenPrefix}POCKET_BEARS_APPAREL`] ||= 'b';
  process.env[`${tokenPrefix}MYTHICAL_MOODS`] ||= 'c';
  process.env[`${tokenPrefix}AURA_ESSENCE`] ||= 'd';
});
