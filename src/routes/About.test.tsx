import React from 'react';
import { render, screen } from '@testing-library/react';

import About from './About';

const urls = [
  'http://linkedin.com/in/kristianmatthewskennington',
  'https://linkedin.com/in/paul-matthews-kennington-201007a6',
];

test('renders heading', () => {
  render(<About loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /about us/i });
  expect(heading).toBeInTheDocument();
});

test('renders team links', () => {
  render(<About loading={false} error={false} shops={[]} />);
  const links = screen.getAllByRole('button', { name: /linkedin/i });
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', urls[i]);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
