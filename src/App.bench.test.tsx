import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

const mockUseStorefrontData = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('./services/storefront', () => ({
  useStorefrontData: (clientKey: string) => mockUseStorefrontData(clientKey),
}));

const mockData = {
  shop: {
    id: '1',
    name: 'Test Shop',
    shipsToCountries: [],
    primaryDomain: { url: 'http://test.com' },
  },
  articles: {
    nodes: [],
  },
};

describe('App performance benchmark', () => {
  beforeEach(() => {
    mockUseStorefrontData.mockReset();
  });

  test('queries each storefront once when cached data is available', () => {
    mockUseStorefrontData.mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
      retry: jest.fn(),
    });

    render(<App />);

    expect(mockUseStorefrontData).toHaveBeenCalledTimes(3);
  });

  test('queries each storefront once per render during a loading sequence', () => {
    mockUseStorefrontData
      .mockReturnValueOnce({ loading: true, error: null, data: null, retry: jest.fn() })
      .mockReturnValueOnce({ loading: true, error: null, data: null, retry: jest.fn() })
      .mockReturnValueOnce({ loading: true, error: null, data: null, retry: jest.fn() })
      .mockReturnValue({
        loading: false,
        error: null,
        data: mockData,
        retry: jest.fn(),
      });

    const { rerender } = render(<App />);
    rerender(<App />);

    expect(mockUseStorefrontData).toHaveBeenCalledTimes(6);
  });
});
