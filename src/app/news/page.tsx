import type { Metadata } from 'next';

import { NewsPage } from '../_components/RoutePages';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'News',
  description: 'Read the latest news and updates from M-K Enterprises.',
  path: '/news',
});

export default function Page() {
  return <NewsPage />;
}
