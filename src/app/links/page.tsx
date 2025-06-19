'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { ShopProps } from '../../types';
import { LinkCard } from '../../components';

interface LinksProps extends ShopProps {}

/**
 * External links page.
 *
 * @param props - Shop data with loading state.
 * @returns React element containing corporate links.
 */

export default function Links(props: any) {
  const shops = props?.shops ?? [];
  const items = shops;

  return (
    <>
      <Block>
        <Container className="links">
          <Block.Title>Useful Links</Block.Title>
          <Row className="g-3">
            {items.map((shop: any) => (
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

