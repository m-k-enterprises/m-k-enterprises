import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { Shop } from '../App';

interface BrandTileProps {
  shop: Shop;
}

function BrandTile({ shop }: BrandTileProps) {
  const brandColor = shop.brand?.colors.primary[0];
  const logoUrl = shop.brand?.squareLogo?.image?.logoUrl;
  const logoAlt = shop.brand?.squareLogo?.image?.altText || `${shop.name} logo`;

  return (
    <Card className="card-profile border-0">
      <Card.Header style={{
      backgroundColor: shop.brand?.colors.primary[0].background,
      backgroundImage: `url(${shop.brand?.coverImage?.image?.carouselUrl})`
    }} />
      <Card.Body
        className="d-flex flex-column align-items-start"
        style={{
          borderColor: brandColor?.background ? `${brandColor.background}` : undefined,
        }}
      >
        {logoUrl ? (
          <Image src={logoUrl} alt={logoAlt} className="card-profile-img" />
        ) : null}
        <Card.Title as="h4">{shop.name}</Card.Title>
        <Card.Text className="text-muted">
          {shop.brand?.shortDescription || 'Discover more about this brand.'}
        </Card.Text>
        <Button
          variant="more"
          as="a"
          href={shop.primaryDomain.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto"
        >
          Learn more
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BrandTile;
