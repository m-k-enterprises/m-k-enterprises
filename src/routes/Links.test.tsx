import React from 'react';
import { render, screen } from '@testing-library/react';

import Links from './Links';
import type { Shop } from '../site/siteData';

const shops: Shop[] = Array.from({ length: 3 }, (_, i) => ({
  id: String(i + 1),
  name: `Shop ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://shop${i + 1}.com` },
  brand: { shortDescription: `Tagline ${i + 1}`, colors: { primary: [{}] } }
}));

test('renders heading', () => {
  render(<Links loading={false} error={false} shops={shops} />);
  const heading = screen.getByRole('heading', { level: 1, name: /brand links/i });
  expect(heading).toBeInTheDocument();
});

test('renders cards with correct links', () => {
  render(<Links loading={false} error={false} shops={shops} />);
  const links = screen.getAllByRole('button', { name: /visit/i });
  expect(links).toHaveLength(shops.length);

  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
