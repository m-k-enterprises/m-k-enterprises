import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import type { Shop } from '../services';
import { getBrandBorderStyle } from './brandStyles';

interface BrandTileProps {
  shop: Shop;
}

/**
 * Render a Bootstrap card that displays a shop's brand information (logo, name, short description) and links to the shop's primary domain.
 *
 * @param shop - The `Shop` object whose brand and primary domain are used to populate the tile. Optional brand fields (logo, colours, coverImage, shortDescription) may be absent.
 * @returns A JSX element representing the brand tile card.
 */
function BrandTile({ shop }: BrandTileProps) {
  const logoUrl = shop.brand?.squareLogo?.image?.displayUrl;
  const logoAlt = shop.brand?.squareLogo?.image?.altText || `${shop.name} logo`;
  const borderStyle = getBrandBorderStyle(shop.brand);
  const heroUrl = shop.brand?.coverImage?.image?.heroUrl;

  return (
    <Card className="card-profile border-0">
      <Card.Header style={{
        backgroundColor: shop.brand?.colors?.primary?.[0]?.background,
        backgroundImage: heroUrl ? `url(${heroUrl})` : undefined
      }} />
      <Card.Body
        className="d-flex flex-column align-items-start"
        style={borderStyle}
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
