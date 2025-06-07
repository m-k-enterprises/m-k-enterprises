import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

jest.mock('@smolpack/react-bootstrap-extensions', () => ({
  __esModule: true,
  Block: Object.assign(
    ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    { Title: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1> }
  )
}));

test('renders policy heading', () => {
  render(<PrivacyPolicy />);
  const heading = screen.getByRole('heading', {
    name: /privacy policy/i,
    level: 1
  });
  expect(heading).toBeInTheDocument();
});
