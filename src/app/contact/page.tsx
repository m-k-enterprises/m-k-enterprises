'use client';
import React from 'react';
import { Col, Container, Image, Placeholder, Ratio, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { ensureString } from '../../utils';
import useStorefront from '../../hooks/useStorefront';

/**
 * Shows contact information for each brand.
 * Fetches shop data to display contact information.
 *
 * @returns JSX for the contact route.
 */
export default function Contact() {
  const { shops, loading, error } = useStorefront();
  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Need Support?</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container>
          <p className="lead">Our in-house customer service team is here to help. Please connect with us by visiting one of our brands below.</p>
          <Row className="align-items-center justify-content-evenly text-center">
            {loading || error ? Array.from({ length: 2 }).map((_, i: number) => (
              <Col key={i} xs={10} md={5} xl={4}>
                <Ratio aspectRatio="16x9">
                  <Placeholder className="img-fluid" animation="glow">
                    <Placeholder className="w-100 h-100" />
                  </Placeholder>
                </Ratio>
              </Col>
            )) : shops.map(shop => (
              <Col key={shop.id} xs={10} md={5} xl={4}>
                <a href={ensureString(shop.primaryDomain.url)}>
                  <Image src={shop.brand?.logo?.image?.logoUrl} alt={shop.brand?.logo?.image?.altText} width={shop.brand?.logo?.image?.width} height={shop.brand?.logo?.image?.height} fluid />
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </Block>
    </>
  );
}

