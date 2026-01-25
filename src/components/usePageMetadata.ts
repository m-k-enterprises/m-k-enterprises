import { useEffect, useRef } from 'react';

interface PageMetadata {
  title: string;
  description: string;
}

export default function usePageMetadata({ title, description }: PageMetadata) {
  const lastMetadata = useRef<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const nextTitle = `M-K Enterprises | ${title}`;
    const previous = lastMetadata.current;

    if (!previous || previous.title !== nextTitle) {
      document.title = nextTitle;
    }

    if (!previous || previous.description !== description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }

      meta.content = description;
    }

    lastMetadata.current = { title: nextTitle, description };
  }, [title, description]);
}
