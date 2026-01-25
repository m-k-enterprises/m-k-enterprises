import { useEffect } from 'react';

interface PageMetadata {
  title: string;
  description: string;
}

export default function usePageMetadata({ title, description }: PageMetadata) {
  useEffect(() => {
    document.title = `M-K Enterprises | ${title}`;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    meta.content = description;
  }, [title, description]);
}
