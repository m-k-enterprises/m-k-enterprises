import React from 'react';
import { render, screen } from '@testing-library/react';

import News from './News';

test('renders heading', () => {
  render(<News loading={true} error={false} articles={[]} />);
  const heading = screen.getByRole('heading', { name: /latest news/i });
  expect(heading).toBeInTheDocument();
});
