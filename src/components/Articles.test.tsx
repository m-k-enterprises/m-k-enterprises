import React from 'react';
import { render, screen } from '@testing-library/react';

import Articles from './Articles';

test('article links have security attributes', () => {
  const articles = [
    {
      id: '1',
      title: 'Test',
      onlineStoreUrl: 'https://example.com',
      publishedAt: '2022-01-01T00:00:00Z',
    },
  ];
  render(<Articles loading={false} error={false} articles={articles} />);
  const link = screen.getByRole('button', { name: /read more/i });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

