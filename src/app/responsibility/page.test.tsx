import React from 'react';
import { render, screen } from '@testing-library/react';

import Responsibility from './page';

test('renders heading', () => {
  render(<Responsibility />);
  const heading = screen.getByRole('heading', { name: /our commitment/i });
  expect(heading).toBeInTheDocument();
});

test('shows commitment text', () => {
  render(<Responsibility />);
  const paragraph = screen.getByText(/is committed to making the world/i);
  expect(paragraph).toBeInTheDocument();
});
