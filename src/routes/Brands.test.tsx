import React from 'react';
import { render, screen } from '@testing-library/react';

import Brands from './Brands';
import { Shop } from '../App';

const shops: Shop[] = [
  {
    id: '1',
    name: 'Bear Belts',
  shipsToCountries: [],
    primaryDomain: { url: 'https://example1.com' },
    brand: {
      shortDescription: 'Description 1',
      coverImage: { image: { carouselUrl: 'cover1.jpg' } },
      logo: {
        image: {
          logoUrl: 'logo1.png',
          altText: 'Logo 1',
          width: 1,
          height: 1,
        },
      },
      colors: { primary: [{ background: '#fff', foreground: '#000' }] },
    },
  },
  {
    id: '2',
    name: 'Pocket Bears Apparel',
    shipsToCountries: [],
    primaryDomain: { url: 'https://example2.com' },
    brand: {
      shortDescription: 'Description 2',
      coverImage: { image: { carouselUrl: 'cover2.jpg' } },
      logo: {
        image: {
          logoUrl: 'logo2.png',
          altText: 'Logo 2',
          width: 1,
          height: 1,
        },
      },
      colors: { primary: [{ background: '#fff', foreground: '#000' }] },
    },
  },
  {
    id: '3',
    name: 'Mythical Moods',
    shipsToCountries: [],
    primaryDomain: { url: 'https://example3.com' },
    brand: {
      shortDescription: 'Description 3',
      coverImage: { image: { carouselUrl: 'cover3.jpg' } },
      logo: {
        image: {
          logoUrl: 'logo3.png',
          altText: 'Logo 3',
          width: 1,
          height: 1,
        },
      },
      colors: { primary: [{ background: '#fff', foreground: '#000' }] },
    },
  },
];

test('renders heading', () => {
  render(<Brands loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { level: 1, name: /our brands/i });
  expect(heading).toBeInTheDocument();
});

test('renders brand cards with correct links', () => {
  render(<Brands loading={false} error={false} shops={shops} />);
  const links = screen.getAllByRole('button', { name: /learn more/i });
  expect(links).toHaveLength(3);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', shops[i].primaryDomain.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('shows empty state when no brands are available', () => {
  render(<Brands loading={false} error={false} shops={[]} />);
  expect(screen.getByText(/no brand details are available/i)).toBeInTheDocument();
});

test('shows error state with retry', () => {
  const onRetry = jest.fn();
  render(<Brands loading={false} error={true} onRetry={onRetry} shops={[]} />);
  expect(screen.getByText(/trouble loading brand details/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
});
