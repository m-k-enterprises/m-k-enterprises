import React from 'react';
import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

const Child = () => <div>Child</div>;

test('renders brand link', () => {
  render(
    <RootLayout>
      <Child />
    </RootLayout>
  );
  const link = screen.getByRole('link', { name: /enterprises/i });
  expect(link).toBeInTheDocument();
});

test('renders children content', () => {
  render(
    <RootLayout>
      <Child />
    </RootLayout>
  );
  expect(screen.getByText('Child')).toBeInTheDocument();
});
