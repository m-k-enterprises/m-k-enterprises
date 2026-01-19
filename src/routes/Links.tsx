import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { Shop, ShopProps } from '../App';
import { LinkCard } from '../components';
import { LinkItem } from '../components/LinkCard';
import logo from '../logo.svg';

interface LinksProps extends ShopProps {}

const mkLink: LinkItem = {
  id: 'mk-enterprises',
  url: 'https://mk-enterprises.com',
  slogan: 'Quality and Innovation',
  logo: {
    url: logo,
    alt: 'M-K Enterprises',
    width: 150,
    height: 150
  },
  colors: {
    background: '#f8f9fa',
    foreground: '#212529'
  }
};

const mapShopToLinkItem = (shop: Shop): LinkItem => ({
  id: shop.id,
  url: shop.primaryDomain.url,
  slogan: shop.brand?.slogan,
  logo: {
    url: shop.brand?.logo?.image?.logoUrl,
    alt: shop.brand?.logo?.image?.altText,
    width: shop.brand?.logo?.image?.width,
    height: shop.brand?.logo?.image?.height
  },
  coverImageUrl: shop.brand?.coverImage?.image?.carouselUrl,
  colors: {
    background: shop.brand?.colors.primary[0].background,
    foreground: shop.brand?.colors.primary[0].foreground
  }
});

/**
 * External links page.
 *
 * @param props - Shop data with loading state.
 * @returns React element containing corporate links.
 */

function Links(props: LinksProps) {
  const shopItems = props.shops.map(mapShopToLinkItem);
  const items = [mkLink, ...shopItems];

  return (
    <>
      <Block>
        <Container className="links">
          <h1>Useful Links</h1>
          <Row className="g-3">
            {items.map(item => (
              <Col key={item.id} xs={12} md={6} className="d-flex">
                <LinkCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </Block>
    </>
  );
}

export default Links;
