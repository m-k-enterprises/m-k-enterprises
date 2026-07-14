import type { Metadata } from 'next';

import News from '../../routes/News';

export const metadata: Metadata = {
  title: 'News',
  description: 'Read the latest news and updates from M-K Enterprises.',
};

/**
 * Renders the news page.
 *
 * @returns The news page content
 */
export default function NewsPage() {
  return <News />;
}
