import React from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';

export interface LinkItem {
  id: string;
  name?: string;
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
 * Render a clickable card representing a link item (logo, slogan and Visit button).
 *
 * Renders a Bootstrap Card using the provided LinkItem: shows the item's logo (with an accessible alt text fallback using the item's name or "Logo"), displays the slogan, applies optional background/foreground colours and cover image, and includes a "Visit" button linking to the item's URL.
 *
 * @param props - Component props containing the `item` to render
 * @returns The JSX element for the link card
 */
export default function LinkCard(props: LinkCardProps) {
  const { item } = props;
  const logoAlt = item.logo?.alt || (item.name ? `${item.name} logo` : `Logo`);

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
        {item.logo?.url ? (
          <Col className="mb-3 mx-auto" xs={10} md={2}>
            <Image src={item.logo?.url} alt={logoAlt} width={item.logo?.width} height={item.logo?.height} fluid />
          </Col>
        ) : null}
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