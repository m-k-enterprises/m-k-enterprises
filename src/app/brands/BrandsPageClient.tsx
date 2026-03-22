'use client';

import Brands from '../../routes/Brands';
import { useSiteStorefrontData } from '../../site/siteData';

export default function BrandsPageClient() {
  const { loading, error, shops, retryAll } = useSiteStorefrontData();

  return <Brands loading={loading} error={error} onRetry={retryAll} shops={shops} />;
}
