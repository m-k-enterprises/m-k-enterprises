import type { Metadata } from 'next';

import PrivacyPolicy from '../../routes/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read how M-K Enterprises handles personal data and privacy rights.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
