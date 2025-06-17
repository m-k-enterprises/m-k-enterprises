import React from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';

import { Shop } from '../App';

interface LinkCardProps {
  shop: Shop;
}

/**
 * Card linking to the brand shop.
 *
 * @param props - Brand shop data.
 * @returns JSX element for a link card.
 */
export default function LinkCard(props: LinkCardProps) {
  const { shop } = props;

  return (
    <Card className="card-link flex-fill text-center" style={{
      backgroundColor: shop.brand?.colors.primary[0].background,
    }}>
      <div className="img-background" style={{
        backgroundColor: shop.brand?.colors.primary[0].background,
        backgroundImage: `url(${shop.brand?.coverImage?.image?.carouselUrl})`
      }} />
      <Card.Body className="d-flex flex-column align-items-center justify-content-between" style={{
        color: shop.brand?.colors.primary[0].foreground
      }}>
        <Col className="mb-3 mx-auto" xs={10} md={2}>
          <Image src={shop.brand?.logo?.image?.logoUrl} alt={shop.brand?.logo?.image?.altText} width={shop.brand?.logo?.image?.width} height={shop.brand?.logo?.image?.height} fluid />
        </Col>
        <Card.Text>{shop.brand?.slogan}</Card.Text>
        <Button
          variant="more"
          as="a"
          href={shop.primaryDomain.url}
          target="_blank"
          rel="noopener noreferrer"
          className="stretched-link"
        >
          Visit
        </Button>
      </Card.Body>
    </Card>
  );
}
