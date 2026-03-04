import React from 'react';
import PageHeader from './PageHeader';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  headerAlign?: 'start' | 'center' | 'end';
  headerVariant?: 'primary' | 'light';
  children: React.ReactNode;
}

/**
 * Render a page layout containing a header followed by the provided content.
 *
 * @param title - The header title text
 * @param subtitle - Optional header subtitle text
 * @param headerAlign - Header alignment: `'start'`, `'center'` or `'end'`
 * @param headerVariant - Header visual variant: `'primary'` or `'light'`
 * @param children - Content to render below the header
 * @returns The layout as a `JSX.Element` containing the header and the children
 */
function PageLayout({ title, subtitle, headerAlign, headerVariant, children }: PageLayoutProps) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} align={headerAlign} variant={headerVariant} />
      {children}
    </>
  );
}

export default PageLayout;