'use client';

import React from 'react';
import { Button, Col, Container, Image, Placeholder, Ratio, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { activeBrands } from '../services/brandConfig';
import { PageLayout, StatusMessage } from '../components';
import { ShopProps, useStorefront } from '../App';

const activeBrandNames = new Set(activeBrands.map((brand) => brand.name));
const brandDescriptionSkeletonWidths = [5, 3, 7, 4, 6, 2, 5, 4];

/**
 * Render a list of active brand storefronts with visuals and a link to learn more.
 *
 * @param props - ShopProps containing shops and UI state (e.g. `loading`, `error`, `onRetry`)
 * @returns The JSX element for the "Our Brands" page
 */
function Brands(props?: Partial<ShopProps>) {
  const storefront = useStorefront();
  const pageProps = props ? { ...storefront, ...props } : storefront;
  const displayShops = React.useMemo(
    () => pageProps.shops.filter((shop) => activeBrandNames.has(shop.name)),
    [pageProps.shops],
  );
  const status = pageProps.loading ? 'loading' : pageProps.error ? 'error' : displayShops.length === 0 ? 'empty' : 'ready';

  return (
    <PageLayout title="Our Brands">
      {status === 'loading' ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Block key={i}>
            <Container className="border-bottom border-4">
              <Row className="justify-content-center mb-3">
                <Col md={10}>
                  <Ratio aspectRatio="16x9">
                    <Placeholder animation="glow">
                      <Placeholder className="w-100 h-100" />
                    </Placeholder>
                  </Ratio>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="mb-3" xs={10} md={2}>
                  <Ratio aspectRatio="16x9">
                    <Placeholder animation="glow">
                      <Placeholder className="w-100 h-100" />
                    </Placeholder>
                  </Ratio>
                </Col>
                <Col className="mb-3" xs={12} md={10}>
                  <Placeholder as="p" className="lead" animation="wave">
                    {brandDescriptionSkeletonWidths.map((width, j) => (
                      <React.Fragment key={j}>
                        <Placeholder xs={width} />{' '}
                      </React.Fragment>
                    ))}
                  </Placeholder>
                  <Placeholder.Button variant="more" animation="wave" xs={2}>
                    <Placeholder xs={12} />
                  </Placeholder.Button>
                </Col>
              </Row>
            </Container>
          </Block>
        ))
      ) : status === 'ready' || displayShops.length > 0 ? displayShops.map((shop) => (
        <Block key={shop.id}>
          <Container className="border-bottom border-4" style={{
            '--bs-border-color': shop.brand?.colors?.primary?.[0]?.background
          } as React.CSSProperties}>
            <Row className="justify-content-center mb-3">
              <Col md={10}>
                <Ratio aspectRatio="16x9">
                  <div style={{
                    backgroundColor: shop.brand?.colors?.primary?.[0]?.background,
                    backgroundImage: shop.brand?.coverImage?.image?.heroUrl
                      ? `url(${shop.brand?.coverImage?.image?.heroUrl})`
                      : undefined,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }} />
                </Ratio>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="mb-3" xs={10} md={2}>
                {shop.brand?.logo?.image?.displayUrl ? (
                  <Image
                    src={shop.brand?.logo?.image?.displayUrl}
                    alt={shop.brand?.logo?.image?.altText || `${shop.name} logo`}
                    width={shop.brand?.logo?.image?.width}
                    height={shop.brand?.logo?.image?.height}
                    fluid
                  />
                ) : null}
              </Col>
              <Col className="mb-3" xs={12} md={10}>
                <p className="lead">{shop.brand?.shortDescription}</p>
                <Button
                  variant="more"
                  as="a"
                  href={shop.primaryDomain.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </Button>
              </Col>
            </Row>
          </Container>
        </Block>
      )) : (
        <Block>
          <Container>
            <StatusMessage
              state={status === 'error' ? 'error' : 'empty'}
              message={status === 'error'
                  ? 'We ran into trouble loading brand details.'
                  : 'No brand details are available right now.'}
              onRetry={status === 'error' ? pageProps.onRetry : undefined}
              />
          </Container>
        </Block>
      )}
    </PageLayout>
  );
}

export default Brands;
