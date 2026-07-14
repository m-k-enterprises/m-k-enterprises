import type { Metadata } from 'next';

import News from '../../routes/News';

export const metadata: Metadata = {
  title: 'News',
  description: 'Read the latest news and updates from M-K Enterprises.',
};

export default function NewsPage() {
  return <News />;
}
