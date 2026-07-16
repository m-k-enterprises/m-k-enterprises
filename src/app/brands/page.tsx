import type { Metadata } from 'next';

import Brands from '../../routes/Brands';

export const metadata: Metadata = {
  title: 'Our Brands',
  description: 'Learn more about the three active M-K Enterprises brands and their storefronts.',
};

/**
 * Renders the page showcasing the company's brands.
 */
export default function BrandsPage() {
  return <Brands />;
}
