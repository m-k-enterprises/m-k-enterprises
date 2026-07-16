import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

test('renders a page-not-found message and home link', () => {
  render(<NotFound />);

  expect(screen.getByRole('heading', { name: 'Page Not Found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/');
});
