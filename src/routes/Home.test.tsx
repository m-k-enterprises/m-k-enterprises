import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './Home';

test('renders heading', () => {
  render(
    <Home loading={true} error={false} shops={[]} articles={[]} />
  );
  const heading = screen.getByRole('heading', { name: /latest news/i });
  expect(heading).toBeInTheDocument();
});

test('brand link has security attributes', () => {
  const shops = [
    {
      id: '1',
      name: 'Test',
      shipsToCountries: [],
      primaryDomain: { url: 'https://example.com' },
      brand: { colors: { primary: [{ background: '#fff', foreground: '#000' }] } }
    }
  ];
  render(
    <Home loading={false} error={false} shops={shops} articles={[]} />
  );
  const link = screen.getByRole('button', { name: /learn more/i });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
