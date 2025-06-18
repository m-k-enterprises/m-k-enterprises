import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './page';
import { Shop } from '../types';

const shops: Shop[] = Array.from({ length: 2 }, (_, i) => ({
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
  const links = screen.getAllByRole('button', { name: /learn more/i });
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
