import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('../hooks/useStorefront', () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useStorefront from '../hooks/useStorefront';
import Home from './page';
import { Shop } from '../types';

const shops: Shop[] = Array.from({ length: 2 }, (_, i) => ({
  id: String(i + 1),
  name: `Shop ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://shop${i + 1}.com` },
  brand: { colors: { primary: [{ background: '#fff', foreground: '#000' }] } },
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
  render(<Home />);
  const heading = screen.getByRole('heading', { name: /latest news/i });
  expect(heading).toBeInTheDocument();
});

test('renders brand links with correct hrefs', () => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops,
    articles: [],
    loading: false,
    error: false,
  });
  render(<Home />);
  const links = screen.getAllByRole('button', { name: /learn more/i });
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(typeof link.getAttribute('href')).toBe('string');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
