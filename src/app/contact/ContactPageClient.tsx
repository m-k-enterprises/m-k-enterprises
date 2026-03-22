'use client';

import Contact from '../../routes/Contact';
import { useSiteStorefrontData } from '../../site/siteData';

export default function ContactPageClient() {
  const { loading, error, shops } = useSiteStorefrontData();

  return <Contact loading={loading} error={error} shops={shops} />;
}
