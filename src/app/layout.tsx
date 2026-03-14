import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '../App.scss';
import '../index.scss';

import SiteShell from './_components/SiteShell';
import { siteMetadata, siteViewport } from './siteMetadata';

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-GB">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
