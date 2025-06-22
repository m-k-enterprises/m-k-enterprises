'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { LinkCard } from '../../components';
import useStorefront from '../../hooks/useStorefront';


/**
 * External links page.
 * Fetches shop data for quick access to brand links.
 *
 * @returns React element containing corporate links.
 */

export default function Links() {
  const { shops } = useStorefront();
  const items = shops;

  return (
    <>
      <Block>
        <Container className="links">
          <Block.Title>Useful Links</Block.Title>
          <Row className="g-3">
            {items.map(shop => (
              <Col key={shop.id} xs={12} md={6} className="d-flex">
                <LinkCard shop={shop} />
              </Col>
            ))}
          </Row>
        </Container>
      </Block>
    </>
  );
}

