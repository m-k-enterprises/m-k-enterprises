import { render } from '@testing-library/react';
import Home from './Home';
import { Shop } from '../App';
import { Carousel } from 'react-bootstrap';

// This test verifies memoization stability by counting renders, avoiding flaky timing-based benchmarks.

// Mock react-bootstrap to spy on Carousel.Item and Carousel.Caption
jest.mock('react-bootstrap', () => {
  const original = jest.requireActual('react-bootstrap');
  const Item = jest.fn((props) => <div data-testid="carousel-item">{props.children}</div>);
  const Caption = jest.fn((props) => <div data-testid="carousel-caption">{props.children}</div>);
  const Carousel = ({ children }: any) => <div>{children}</div>;
  Object.assign(Carousel, {
    Item,
    Caption
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
