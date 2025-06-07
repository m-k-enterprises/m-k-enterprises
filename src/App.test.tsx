import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@smolpack/react-bootstrap-extensions', () => ({
  __esModule: true,
  Block: Object.assign(
    ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    { Title: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1> }
  )
}));

test('renders Home link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: 'Home' });
  expect(linkElement).toBeInTheDocument();
});

test('renders Privacy Policy link', () => {
  render(<App />);
  const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
  expect(privacyLink).toHaveAttribute('href', '/privacy.html');
});
