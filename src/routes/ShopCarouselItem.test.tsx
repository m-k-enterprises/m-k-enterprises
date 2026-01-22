import React from 'react';
import { render } from '@testing-library/react';
import { ShopCarouselItem } from './Home';
import { Shop } from '../App';
import { Carousel } from 'react-bootstrap';

// Mock react-bootstrap
jest.mock('react-bootstrap', () => {
  const original = jest.requireActual('react-bootstrap');
  // Mock Carousel to just return children
  const Carousel = ({ children }: any) => <div>{children}</div>;

  // Create a MockItem component that renders a div with data-testid
  const MockItem = (props: any) => (
    <div data-testid="carousel-item" className={props.className} style={props.style}>
      {props.children}
    </div>
  );

  // Assign MockItem to Carousel.Item
  (Carousel as any).Item = MockItem;

  // Mock Caption as well
  (Carousel as any).Caption = ({ children, className, style }: any) => (
    <div className={`carousel-caption ${className || ''}`} style={style}>{children}</div>
  );

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
    coverImage: { image: { carouselUrl: 'test.jpg', url: 'test.jpg' } }
  },
};

test('ShopCarouselItem merges className', () => {
  const { getByTestId } = render(
    <ShopCarouselItem shop={shop} className="custom-class" />
  );

  const item = getByTestId('carousel-item');
  expect(item).toHaveClass('carousel-item-large');
  expect(item).toHaveClass('custom-class');
});

test('ShopCarouselItem merges style', () => {
  const customStyle = { color: 'red', margin: '10px' };
  const { getByTestId } = render(
    <ShopCarouselItem shop={shop} style={customStyle} />
  );

  const item = getByTestId('carousel-item');
  const style = item.style;

  expect(style.color).toBe('red');
  expect(style.margin).toBe('10px');
  expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
});

test('ShopCarouselItem ignores children passed to it', () => {
  // We check that the children passed are NOT rendered
  const { queryByText, getByText } = render(
    <ShopCarouselItem shop={shop} {...({} as any)}>
      <div className="ignored-child">I should not be here</div>
    </ShopCarouselItem>
  );

  expect(queryByText('I should not be here')).not.toBeInTheDocument();
  // Should render internal content (e.g. Shop name)
  expect(getByText('Test Shop')).toBeInTheDocument();
});
