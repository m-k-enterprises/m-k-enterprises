import React from 'react';
import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

const Child = () => <div>Child</div>;

beforeEach(() => {
  document.documentElement.innerHTML = '<head></head><body></body>';
});

test('renders brand link', () => {
  const { getByRole } = render(
    <RootLayout>
      <Child />
    </RootLayout>,
    { container: document.documentElement, baseElement: document.documentElement }
  );
  const link = getByRole('link', { name: /enterprises/i });
  expect(link).toBeInTheDocument();
});

test('renders children content', () => {
  const { getByText } = render(
    <RootLayout>
      <Child />
    </RootLayout>,
    { container: document.documentElement, baseElement: document.documentElement }
  );
  expect(getByText('Child')).toBeInTheDocument();
});
