import type { Metadata } from 'next';

import Contact from '../../routes/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get support by connecting with the active M-K Enterprises brands.',
};

export default function ContactPage() {
  return <Contact />;
}
