import React from 'react';
import { render, screen } from '@testing-library/react';

import PrivacyPolicy from './PrivacyPolicy';

test('renders heading', () => {
  render(<PrivacyPolicy />);
  const heading = screen.getByRole('heading', {
    level: 1,
    name: /privacy policy/i
  });
  expect(heading).toBeInTheDocument();
});

test('shows introduction section', () => {
  render(<PrivacyPolicy />);
  const section = screen.getByRole('heading', { name: /introduction and scope/i });
  expect(section).toBeInTheDocument();
});
