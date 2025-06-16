import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import logo from '../logo.svg';

interface LinkCardProps {
  name: string;
  tagline?: string;
  href: string;
}

/**
 * Renders a single external link card.
 *
 * @param props - Link details for the card.
 * @returns JSX for a link card.
 */
export default function LinkCard(props: LinkCardProps) {
  return (
    <Col xs={12} md={6} className="d-flex">
      <Card className="flex-fill text-center">
        <Card.Img variant="top" src={logo} alt="logo" width={64} height={64} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.tagline}</Card.Text>
          <Button
            variant="more"
            as="a"
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
