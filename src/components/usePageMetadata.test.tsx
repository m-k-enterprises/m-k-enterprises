import React from 'react';
import { render } from '@testing-library/react';

import usePageMetadata from './usePageMetadata';

const TestComponent = ({ title, description }: { title: string; description: string }) => {
  usePageMetadata({ title, description });
  return null;
};

describe('usePageMetadata', () => {
  afterEach(() => {
    // eslint-disable-next-line testing-library/no-node-access
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.remove();
    }
    // eslint-disable-next-line testing-library/no-node-access
    const announcer = document.getElementById('page-title-announcer');
    if (announcer) {
      announcer.remove();
    }
    document.title = '';
  });

  test('updates document title and manages description meta', () => {
    const { rerender } = render(<TestComponent title="Home" description="Welcome" />);

    expect(document.title).toBe('M-K Enterprises | Home');

    // eslint-disable-next-line testing-library/no-node-access
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    expect(meta).not.toBeNull();
    expect(meta?.content).toBe('Welcome');

    rerender(<TestComponent title="About" description="Learn more" />);

    expect(document.title).toBe('M-K Enterprises | About');
    // eslint-disable-next-line testing-library/no-node-access
    meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    expect(meta).not.toBeNull();
    expect(meta?.content).toBe('Learn more');
  });

  test('creates or updates the aria live region with title changes', () => {
    const { rerender } = render(<TestComponent title="Brands" description="Shop now" />);

    // eslint-disable-next-line testing-library/no-node-access
    const announcer = document.getElementById('page-title-announcer');
    expect(announcer).not.toBeNull();
    expect(announcer?.textContent).toBe('M-K Enterprises | Brands');

    rerender(<TestComponent title="News" description="Updates" />);

    expect(announcer?.textContent).toBe('M-K Enterprises | News');
  });
});
