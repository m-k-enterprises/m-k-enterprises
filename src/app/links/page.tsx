import type { Metadata } from 'next';

import LinksPageClient from './LinksPageClient';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Brand Links',
  description: 'Direct links to each active M-K Enterprises brand storefront.',
  path: '/links',
});

export default function Page() {
  return <LinksPageClient />;
}
