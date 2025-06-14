import React from 'react';
import { render, screen } from '@testing-library/react';

import Brands from './Brands';

test('renders heading', () => {
  render(<Brands loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /our brands/i });
  expect(heading).toBeInTheDocument();
});
