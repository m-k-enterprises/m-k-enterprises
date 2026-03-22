import type { Metadata } from 'next';

import ContactPageClient from './ContactPageClient';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description: 'Get support by connecting with the active M-K Enterprises brands.',
  path: '/contact',
});

export default function Page() {
  return <ContactPageClient />;
}
