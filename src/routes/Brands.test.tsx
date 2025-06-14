import React from 'react';
import { render, screen } from '@testing-library/react';

import Brands from './Brands';

test('renders heading', () => {
  render(<Brands loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /our brands/i });
  expect(heading).toBeInTheDocument();
});

test('external links have security attributes', () => {
  const shops = [
    {
      id: '1',
      name: 'Test',
      shipsToCountries: [],
      primaryDomain: { url: 'https://example.com' },
      brand: { colors: { primary: [{ background: '#fff', foreground: '#000' }] } }
    }
  ];
  render(<Brands loading={false} error={false} shops={shops} />);
  const link = screen.getByRole('button', { name: /learn more/i });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
