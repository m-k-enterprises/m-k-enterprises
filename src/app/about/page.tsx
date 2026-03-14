import type { Metadata } from 'next';

import { AboutPage } from '../_components/RoutePages';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description: 'Learn about the M-K Enterprises story, mission, and leadership team.',
  path: '/about',
});

export default function Page() {
  return <AboutPage />;
}
