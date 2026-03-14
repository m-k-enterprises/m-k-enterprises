import type { Metadata, Viewport } from 'next';

const siteName = 'M-K Enterprises';
const siteDescription = 'M-K Enterprises web site.';
const siteUrl = new URL('https://m-k.enterprises');

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
}

function normalisePath(path: string): string {
  if (path === '/') {
    return path;
  }

  return `${path.replace(/\/+$/, '')}/`;
}

export const siteMetadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  title: {
    default: siteName,
    template: `${siteName} | %s`,
  },
  description: siteDescription,
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  openGraph: {
    type: 'website',
    siteName,
    title: siteName,
    description: siteDescription,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
};

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#202e52',
};

export function buildPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const canonicalPath = normalisePath(path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
    },
    twitter: {
      title,
      description,
    },
  };
}
