'use client';

import React from 'react';
import { Col, Container, Image, Placeholder, Ratio, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { PageLayout } from '../components';
import { ShopProps, useStorefront } from '../App';

/**
 * Renders the contact page with shop logos linked to their primary domains.
 *
 * Displays placeholders when shop data is loading or has errored without any available shops.
 *
 * @param props - Optional storefront properties that override the values provided by `useStorefront`
 * @returns The contact page element
 */
function Contact(props?: Partial<ShopProps>) {
  const storefront = useStorefront();
  const pageProps = props ? { ...storefront, ...props } : storefront;
  return (
    <PageLayout title="Need Support?">
      <Block>
        <Container>
          <p className="lead">Our in-house customer service team is here to help. Please connect with us by visiting one of our brands below.</p>
          <Row className="align-items-center justify-content-evenly text-center">
            {(pageProps.loading || pageProps.error) && pageProps.shops.length === 0 ? Array.from({ length: 2 }).map((_, i) => (
              <Col key={i} xs={10} md={5} xl={4}>
                <Ratio aspectRatio="16x9">
                  <Placeholder className="img-fluid" animation="glow">
                    <Placeholder className="w-100 h-100" />
                  </Placeholder>
                </Ratio>
              </Col>
            )) : pageProps.shops.map(shop => (
              <Col key={shop.id} xs={10} md={5} xl={4}>
                <a href={shop.primaryDomain.url}>
                  <Image
                    src={shop.brand?.logo?.image?.displayUrl}
                    alt={shop.brand?.logo?.image?.altText || (shop.name ? 'Logo of ' + shop.name : 'Brand logo')}
                    width={shop.brand?.logo?.image?.width}
                    height={shop.brand?.logo?.image?.height}
                    fluid
                  />
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </Block>
    </PageLayout>
  );
}

export default Contact;
