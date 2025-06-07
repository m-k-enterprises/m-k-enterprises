'use strict';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Privacy from './Privacy';

test('shows privacy policy heading', () => {
  render(<Privacy />);
  expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
});
