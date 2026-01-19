import React from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';

export interface LinkItem {
  id: string;
  url: string;
  slogan?: string;
  logo?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  coverImageUrl?: string;
  colors?: {
    background?: string;
    foreground?: string;
  };
}

interface LinkCardProps {
  item: LinkItem;
}

/**
 * Card linking to the brand shop.
 *
 * @param props - Link item data.
 * @returns JSX element for a link card.
 */
export default function LinkCard(props: LinkCardProps) {
  const { item } = props;

  return (
    <Card className="card-link flex-fill text-center" style={{
      backgroundColor: item.colors?.background,
    }}>
      <div className="img-background" style={{
        backgroundColor: item.colors?.background,
        backgroundImage: `url(${item.coverImageUrl})`
      }} />
      <Card.Body className="d-flex flex-column align-items-center justify-content-between" style={{
        color: item.colors?.foreground
      }}>
        <Col className="mb-3 mx-auto" xs={10} md={2}>
          <Image src={item.logo?.url} alt={item.logo?.alt} width={item.logo?.width} height={item.logo?.height} fluid />
        </Col>
        <Card.Text>{item.slogan}</Card.Text>
        <Button
          variant="more"
          as="a"
          href={item.url}
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
