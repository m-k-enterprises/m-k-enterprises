import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import { Shop } from '../App';

export interface ShopCarouselItemProps extends Omit<React.ComponentProps<typeof Carousel.Item>, 'children'> {
  shop: Shop;
}

const ShopCarouselItem = React.memo(React.forwardRef<HTMLDivElement, ShopCarouselItemProps>(({ shop, className, style, ...props }, ref) => (
  <Carousel.Item
    ref={ref}
    {...props}
    className={`carousel-item-large ${className || ''}`.trim()}
    style={{
      ...style,
      backgroundColor: shop.brand?.colors.primary[0].background
    }}
  >
    <div className="carousel-background" style={{
      backgroundColor: shop.brand?.colors.primary[0].background,
      backgroundImage: `url(${shop.brand?.coverImage?.image?.carouselUrl})`
    }} />
    <Carousel.Caption className="text-end" style={{
      color: shop.brand?.colors.primary[0].foreground
    }}>
      <Container>
        <h1 className="display-1">{shop.name}</h1>
        <p className="lead">{shop.brand?.slogan}</p>
        <Button
          variant="more"
          size="lg"
          as="a"
          href={shop.primaryDomain.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            '--bs-btn-color': shop.brand?.colors.primary[0].foreground
          } as React.CSSProperties}
        >
          Learn more
        </Button>
      </Container>
    </Carousel.Caption>
  </Carousel.Item>
)));

export default ShopCarouselItem;
