import { renderHook, waitFor } from '@testing-library/react';

var mockQuery: jest.Mock;
jest.mock('../clients', () => {
  mockQuery = jest.fn();
  return {
    clients: {
      bearBelts: { query: mockQuery },
      pocketBearsApparel: { query: mockQuery },
      mythicalMoods: { query: mockQuery },
      auraEssence: { query: mockQuery },
    },
  };
});

import useStorefront from './useStorefront';

const mockResponse = {
  data: {
    shop: { id: '1', name: 'x', shipsToCountries: [], primaryDomain: { url: 'u' } },
    articles: { nodes: [{ id: 'a', title: 't', publishedAt: '', onlineStoreUrl: '' }] },
  },
};

describe('useStorefront', () => {
  it('loads shops and articles', async () => {
    mockQuery.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useStorefront());
    await waitFor(() => !result.current.loading);
    expect(mockQuery).toHaveBeenCalled();
  });
});
