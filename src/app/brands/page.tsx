import type { Metadata } from 'next';

import { BrandsPage } from '../_components/RoutePages';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Our Brands',
  description: 'Learn more about the three active M-K Enterprises brands and their storefronts.',
  path: '/brands',
});

export default function Page() {
  return <BrandsPage />;
}
