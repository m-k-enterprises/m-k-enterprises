import React from 'react';
import { render, screen } from '@testing-library/react';

import { Shop } from '../../types';
jest.mock('../../hooks/useStorefront', () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useStorefront from '../../hooks/useStorefront';
import Contact from './page';

const shops: Shop[] = Array.from({ length: 2 }, (_, i) => ({
  id: String(i + 1),
  name: `Shop ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://shop${i + 1}.com` },
  brand: {
    logo: { image: { url: '', logoUrl: `logo${i + 1}.png`, altText: `Logo ${i + 1}`, width: 1, height: 1 } },
    colors: { primary: [{ background: '#fff', foreground: '#000' }] },
  },
}));

beforeEach(() => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops: [],
    articles: [],
    loading: true,
    error: false,
  });
});

test('renders heading', () => {
  render(<Contact />);
  const heading = screen.getByRole('heading', { name: /need support\?/i });
  expect(heading).toBeInTheDocument();
});

test('renders brand links', () => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops,
    articles: [],
    loading: false,
    error: false,
  });
  render(<Contact />);
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(typeof link.getAttribute('href')).toBe('string');
  });
});
