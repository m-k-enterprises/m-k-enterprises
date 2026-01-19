import React from 'react';
import { render, screen } from '@testing-library/react';

import Links from './Links';
import { Shop } from '../App';

const shops: Shop[] = Array.from({ length: 3 }, (_, i) => ({
  id: String(i + 1),
  name: `Shop ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://shop${i + 1}.com` },
  brand: { slogan: `Tagline ${i + 1}`, colors: { primary: [{}] } }
}));

test('renders heading', () => {
  render(<Links loading={false} error={false} shops={shops} />);
  const heading = screen.getByRole('heading', { name: /useful links/i });
  expect(heading).toBeInTheDocument();
});

test('renders cards with correct links', () => {
  render(<Links loading={false} error={false} shops={shops} />);
  // shops + 1 (M-K Enterprises)
  const links = screen.getAllByRole('button', { name: /visit/i });
  expect(links).toHaveLength(shops.length + 1);

  // Verify the M-K link specifically
  const mkLink = screen.getAllByRole('button', { name: /visit/i })[0];
  expect(mkLink).toHaveAttribute('href', 'https://mk-enterprises.com');

  // Verify the other shops are also present (offset by 1)
  shops.forEach((shop, i) => {
    // We skip the first one which is M-K
    const link = links[i + 1];
    expect(link).toHaveAttribute('href', shop.primaryDomain.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
