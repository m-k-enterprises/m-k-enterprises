import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('./services/storefront', () => ({
  useStorefrontData: () => ({
    loading: true,
    error: null,
    data: null,
    retry: jest.fn(),
  }),
}));

test('renders the shared site shell', () => {
  render(
    <App>
      <h1>Page content</h1>
    </App>,
  );

  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /M-K Enterprises/i })).toHaveAttribute('href', '/');
  expect(screen.getByRole('heading', { name: 'Page content' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
    'href',
    '/privacy-policy',
  );
});
