import type { Metadata } from 'next';

import About from '../../routes/About';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the M-K Enterprises story, mission, and leadership team.',
};

export default function AboutPage() {
  return <About />;
}
