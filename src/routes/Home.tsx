import React from 'react';
import { Button, Carousel, Container, Placeholder, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { Articles } from '../components';
import { ArticleProps, ShopProps } from '../App';
import { random } from 'lodash';

interface HomeProps extends ShopProps, ArticleProps {}

function Home(props: HomeProps) {
  return (
    <>
      <Carousel>
        {props.loading || props.error ? (
          <Carousel.Item className="carousel-item-large">
            <div className="carousel-background" />
            <Carousel.Caption className="text-end text-primary">
              <Container>
                <Placeholder className="display-1" animation="wave" as="h1">
                  {Array.from({ length: random(2, 3) }).map(() => (
                    <>
                      <Placeholder xs={random(1, 3)} />{' '}
                    </>
                  ))}
                </Placeholder>
                <Placeholder className="lead" animation="wave" as="p">
                  {Array.from({ length: random(4, 8) }).map(() => (
                    <>
                      <Placeholder xs={random(1, 6)} />{' '}
                    </>
                  ))}
                </Placeholder>
                <Placeholder.Button variant="more" size="lg" animation="wave" xs={2}>
                  <Placeholder xs={12} />
                </Placeholder.Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ) : props.shops.map(shop => (
          <Carousel.Item key={shop.id} className="carousel-item-large" style={{
            backgroundColor: shop.brand?.colors.primary[0].background
          }}>
            <div className="carousel-background" style={{
              backgroundColor: shop.brand?.colors.primary[0].background,
              backgroundImage: `url(${shop.brand?.coverImage?.image?.carouselUrl})`
            }} />
            <Carousel.Caption className="text-end" style={{
              color: shop.brand?.colors.primary[0].foreground
            }}>
              <Container>
                <h1 className="display-1">{shop.name}</h1>
                <p className="lead">{shop.brand?.slogan}</p>
                <Button variant="more" size="lg" as="a" href={shop.primaryDomain.url} style={{
                  '--bs-btn-color': shop.brand?.colors.primary[0].foreground
                } as React.CSSProperties}>Learn more</Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Block className="text-bg-primary">
        <Container>
          <p className="lead">M-K Enterprises is committed to delivering excellence in every aspect of our business. From the quality of our products to the level of customer service we provide, we go above and beyond to ensure your complete satisfaction.</p>
        </Container>
      </Block>
      <Block>
        <Container>
          <h1>Latest News</h1>
          <Row className="g-3" xs={1} md={2} xl={3}>
            <Articles loading={props.loading} error={props.error} articles={props.articles} />
          </Row>
        </Container>
      </Block>
    </>
  );
}

export default Home;
