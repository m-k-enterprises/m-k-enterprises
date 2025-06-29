import React from 'react';
import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

const Child = () => <div>Child</div>;

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('renders brand link', () => {
  const { getByRole } = render(
    <RootLayout>
      <Child />
    </RootLayout>,
    { container }
  );
  const link = getByRole('link', { name: /enterprises/i });
  expect(link).toBeInTheDocument();
});

test('renders children content', () => {
  const { getByText } = render(
    <RootLayout>
      <Child />
    </RootLayout>,
    { container }
  );
  expect(getByText('Child')).toBeInTheDocument();
});
