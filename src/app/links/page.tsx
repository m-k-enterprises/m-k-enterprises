import type { Metadata } from 'next';

import Links from '../../routes/Links';

export const metadata: Metadata = {
  title: 'Brand Links',
  description: 'Direct links to each active M-K Enterprises brand storefront.',
};

export default function LinksPage() {
  return <Links />;
}
