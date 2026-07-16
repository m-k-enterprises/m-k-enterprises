import React from 'react';
import { render, screen } from '@testing-library/react';
import ShopCarouselItem, { ShopCarouselItemProps } from './ShopCarouselItem';
import type { Shop } from '../services';

// Mock react-bootstrap
jest.mock('react-bootstrap', () => {
  const original = jest.requireActual<typeof import('react-bootstrap')>('react-bootstrap');
  type MockComponentProps = React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
  }>;

  // Mock Carousel to just return children
  const MockCarousel = ({ children }: React.PropsWithChildren) => <div>{children}</div>;

  // Create a MockItem component that renders a div with data-testid
  const MockItem = ({ children, className, style }: MockComponentProps) => (
    <div data-testid="carousel-item" className={className} style={style}>
      {children}
    </div>
  );
  MockItem.displayName = 'MockCarouselItem';

  const MockCaption = ({ children, className, style }: MockComponentProps) => (
    <div className={`carousel-caption ${className || ''}`} style={style}>{children}</div>
  );
  MockCaption.displayName = 'MockCarouselCaption';

  const Carousel = Object.assign(MockCarousel, {
    Item: MockItem,
    Caption: MockCaption,
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
  // We check that the children passed are NOT rendered
  const propsWithChildren: ShopCarouselItemProps & { children: React.ReactNode } = {
    shop,
    children: <div className="ignored-child">I should not be here</div>,
  };
  render(React.createElement(ShopCarouselItem, propsWithChildren));

  expect(screen.queryByText('I should not be here')).not.toBeInTheDocument();
  // Should render internal content (e.g. Shop name)
  expect(screen.getByText('Test Shop')).toBeInTheDocument();
});
