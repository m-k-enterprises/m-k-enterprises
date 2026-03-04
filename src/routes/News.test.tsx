import React from 'react';
import { render, screen } from '@testing-library/react';

import News from './News';

const articles = Array.from({ length: 2 }, (_, i) => ({
  id: String(i + 1),
  title: `Article ${i + 1}`,
  onlineStoreUrl: 'https://example.com',
  handle: `article-${i + 1}`,
  excerpt: `Summary ${i + 1}`,
  publishedAt: '2022-01-01T00:00:00Z',
}));

test('renders heading', () => {
  render(<News loading={true} error={false} articles={[]} />);
  const heading = screen.getByRole('heading', { level: 1, name: /latest news/i });
  expect(heading).toBeInTheDocument();
});

test('renders article titles', () => {
  render(<News loading={false} error={false} articles={articles} />);
  articles.forEach((article) => {
    expect(screen.getByText(article.title)).toBeInTheDocument();
  });
});

test('shows empty state when no news is available', () => {
  render(<News loading={false} error={false} articles={[]} />);
  expect(screen.getByText(/no news updates are available/i)).toBeInTheDocument();
});

test('shows error state with retry', () => {
  const onRetry = jest.fn();
  render(<News loading={false} error={true} onRetry={onRetry} articles={[]} />);
  expect(screen.getByText(/trouble loading news updates/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
});
