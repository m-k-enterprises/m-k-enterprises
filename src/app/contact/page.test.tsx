import React from 'react';
import { render, screen } from '@testing-library/react';

import Contact from './page';
import { Shop } from '../../types';

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

test('renders heading', () => {
  render(<Contact loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /need support\?/i });
  expect(heading).toBeInTheDocument();
});

test('renders brand links', () => {
  render(<Contact loading={false} error={false} shops={shops} />);
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
  });
});
