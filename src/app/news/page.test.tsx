import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('../../hooks/useStorefront', () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useStorefront from '../../hooks/useStorefront';
import News from './page';

const articles = Array.from({ length: 2 }, (_, i) => ({
  id: String(i + 1),
  title: `Article ${i + 1}`,
  onlineStoreUrl: `https://example.com/article${i + 1}`,
  publishedAt: '2022-01-01T00:00:00Z',
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
  render(<News />);
  const heading = screen.getByRole('heading', { name: /latest news/i });
  expect(heading).toBeInTheDocument();
});

test('renders article links', () => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops: [],
    articles,
    loading: false,
    error: false,
  });
  render(<News />);
  const links = screen.getAllByRole('button', { name: /read more/i });
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', articles[i].onlineStoreUrl);
    expect(typeof link.getAttribute('href')).toBe('string');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
