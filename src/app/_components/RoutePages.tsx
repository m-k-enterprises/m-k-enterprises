'use client';

import About from '../../routes/About';
import Brands from '../../routes/Brands';
import Contact from '../../routes/Contact';
import Home from '../../routes/Home';
import Links from '../../routes/Links';
import News from '../../routes/News';
import PrivacyPolicy from '../../routes/PrivacyPolicy';
import Responsibility from '../../routes/Responsibility';
import { useSiteStorefrontData } from '../../site/siteData';

export function HomePage() {
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

export function AboutPage() {
  const { loading, error, shops } = useSiteStorefrontData();

  return <About loading={loading} error={error} shops={shops} />;
}

export function BrandsPage() {
  const { loading, error, shops, retryAll } = useSiteStorefrontData();

  return <Brands loading={loading} error={error} onRetry={retryAll} shops={shops} />;
}

export function NewsPage() {
  const { loading, error, articles, retryAll } = useSiteStorefrontData();

  return <News loading={loading} error={error} onRetry={retryAll} articles={articles} />;
}

export function ContactPage() {
  const { loading, error, shops } = useSiteStorefrontData();

  return <Contact loading={loading} error={error} shops={shops} />;
}

export function LinksPage() {
  const { loading, error, shops, retryAll } = useSiteStorefrontData();

  return <Links loading={loading} error={error} onRetry={retryAll} shops={shops} />;
}

export function ResponsibilityPage() {
  return <Responsibility />;
}

export function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
