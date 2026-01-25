import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { Shop, ShopProps } from '../App';
import { LinkCard, usePageMetadata } from '../components';
import { LinkItem } from '../components/LinkCard';

interface LinksProps extends ShopProps {}

const mapShopToLinkItem = (shop: Shop): LinkItem => ({
  id: shop.id,
  url: shop.primaryDomain.url,
  slogan: shop.brand?.shortDescription,
  logo: {
    url: shop.brand?.logo?.image?.logoUrl,
    alt: shop.brand?.logo?.image?.altText,
    width: shop.brand?.logo?.image?.width,
    height: shop.brand?.logo?.image?.height
  },
  coverImageUrl: shop.brand?.coverImage?.image?.carouselUrl,
  colors: {
    background: shop.brand?.colors?.primary?.[0]?.background,
    foreground: shop.brand?.colors?.primary?.[0]?.foreground
  }
});

/**
 * External links page.
 *
 * @param props - Shop data with loading state.
 * @returns React element containing corporate links.
 */

function Links(props: LinksProps) {
  usePageMetadata({
    title: 'Links',
    description: 'Direct links to each active M-K Enterprises brand storefront.',
  });

  const items = props.shops.map(mapShopToLinkItem);

  return (
    <>
      <Block>
        <Container className="links">
          <Row className="g-3">
            {props.loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Col key={i} xs={12} md={6} className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading&hellip;</span>
                  </Spinner>
                </Col>
              ))
            ) : items.map(item => (
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
