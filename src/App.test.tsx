import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the clients module
jest.mock('./clients', () => {
  const { ApolloClient, InMemoryCache } = require('@apollo/client');
  const { MockLink } = require('@apollo/client/testing');

  // Create a factory for mock clients
  const createMockClient = () => new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink([]), // No requests expected or handled by default
  });

  return {
    clients: {
      bearBelts: createMockClient(),
      pocketBearsApparel: createMockClient(),
      mythicalMoods: createMockClient(),
      auraEssence: createMockClient(),
    }
  };
});

test('App renders without crashing', () => {
  render(<App />);
  // Check for the spinner or loading text.
  // App shows Suspense fallback "Loading..." (visually hidden span) and maybe some structure.
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
