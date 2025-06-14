import React from 'react';
import { Button, Col, Container, Image, Placeholder, Ratio, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { random } from 'lodash';
import { ShopProps } from '../App';

function Brands(props: ShopProps) {
  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Our Brands</Block.Title>
        </Container>
      </Block>
      {props.loading || props.error ? Array.from({ length: 2 }).map(() => (
        <Block>
          <Container className="border-bottom border-4">
            <Row className="justify-content-center mb-3">
              <Col md={10}>
                <Ratio aspectRatio="16x9">
                  <Placeholder variant="top" animation="glow">
                    <Placeholder className="w-100 h-100" />
                  </Placeholder>
                </Ratio>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="mb-3" xs={10} md={2}>
                <Ratio aspectRatio="16x9">
                  <Placeholder variant="top" animation="glow">
                    <Placeholder className="w-100 h-100" />
                  </Placeholder>
                </Ratio>
              </Col>
              <Col className="mb-3" xs={12} md={10}>
                <Placeholder className="lead" as="p" animation="wave">
                  {Array.from({ length: random(4, 8) }).map(() => (
                    <>
                      <Placeholder xs={random(1, 6)} />{' '}
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
      )) : props.shops.map((shop, index) => (
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
                <Button variant="more" as="a" href={shop.primaryDomain.url}>Learn more</Button>
              </Col>
            </Row>
          </Container>
        </Block>
      ))}
    </>
  );
}

export default Brands;
