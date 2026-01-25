import React from 'react';
import { render, screen } from '@testing-library/react';

import Articles from './Articles';

test('renders article title and excerpt', () => {
  const articles = [
    {
      id: '1',
      title: 'Test',
      onlineStoreUrl: 'https://example.com',
      handle: 'test',
      excerpt: 'Short summary',
      publishedAt: '2022-01-01T00:00:00Z',
    },
  ];
  render(<Articles loading={false} error={false} articles={articles} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('Short summary')).toBeInTheDocument();
});

test('Articles loading state is stable across re-renders', () => {
  const { asFragment, rerender } = render(<Articles loading={true} error={false} articles={[]} />);
  const firstRender = asFragment();

  rerender(<Articles loading={true} error={false} articles={[]} />);
  const secondRender = asFragment();

  expect(secondRender).toMatchObject(firstRender);
});
