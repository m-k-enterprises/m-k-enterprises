import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { Shop } from '../App';
import logo from '../logo.svg';

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
  const image = shop.brand?.logo?.image;
  return (
    <Card className="flex-fill text-center">
      <Card.Img
        variant="top"
        src={image?.logoUrl ?? logo}
        alt={image?.altText ?? shop.name}
        width={image?.width}
        height={image?.height}
      />
      <Card.Body>
        <Card.Title>{shop.name}</Card.Title>
        <Card.Text>{shop.brand?.slogan}</Card.Text>
        <Button
          variant="more"
          as="a"
          href={shop.primaryDomain.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit
        </Button>
      </Card.Body>
    </Card>
  );
}
