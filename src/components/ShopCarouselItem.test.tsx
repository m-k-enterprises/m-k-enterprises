import React from 'react';
import { render, screen } from '@testing-library/react';
import ShopCarouselItem, { type ShopCarouselItemProps } from './ShopCarouselItem';
import type { Shop } from '../site/siteData';

jest.mock('react-bootstrap', () => {
  const original = jest.requireActual('react-bootstrap');
  const Carousel = ({ children }: React.PropsWithChildren) => <div>{children}</div>;
  Carousel.displayName = 'MockCarousel';

  function MockCarouselItem({
    children,
    className,
    style,
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
    return (
      <div data-testid="carousel-item" className={className} style={style}>
        {children}
      </div>
    );
  }

  function MockCarouselCaption({
    children,
    className,
    style,
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
    return (
      <div className={`carousel-caption ${className || ''}`.trim()} style={style}>
        {children}
      </div>
    );
  }

  Object.assign(Carousel, {
    Item: MockCarouselItem,
    Caption: MockCarouselCaption,
  });

  return {
    ...original,
    Carousel,
  };
});

const shop: Shop = {
  id: '1',
  name: 'Test Shop',
  shipsToCountries: [],
  primaryDomain: { url: 'https://test.com' },
  brand: {
    colors: { primary: [{ background: '#ffffff', foreground: '#000000' }] },
    shortDescription: 'A short description',
    coverImage: { image: { heroUrl: 'test.jpg' } }
  },
};

test('ShopCarouselItem merges className', () => {
  render(
    <ShopCarouselItem shop={shop} className="custom-class" />
  );

  const item = screen.getByTestId('carousel-item');
  expect(item).toHaveClass('carousel-item-large');
  expect(item).toHaveClass('custom-class');
});

test('ShopCarouselItem merges style', () => {
  const customStyle = { color: 'red', margin: '10px' };
  render(
    <ShopCarouselItem shop={shop} style={customStyle} />
  );

  const item = screen.getByTestId('carousel-item');
  const style = item.style;

  expect(style.color).toBe('red');
  expect(style.margin).toBe('10px');
  expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
});

test('ShopCarouselItem ignores children passed to it', () => {
  const ShopCarouselItemWithChildren = ShopCarouselItem as React.ComponentType<
    React.PropsWithChildren<ShopCarouselItemProps>
  >;

  render(
    <ShopCarouselItemWithChildren shop={shop}>
      <div className="ignored-child">I should not be here</div>
    </ShopCarouselItemWithChildren>
  );

  expect(screen.queryByText('I should not be here')).not.toBeInTheDocument();
  expect(screen.getByText('Test Shop')).toBeInTheDocument();
});
