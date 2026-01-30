import { useEffect, useRef } from 'react';

interface PageMetadata {
  title: string;
  description: string;
}

const SITE_NAME = 'M-K Enterprises';

/**
 * React hook that synchronizes the page's metadata with the provided values.
 *
 * Side effects:
 * - Updates `document.title` to include the given title.
 * - Creates or updates the `<meta name="description">` tag in `document.head`.
 *
 * @param title - The page-specific portion of the document title.
 * @param description - The text to use for the meta description tag.
 */
export default function usePageMetadata({ title, description }: PageMetadata) {
  const lastMetadata = useRef<{ title: string; description: string } | null>(null);
  const metaRef = useRef<HTMLMetaElement | null>(null);

  useEffect(() => {
    const nextTitle = `${SITE_NAME} | ${title}`;
    const previous = lastMetadata.current;

    if (!previous || previous.title !== nextTitle) {
      document.title = nextTitle;
    }

    if (!previous || previous.description !== description) {
      if (!metaRef.current) {
        metaRef.current = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      }

      if (!metaRef.current) {
        metaRef.current = document.createElement('meta');
        metaRef.current.name = 'description';
        document.head.appendChild(metaRef.current);
      }

      metaRef.current.content = description;
    }

    lastMetadata.current = { title: nextTitle, description };
  }, [title, description]);
}
