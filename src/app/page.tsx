import type { Metadata } from 'next';

import Home from '../routes/Home';

export const metadata: Metadata = {
  title: 'M-K Enterprises | Home',
  description: 'Explore the active M-K Enterprises brands and the latest company news.',
};

/**
 * Renders the home page.
 */
export default function HomePage() {
  return <Home />;
}
