import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from './Home';

test('renders heading', () => {
  render(
    <Home loading={true} error={false} shops={[]} articles={[]} />
  );
  const heading = screen.getByRole('heading', { name: /latest news/i });
  expect(heading).toBeInTheDocument();
});
