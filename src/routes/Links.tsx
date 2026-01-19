import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { Shop, ShopProps } from '../App';
import { LinkCard } from '../components';
import logo from '../logo.svg';

interface LinksProps extends ShopProps {}

const mkShop: Shop = {
  id: 'mk-enterprises',
  name: 'M-K Enterprises',
  shipsToCountries: ['US', 'CA', 'GB'],
  primaryDomain: {
    url: 'https://mk-enterprises.com'
  },
  brand: {
    logo: {
      image: {
        url: logo,
        logoUrl: logo,
        altText: 'M-K Enterprises',
        width: 150,
        height: 150
      }
    },
    slogan: 'Quality and Innovation',
    colors: {
      primary: [{
        background: '#f8f9fa',
        foreground: '#212529'
      }]
    }
  }
};

/**
 * External links page.
 *
 * @param props - Shop data with loading state.
 * @returns React element containing corporate links.
 */

function Links(props: LinksProps) {
  const items = [mkShop, ...props.shops];

  return (
    <>
      <Block>
        <Container className="links">
          <h1>Useful Links</h1>
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

export default Links;
