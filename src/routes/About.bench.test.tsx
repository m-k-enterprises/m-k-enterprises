import React from 'react';
import { render } from '@testing-library/react';
import About from './About';
import { Shop } from '../App';

test('About only maps shipsToCountries once', () => {
  const countAccess = jest.fn();
  const shops = [
    {
      id: '1',
      name: 'Shop 1',
      get shipsToCountries() {
        countAccess();
        return ['US', 'CA'];
      },
    },
    {
      id: '2',
      name: 'Shop 2',
      get shipsToCountries() {
        countAccess();
        return ['US', 'GB'];
      },
    }
  ] as unknown as Shop[];

  render(<About loading={false} error={false} shops={shops} />);

  // In the current implementation, it maps twice (once for min, once for max)
  // Each map iterates over all shops. So 2 shops * 2 maps = 4 accesses.
  // We want to optimize it to 2 accesses.
  expect(countAccess).toHaveBeenCalledTimes(2);
});
