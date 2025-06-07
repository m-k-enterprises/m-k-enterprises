import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

test('renders privacy policy heading', () => {
  render(<PrivacyPolicy />);
  const heading = screen.getByRole('heading', { name: /privacy policy/i });
  expect(heading).toBeInTheDocument();
});
