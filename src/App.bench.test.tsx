import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock React to bypass lazy loading and Suspense
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    // Replace lazy with a function that returns a simple component synchronously
    lazy: () => () => <div>MockedRoute</div>,
    // Replace Suspense with a simple fragment to avoid any suspense-related reconciliation
    Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

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

describe('App performance benchmark', () => {
  beforeEach(() => {
    mockUseQuery.mockClear();
  });

  test('App renders efficiently when data is cached (immediate load)', () => {
    // Setup mock to return loaded data immediately
    // This simulates a "hot cache" scenario where data is available on the first render.
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: mockData,
    });

    render(<App />);

    // Optimized implementation with bypassed Suspense:
    // 1. Initial Render (Data loaded immediately) -> Render App -> Render Route (Sync).
    // Derived state calculated during render.
    // Expect 1 render. 4 queries per render.
    // So 4 calls to useQuery.
    expect(mockUseQuery).toHaveBeenCalledTimes(4);
  });

  test('App renders efficiently during data loading transition', () => {
    // 1. Setup mock for INITIAL render (Loading state)
    // We expect 4 queries, so we mock the first 4 calls to return loading.
    mockUseQuery.mockReturnValueOnce({ loading: true, error: undefined, data: undefined }); // query 1
    mockUseQuery.mockReturnValueOnce({ loading: true, error: undefined, data: undefined }); // query 2
    mockUseQuery.mockReturnValueOnce({ loading: true, error: undefined, data: undefined }); // query 3
    mockUseQuery.mockReturnValueOnce({ loading: true, error: undefined, data: undefined }); // query 4

    // 2. Setup mock for SUBSEQUENT renders (Loaded state)
    // Any calls after the first 4 will return loaded data.
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: mockData,
    });

    const { rerender } = render(<App />);

    // Initial render should trigger 4 calls (Loading).

    // Simulate data arrival by forcing a re-render.
    // In a real app, Apollo would trigger this. Here we manually trigger the next render phase.
    rerender(<App />);

    // Counts with Bypassed Suspense (Deterministic):
    // 1. Initial Render (Loading): 4 calls.
    // 2. Rerender (Loaded): 4 calls.
    // Total: 8 calls.
    // Note: By mocking Suspense as a fragment, we ensure no intermediate renders occur.

    expect(mockUseQuery).toHaveBeenCalledTimes(8);
  });
});
