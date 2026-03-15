import { renderHook, waitFor } from '@testing-library/react';

import type { StorefrontData } from './shopifyTypes';

const mockQuery = jest.fn();

jest.mock('../clients', () => ({
  clients: {
    bearBelts: {
      query: (...args: unknown[]) => mockQuery(...args),
    },
    pocketBearsApparel: {
      query: jest.fn(),
    },
    mythicalMoods: {
      query: jest.fn(),
    },
  },
}));

import { clearStorefrontCache, fetchStorefrontData, useStorefrontData } from './shopifyData';

const storefrontData: StorefrontData = {
  shop: {
    id: 'bear-belts',
    name: 'Bear Belts',
    shipsToCountries: ['GB'],
    primaryDomain: { url: 'https://bearbelts.example.com' },
    brand: {
      slogan: 'Belts for bears',
      shortDescription: 'Belts for discerning bears.',
      colors: {
        primary: [{ background: '#202e52', foreground: '#ffffff' }],
      },
    },
  },
  articles: {
    nodes: [],
  },
};

beforeEach(() => {
  clearStorefrontCache();
  jest.clearAllMocks();
  mockQuery.mockResolvedValue({ data: storefrontData });
});

afterEach(() => {
  clearStorefrontCache();
});

test('uses cached storefront data immediately after remount', async () => {
  await fetchStorefrontData('bearBelts');
  expect(mockQuery).toHaveBeenCalledTimes(1);

  const { result } = renderHook(() => useStorefrontData('bearBelts'));

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual(storefrontData);
  expect(result.current.error).toBeNull();

  await waitFor(() => {
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });
});
