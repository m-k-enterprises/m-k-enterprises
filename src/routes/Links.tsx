import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import logo from '../logo.svg';
import './Links.scss';

/**
 * External links page.
 *
 * @returns React element containing corporate links.
 */
function Links() {
  const items = [
    { name: 'M-K Enterprises', tagline: 'Corporate site', href: 'https://m-k.enterprises' },
    { name: 'Bear Belts', tagline: 'Belts for every bear', href: 'https://bearbelts.store' },
    { name: 'Pocket Bears Apparel', tagline: 'Pocket-sized style', href: 'https://pocketbearsapparel.store' },
    // { name: 'Sizzle & Soak', tagline: 'Add flavour fast', href: 'https://sizzleandsoak.store' },
    { name: 'Mythical Moods', tagline: 'Enchanting scents', href: 'https://mythicalmoods.store' },
    { name: 'Aura & Essence', tagline: 'Holistic aromas', href: 'https://aura-and-essence.store' },
  ];

  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Useful Links</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container className="links">
          <Row>
            {items.map(link => (
              <Col key={link.href} xs={12} md={6} className="d-flex">
                <Card className="flex-fill text-center">
                  <Card.Img variant="top" src={logo} alt="logo" width={64} height={64} />
                  <Card.Body>
                    <Card.Title>{link.name}</Card.Title>
                    <Card.Text>{link.tagline}</Card.Text>
                    <Button
                      variant="more"
                      as="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Block>
    </>
  );
}

export default Links;
