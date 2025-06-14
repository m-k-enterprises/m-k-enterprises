import React from 'react';
import { render, screen } from '@testing-library/react';

import Responsibility from './Responsibility';

test('renders heading', () => {
  render(<Responsibility />);
  const heading = screen.getByRole('heading', { name: /our commitment/i });
  expect(heading).toBeInTheDocument();
});
