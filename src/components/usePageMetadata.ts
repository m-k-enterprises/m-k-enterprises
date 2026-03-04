import { useEffect, useRef } from 'react';

interface PageMetadata {
  title: string;
  description: string;
}

const SITE_NAME = 'M-K Enterprises';

/**
 * Synchronises document title and the meta description with the supplied page metadata.
 *
 * Updates the document title (prefixed with the site name), creates or updates a `<meta name="description">`
 * element with the provided description, and updates a hidden ARIA live region so assistive technologies
 * announce title changes.
 *
 * @param metadata - Page metadata payload for the current route.
 * @param metadata.title - The page-specific portion of the document title; it will be prefixed with the site name
 * @param metadata.description - The text to set as the page's meta description
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
        const body = document.body;
        body.insertBefore(announcer, body.firstChild);
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