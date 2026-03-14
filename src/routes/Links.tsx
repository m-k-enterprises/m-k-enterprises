import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { LinkCard, StatusMessage } from '../components';
import { LinkItem } from '../components/LinkCard';
import type { Shop, ShopProps } from '../site/siteData';

type LinksProps = ShopProps;

const mapShopToLinkItem = (shop: Shop): LinkItem => ({
  id: shop.id,
  name: shop.name,
  url: shop.primaryDomain.url,
  description: shop.brand?.shortDescription,
  logo: {
    url: shop.brand?.logo?.image?.displayUrl,
    alt: shop.brand?.logo?.image?.altText,
    width: shop.brand?.logo?.image?.width,
    height: shop.brand?.logo?.image?.height
  },
  coverImageUrl: shop.brand?.coverImage?.image?.heroUrl,
  colors: {
    background: shop.brand?.colors?.primary?.[0]?.background,
    foreground: shop.brand?.colors?.primary?.[0]?.foreground
  }
});

/**
 * Render the Brand Links page with storefront link cards and loading placeholders.
 *
 * @param props - Contains the `shops` array and a `loading` flag; when `loading` is `true` three centred spinner placeholders are rendered instead of the link cards
 * @returns A React element that displays a grid of brand storefront link cards or loading spinners
 */

function Links(props: LinksProps) {
  const items = props.shops.map(mapShopToLinkItem);

  return (
    <Block>
      <Container className="links">
        <h1 className="visually-hidden">Brand Links</h1>
        <Row className="g-3">
          {props.loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Col key={i} xs={12} md={6} className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading&hellip;</span>
                </Spinner>
              </Col>
            ))
          ) : props.error ? (
            <Col xs={12}>
              <StatusMessage
                state="error"
                message="We ran into trouble loading brand links."
                onRetry={props.onRetry}
              />
            </Col>
          ) : items.map(item => (
            <Col key={item.id} xs={12} md={6} className="d-flex">
              <LinkCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </Block>
  );
}

export default Links;
