import React from 'react';
import { render } from '@testing-library/react';
import { Carousel } from 'react-bootstrap';

import type { Shop } from '../services';
import Home from './Home';

// Mock react-bootstrap to spy on Carousel.Item and Carousel.Caption
jest.mock('react-bootstrap', () => {
  const original = jest.requireActual<typeof import('react-bootstrap')>('react-bootstrap');
  const Item = jest.fn(({ children }: React.PropsWithChildren) => (
    <div data-testid="carousel-item">{children}</div>
  ));
  const Caption = jest.fn(({ children }: React.PropsWithChildren) => (
    <div data-testid="carousel-caption">{children}</div>
  ));
  const MockCarousel = Object.assign(
    ({ children }: React.PropsWithChildren) => <div>{children}</div>,
    { Item, Caption },
  );

  return {
    ...original,
    Carousel: MockCarousel,
  };
});

const shops: Shop[] = Array.from({ length: 1 }, (_, i) => ({
  id: String(i + 1),
  name: `Shop ${i + 1}`,
  shipsToCountries: [],
  primaryDomain: { url: `https://shop${i + 1}.com` },
  brand: { colors: { primary: [{ background: '#fff', foreground: '#000' }] } },
}));

test('Home does NOT re-render Carousel.Item on re-render with same props', () => {
  const { rerender } = render(
    <Home loading={false} error={false} shops={shops} articles={[]} />
  );

  const MockItem = Carousel.Item as jest.Mock;
  expect(MockItem).toHaveBeenCalledTimes(1);

  // Rerender with SAME props
  rerender(
    <Home loading={false} error={false} shops={shops} articles={[]} />
  );

  // Expect Carousel.Item to NOT be called again because ShopCarouselItem is memoized
  expect(MockItem).toHaveBeenCalledTimes(1);
});
