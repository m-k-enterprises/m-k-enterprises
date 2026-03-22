'use client';

import Home from '../routes/Home';
import { useSiteStorefrontData } from '../site/siteData';

export default function HomePageClient() {
  const { loading, error, shops, articles, retryAll } = useSiteStorefrontData();

  return (
    <Home
      loading={loading}
      error={error}
      onRetry={retryAll}
      shops={shops}
      articles={articles}
    />
  );
}
