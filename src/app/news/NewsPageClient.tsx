'use client';

import News from '../../routes/News';
import { useSiteStorefrontData } from '../../site/siteData';

export default function NewsPageClient() {
  const { loading, error, articles, retryAll } = useSiteStorefrontData();

  return <News loading={loading} error={error} onRetry={retryAll} articles={articles} />;
}
