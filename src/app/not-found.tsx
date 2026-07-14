import type { Metadata } from 'next';

import NotFound from '../routes/NotFound';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you requested could not be found.',
};

/**
 * Renders the page-not-found route.
 *
 * @returns The page-not-found view.
 */
export default function NotFoundPage() {
  return <NotFound />;
}
