import type { Metadata } from 'next';

import Responsibility from '../../routes/Responsibility';
import { buildPageMetadata } from '../siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Responsibility',
  description: 'See how M-K Enterprises is committed to responsible and sustainable practices.',
  path: '/responsibility',
});

export default function Page() {
  return <Responsibility />;
}
