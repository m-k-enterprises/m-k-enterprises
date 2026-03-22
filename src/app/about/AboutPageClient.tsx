'use client';

import About from '../../routes/About';
import { useSiteStorefrontData } from '../../site/siteData';

export default function AboutPageClient() {
  const { loading, error, shops } = useSiteStorefrontData();

  return <About loading={loading} error={error} shops={shops} />;
}
