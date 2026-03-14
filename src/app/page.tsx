import type { Metadata } from 'next';

import { HomePage } from './_components/RoutePages';
import { buildPageMetadata } from './siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'M-K Enterprises | Home',
  description: 'Explore the active M-K Enterprises brands and the latest company news.',
  path: '/',
});

export default function Page() {
  return <HomePage />;
}
