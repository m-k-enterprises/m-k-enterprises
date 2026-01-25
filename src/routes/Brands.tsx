import React from 'react';
import { Button, Col, Container, Image, Placeholder, Ratio, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { activeBrands } from '../services';
import { PageLayout, StatusMessage, usePageMetadata } from '../components';
import { ShopProps } from '../App';
import { random } from 'lodash';

/**
 * Lists every brand with link to learn more.
 *
 * @param props - Shop data for all brands.
 * @returns JSX for the brands route.
 */
function Brands(props: ShopProps) {
  usePageMetadata({
    title: 'Our Brands',
    description: 'Learn more about the three active M-K Enterprises brands and their storefronts.',
  });

  const activeBrandNames = new Set(activeBrands.map((brand) => brand.name));
  const displayShops = props.shops.filter((shop) => activeBrandNames.has(shop.name));
  const status = props.loading ? 'loading' : props.error ? 'error' : displayShops.length === 0 ? 'empty' : 'ready';

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
                    {Array.from({ length: random(6, 18) }).map((_, j) => (
                      <>
                        <Placeholder key={j} xs={random(1, 8)} />{' '}
                      </>
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
      ) : status === 'ready' || props.shops.length > 0 ? displayShops.map((shop) => (
        <Block key={shop.id}>
          <Container className="border-bottom border-4" style={{
            '--bs-border-color': shop.brand?.colors.primary[0].background
          } as React.CSSProperties}>
            <Row className="justify-content-center mb-3">
              <Col md={10}>
                <Ratio aspectRatio="16x9">
                  <div style={{
                    backgroundColor: shop.brand?.colors.primary[0].background,
                    backgroundImage: `url(${shop.brand?.coverImage?.image?.carouselUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }} />
                </Ratio>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="mb-3" xs={10} md={2}>
                <Image src={shop.brand?.logo?.image?.logoUrl} alt={shop.brand?.logo?.image?.altText} width={shop.brand?.logo?.image?.width} height={shop.brand?.logo?.image?.height} fluid />
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
              onRetry={status === 'error' ? props.onRetry : undefined}
              />
          </Container>
        </Block>
      )}
    </PageLayout>
  );
}

export default Brands;
