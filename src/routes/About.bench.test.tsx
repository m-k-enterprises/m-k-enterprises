import React from 'react';
import { render } from '@testing-library/react';
import About from './About';
import { Shop } from '../App';

describe('About performance benchmark', () => {
  test('counts access to shipsToCountries on initial render', () => {
    const accessSpy = jest.fn();
    const shops: Shop[] = [
      {
        id: '1',
        name: 'Shop 1',
        get shipsToCountries() {
          accessSpy();
          return ['US', 'CA'];
        },
        primaryDomain: { url: 'https://shop1.com' },
        brand: { colors: { primary: [{ background: '#fff', foreground: '#000' }] } },
      } as any as Shop,
    ];

    render(<About loading={false} error={false} shops={shops} />);

    // After optimization, there is one useMemo hook calling .map(shop => shop.shipsToCountries)
    // and two other useMemo hooks using the result.
    // So accessSpy should be called exactly once per shop.
    expect(accessSpy).toHaveBeenCalledTimes(1);
  });
});
