import React from 'react';
import { render, screen } from '@testing-library/react';

import Links from './Links';

const hrefs = [
  'https://m-k.enterprises',
  'https://bearbelts.com',
  'https://pocketbears.com',
  'https://mythicalmoods.com',
  'https://auraessence.com',
];

test('renders heading', () => {
  render(<Links />);
  const heading = screen.getByRole('heading', { name: /useful links/i });
  expect(heading).toBeInTheDocument();
});

test('renders five cards with correct links', () => {
  render(<Links />);
  const links = screen.getAllByRole('button', { name: /visit/i });
  expect(links).toHaveLength(5);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', hrefs[i]);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
