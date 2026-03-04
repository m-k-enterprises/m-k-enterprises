import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import { Shop } from '../App';

export type ShopCarouselItemProps = {
  shop: Shop;
} & Omit<React.ComponentProps<typeof Carousel.Item>, 'children'>;

const ShopCarouselItem = React.memo(React.forwardRef<HTMLDivElement, ShopCarouselItemProps>((inProps, ref) => {
  const { shop, className, style, children, ...props } = inProps as ShopCarouselItemProps & { children?: React.ReactNode };
  return (
  <Carousel.Item
    ref={ref}
    {...props}
    className={`carousel-item-large ${className || ''}`.trim()}
    style={{
      ...style,
      backgroundColor: shop.brand?.colors?.primary?.[0]?.background
    }}
  >
    <div className="carousel-background" style={{
      backgroundColor: shop.brand?.colors?.primary?.[0]?.background,
      backgroundImage: shop.brand?.coverImage?.image?.heroUrl
        ? `url(${shop.brand?.coverImage?.image?.heroUrl})`
        : undefined
    }} />
    <Carousel.Caption className="text-end" style={{
      color: shop.brand?.colors?.primary?.[0]?.foreground
    }}>
      <Container>
        <h2 className="display-1">{shop.name}</h2>
        <p className="lead">{shop.brand?.shortDescription}</p>
        <Button
          variant="more"
          size="lg"
          as="a"
          href={shop.primaryDomain.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            '--bs-btn-color': shop.brand?.colors?.primary?.[0]?.foreground
          } as React.CSSProperties}
        >
          Learn more
        </Button>
      </Container>
    </Carousel.Caption>
  </Carousel.Item>
);
}));

export default ShopCarouselItem;
