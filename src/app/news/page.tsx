import type { Metadata } from 'next';

import NewsPageClient from './NewsPageClient';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'News',
  description: 'Read the latest news and updates from M-K Enterprises.',
  path: '/news',
});

export default function Page() {
  return <NewsPageClient />;
}
