'use client';

import React from 'react';
import { Col, Container, Image, Placeholder, Ratio, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { PageLayout } from '../components';
import { ShopProps, useStorefront } from '../App';

/**
 * Render the contact page listing each brand as a linked logo.
 *
 * Displays each shop's brand logo linking to its primary domain; if no shops are available and the component is loading or in an error state, renders two image placeholders to indicate loading.
 *
 * @param props - ShopProps containing the shops array and `loading`/`error` flags
 * @returns The JSX element for the contact route
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
