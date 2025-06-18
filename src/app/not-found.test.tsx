import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from './not-found';

test('renders not found heading', () => {
  render(<NotFound />);
  const heading = screen.getByRole('heading', { name: /page not found/i });
  expect(heading).toBeInTheDocument();
});

