import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import type { Shop } from '../site/siteData';
import { Carousel } from 'react-bootstrap';

jest.mock('react-bootstrap', () => {
  const original = jest.requireActual('react-bootstrap');
  const Carousel = ({ children }: React.PropsWithChildren) => <div>{children}</div>;
  Carousel.displayName = 'MockCarousel';

  const mockCarouselItem = jest.fn(function MockCarouselItem({ children }: React.PropsWithChildren) {
    return <div data-testid="carousel-item">{children}</div>;
  });

  const mockCarouselCaption = jest.fn(function MockCarouselCaption({ children }: React.PropsWithChildren) {
    return <div data-testid="carousel-caption">{children}</div>;
  });

  Object.assign(Carousel, {
    Item: mockCarouselItem,
    Caption: mockCarouselCaption,
  });

  return {
    ...original,
    Carousel,
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
  const MockItem = Carousel.Item as unknown as jest.Mock;
  MockItem.mockClear();

  const { rerender } = render(
    <Home loading={false} error={false} shops={shops} articles={[]} />
  );

  expect(MockItem).toHaveBeenCalledTimes(1);

  // Rerender with SAME props
  rerender(
    <Home loading={false} error={false} shops={shops} articles={[]} />
  );

  // Expect Carousel.Item to NOT be called again because ShopCarouselItem is memoized
  expect(MockItem).toHaveBeenCalledTimes(1);
});
