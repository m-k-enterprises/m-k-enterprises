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
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nextTitle = `${SITE_NAME} | ${title}`;
    const previous = lastMetadata.current;

    if (!metaRef.current) {
      metaRef.current = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    }

    if (!liveRegionRef.current) {
      liveRegionRef.current = document.getElementById('page-title-announcer') as HTMLDivElement | null;
      if (!liveRegionRef.current) {
        const announcer = document.createElement('div');
        announcer.id = 'page-title-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.position = 'absolute';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.margin = '-1px';
        announcer.style.border = '0';
        announcer.style.padding = '0';
        announcer.style.overflow = 'hidden';
        announcer.style.clip = 'rect(0 0 0 0)';
        announcer.style.clipPath = 'inset(50%)';
        document.body.appendChild(announcer);
        liveRegionRef.current = announcer;
      }
    }

    if (!previous || previous.title !== nextTitle) {
      document.title = nextTitle;
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = nextTitle;
      }
    }

    if (!previous || previous.description !== description) {
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
