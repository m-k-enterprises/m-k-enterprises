import type { Metadata, Viewport } from 'next';

import App from '../App';
import '../index.scss';
import '../App.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://m-k.enterprises'),
  title: {
    default: 'M-K Enterprises',
    template: 'M-K Enterprises | %s',
  },
  description: 'Discover M-K Enterprises, our active brands, and the latest company news.',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#202e52',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Defines the root layout for the application.
 *
 * @param children - Page content rendered within the application wrapper
 * @returns The root HTML structure containing the application content
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
