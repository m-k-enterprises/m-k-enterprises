import React from 'react';
import PageHeader from './PageHeader';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  headerAlign?: 'start' | 'center' | 'end';
  headerVariant?: 'primary' | 'light';
  children: React.ReactNode;
}

function PageLayout({ title, subtitle, headerAlign, headerVariant, children }: PageLayoutProps) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} align={headerAlign} variant={headerVariant} />
      {children}
    </>
  );
}

export default PageLayout;
