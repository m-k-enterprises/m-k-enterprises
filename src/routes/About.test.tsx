import React from 'react';
import { render, screen } from '@testing-library/react';

import About from './About';

test('renders heading', () => {
  render(<About loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /about us/i });
  expect(heading).toBeInTheDocument();
});
