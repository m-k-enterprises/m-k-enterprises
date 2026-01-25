import React from 'react';
import { render, screen } from '@testing-library/react';

import LinkCard, { LinkItem } from './LinkCard';

const linkItem: LinkItem = {
  id: '1',
  name: 'Bear Belts',
  url: 'https://example.com',
  slogan: 'Be awesome',
  logo: {
    url: 'logo.png',
    alt: 'Logo',
    width: 1,
    height: 1
  },
  colors: {
    background: '#fff',
    foreground: '#000'
  }
};

test('link has correct attributes', () => {
  render(<LinkCard item={linkItem} />);
  const link = screen.getByRole('button', { name: /visit/i });
  expect(link).toHaveAttribute('href', linkItem.url);
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
