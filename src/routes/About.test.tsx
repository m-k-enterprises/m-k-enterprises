import React from 'react';
import { render, screen } from '@testing-library/react';

import About from './About';

test('renders heading', () => {
  render(<About loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /about us/i });
  expect(heading).toBeInTheDocument();
});

test('team links open in new tab', () => {
  render(<About loading={false} error={false} shops={[]} />);
  const [link] = screen.getAllByRole('button', { name: /linkedin/i });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
