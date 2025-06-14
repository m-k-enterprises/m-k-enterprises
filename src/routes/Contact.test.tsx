import React from 'react';
import { render, screen } from '@testing-library/react';

import Contact from './Contact';

test('renders heading', () => {
  render(<Contact loading={true} error={false} shops={[]} />);
  const heading = screen.getByRole('heading', { name: /need support\?/i });
  expect(heading).toBeInTheDocument();
});
