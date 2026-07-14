import type { Metadata } from 'next';

import Brands from '../../routes/Brands';

export const metadata: Metadata = {
  title: 'Our Brands',
  description: 'Learn more about the three active M-K Enterprises brands and their storefronts.',
};

export default function BrandsPage() {
  return <Brands />;
}
