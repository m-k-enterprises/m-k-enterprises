import React from 'react';
import { render, screen } from '@testing-library/react';

import PrivacyPolicy from './page';

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

test('contact link is string', () => {
  render(<PrivacyPolicy />);
  const link = screen.getByRole('link', { name: /team@m-k.enterprises/i });
  expect(link).toHaveAttribute('href', 'mailto:team@m-k.enterprises');
  expect(typeof link.getAttribute('href')).toBe('string');
});
