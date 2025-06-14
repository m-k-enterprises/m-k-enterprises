import React from 'react';
import { render, screen } from '@testing-library/react';

import News from './News';

const articles = Array.from({ length: 2 }, (_, i) => ({
  id: String(i + 1),
  title: `Article ${i + 1}`,
  onlineStoreUrl: `https://example.com/article${i + 1}`,
  publishedAt: '2022-01-01T00:00:00Z',
}));

test('renders heading', () => {
  render(<News loading={true} error={false} articles={[]} />);
  const heading = screen.getByRole('heading', { name: /latest news/i });
  expect(heading).toBeInTheDocument();
});

test('renders article links', () => {
  render(<News loading={false} error={false} articles={articles} />);
  const links = screen.getAllByRole('button', { name: /read more/i });
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', articles[i].onlineStoreUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
