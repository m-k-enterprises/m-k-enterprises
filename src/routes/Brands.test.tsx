import React from 'react';
import { render, screen } from '@testing-library/react';

import Brands from './Brands';
import { Shop } from '../App';

const shops: Shop[] = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  name: `Test ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://example${i + 1}.com` },
  brand: {
    shortDescription: `Description ${i + 1}`,
    coverImage: { image: { url: '', carouselUrl: `cover${i + 1}.jpg` } },
    logo: {
      image: {
        url: '',
        logoUrl: `logo${i + 1}.png`,
        altText: `Logo ${i + 1}`,
        width: 1,
        height: 1,
      },
    },
    colors: { primary: [{ background: '#fff', foreground: '#000' }] },
  },
}));

test('renders heading', () => {
  render(<Brands loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /our brands/i });
  expect(heading).toBeInTheDocument();
});

test('renders brand cards with correct links', () => {
  render(<Brands loading={false} error={false} shops={shops} />);
  const links = screen.getAllByRole('button', { name: /learn more/i });
  expect(links).toHaveLength(4);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
