'use client';

import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { ShopProps, useStorefront } from '../App';
import type { Shop } from '../services';
import { LinkCard, StatusMessage } from '../components';
import { LinkItem } from '../components/LinkCard';

type LinksProps = Partial<ShopProps>;

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
 * Renders the Brand Links page with storefront link cards and loading or error states.
 *
 * @param props - Optional storefront values that override data from `useStorefront()`
 * @returns A React element containing the Brand Links page
 */

function Links(props?: LinksProps) {
  const storefront = useStorefront();
  const pageProps = props ? { ...storefront, ...props } : storefront;
  const items = pageProps.shops.map(mapShopToLinkItem);

  return (
    <Block>
      <Container className="links">
        <h1 className="visually-hidden">Brand Links</h1>
        <Row className="g-3">
          {pageProps.loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Col key={i} xs={12} md={6} className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading&hellip;</span>
                </Spinner>
              </Col>
            ))
          ) : pageProps.error ? (
            <Col xs={12}>
              <StatusMessage
                state="error"
                message="We ran into trouble loading brand links."
                onRetry={pageProps.onRetry}
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
