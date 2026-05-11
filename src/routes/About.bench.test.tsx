import React from 'react';
import { render } from '@testing-library/react';
import About from './About';
import { Shop } from '../App';

test('About component mapping is not redundant', () => {
  let accessCount = 0;
  const shops: Shop[] = [
    {
      id: '1',
      name: 'Shop 1',
      get shipsToCountries() {
        accessCount++;
        return ['US', 'CA'];
      },
      primaryDomain: { url: 'https://shop1.com' },
      brand: { colors: { primary: [{ background: '#fff', foreground: '#000' }] } },
    } as any,
  ];

  render(<About loading={false} error={false} shops={shops} />);

  // After optimization, it should be mapped only once.
  expect(accessCount).toBe(1);
});
