import React from 'react';
import { render, screen } from '@testing-library/react';

import LinkCard from './LinkCard';
import { Shop } from '../App';

const shop: Shop = {
  id: '1',
  name: 'Example Shop',
  shipsToCountries: [],
  primaryDomain: { url: 'https://example.com' },
  brand: {
    slogan: 'Be awesome',
    logo: { image: { url: '', logoUrl: 'logo.png', altText: 'Logo', width: 1, height: 1 } },
    colors: { primary: [{ background: '#fff', foreground: '#000' }] },
  },
};

test('link has correct attributes', () => {
  render(<LinkCard shop={shop} />);
  const link = screen.getByRole('button', { name: /visit/i });
  expect(link).toHaveAttribute('href', shop.primaryDomain.url);
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
