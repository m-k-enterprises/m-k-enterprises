import React from 'react';
import { render, screen, within } from '@testing-library/react';

import Home from './Home';
import type { Shop } from '../site/siteData';

const shops: Shop[] = Array.from({ length: 3 }, (_, i) => ({
  id: String(i + 1),
  name: `Shop ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://shop${i + 1}.com` },
  brand: { colors: { primary: [{ background: '#fff', foreground: '#000' }] } },
}));

test('renders heading', () => {
  render(
    <Home loading={true} error={false} shops={[]} articles={[]} />
  );
  const heading = screen.getByRole('heading', { name: /latest news/i });
  expect(heading).toBeInTheDocument();
});

test('renders brand links with correct hrefs', () => {
  render(<Home loading={false} error={false} shops={shops} articles={[]} />);
  const brandTiles = screen.getByTestId('brand-tiles');
  const links = within(brandTiles).getAllByRole('button', { name: /learn more/i });
  expect(links).toHaveLength(3);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('shows loading UI for brands and news', () => {
  render(<Home loading={true} error={false} shops={[]} articles={[]} />);

  const statusIndicators = screen.getAllByRole('status');
  expect(statusIndicators).toHaveLength(3);

  const newsHeading = screen.getByRole('heading', { name: /latest news/i });
  const newsContainer = newsHeading.closest('.container');
  expect(newsContainer).not.toBeNull();
  expect(newsContainer?.querySelectorAll('.placeholder').length).toBeGreaterThan(0);
});

test('shows error messages with retry', () => {
  const onRetry = jest.fn();
  render(<Home loading={false} error={true} onRetry={onRetry} shops={[]} articles={[]} />);
  expect(screen.getByText(/trouble loading brand details/i)).toBeInTheDocument();
  expect(screen.getByText(/trouble loading news updates/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /retry/i })[0]).toBeInTheDocument();
});
