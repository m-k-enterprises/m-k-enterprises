import type { Metadata } from 'next';

import { PrivacyPolicyPage } from '../_components/RoutePages';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description: 'Read how M-K Enterprises handles personal data and privacy rights.',
  path: '/privacy-policy',
});

export default function Page() {
  return <PrivacyPolicyPage />;
}
