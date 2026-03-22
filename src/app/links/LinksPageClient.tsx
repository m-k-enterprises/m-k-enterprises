'use client';

import Links from '../../routes/Links';
import { useSiteStorefrontData } from '../../site/siteData';

export default function LinksPageClient() {
  const { loading, error, shops, retryAll } = useSiteStorefrontData();

  return <Links loading={loading} error={error} onRetry={retryAll} shops={shops} />;
}
