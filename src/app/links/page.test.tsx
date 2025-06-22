import React from 'react';
import { render, screen } from '@testing-library/react';

import { Shop } from '../../types';
jest.mock('../../hooks/useStorefront', () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useStorefront from '../../hooks/useStorefront';
import Links from './page';

const shops: Shop[] = Array.from({ length: 3 }, (_, i) => ({
  id: String(i + 1),
  name: `Shop ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://shop${i + 1}.com` },
  brand: { slogan: `Tagline ${i + 1}`, colors: { primary: [{}] } }
}));

beforeEach(() => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops: [],
    articles: [],
    loading: false,
    error: false,
  });
});

test('renders heading', () => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops,
    articles: [],
    loading: false,
    error: false,
  });
  render(<Links />);
  const heading = screen.getByRole('heading', { name: /useful links/i });
  expect(heading).toBeInTheDocument();
});

test('renders cards with correct links', () => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops,
    articles: [],
    loading: false,
    error: false,
  });
  render(<Links />);
  const links = screen.getAllByRole('button', { name: /visit/i });
  expect(links).toHaveLength(shops.length);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(typeof link.getAttribute('href')).toBe('string');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
