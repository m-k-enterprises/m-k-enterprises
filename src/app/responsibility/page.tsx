import type { Metadata } from 'next';

import Responsibility from '../../routes/Responsibility';

export const metadata: Metadata = {
  title: 'Responsibility',
  description: 'See how M-K Enterprises is committed to responsible and sustainable practices.',
};

export default function ResponsibilityPage() {
  return <Responsibility />;
}
