import type { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import SiteShell from './SiteShell';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  } & Record<string, unknown>) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

beforeEach(() => {
  mockUsePathname.mockReset();
});

test('marks non-root navigation items active for trailing slash routes', () => {
  mockUsePathname.mockReturnValue('/about/');

  render(
    <SiteShell>
      <main>Page content</main>
    </SiteShell>
  );

  expect(screen.getByRole('link', { name: 'About' })).toHaveClass('active');
  expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('active');
});

test('renders the current footer year range after mount', async () => {
  mockUsePathname.mockReturnValue('/');

  render(
    <SiteShell>
      <main>Page content</main>
    </SiteShell>
  );

  const currentYear = new Date().getFullYear();
  const expectedYearRange = currentYear <= 2022 ? '2022' : `2022 - ${currentYear}`;

  await waitFor(() => {
    expect(screen.getByText(new RegExp(expectedYearRange.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument();
  });
});
