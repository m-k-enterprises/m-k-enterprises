'use strict';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    __esModule: true,
    ...actual,
    ApolloClient: jest.fn().mockImplementation(() => ({})),
    InMemoryCache: jest.fn(),
    useQuery: () => ({ data: null, loading: false, error: null }),
  };
});

test('shows privacy link', async () => {
  await act(async () => {
    render(<App />);
  });
  const link = await screen.findByRole('link', { name: /privacy policy/i });
  expect(link).toBeInTheDocument();
});
