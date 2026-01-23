import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock the clients module
jest.mock('./clients', () => {
  return {
    clients: {
      bearBelts: {},
      pocketBearsApparel: {},
      mythicalMoods: {},
      auraEssence: {},
    }
  };
});

const mockUseQuery = jest.fn();

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: (...args: any[]) => mockUseQuery(...args),
}));

// Mock data
const mockShop = {
  id: '1',
  name: 'Test Shop',
  shipsToCountries: [],
  primaryDomain: { url: 'http://test.com' },
};

const mockArticles = {
  nodes: [],
};

const mockData = {
  shop: mockShop,
  articles: mockArticles,
};

test('App renders optimization benchmark', () => {
  // Setup mock to return loaded data immediately
  mockUseQuery.mockReturnValue({
    loading: false,
    error: undefined,
    data: mockData,
  });

  render(<App />);

  // Optimized implementation:
  // 1. Initial Render (Data loaded immediately due to mock)
  // Derived state (shops/articles) calculated during render.
  // No useEffect setting state -> No re-render.
  // Expect 1 render. 4 queries per render.
  // So 4 calls to useQuery.
  expect(mockUseQuery).toHaveBeenCalledTimes(4);
});
