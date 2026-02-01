import React from 'react';
import { Carousel, Col, Container, Placeholder, Row, Spinner } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { random } from 'lodash';
import { Articles, BrandTile, ShopCarouselItem, StatusMessage, usePageMetadata } from '../components';
import { ArticleProps, ShopProps } from '../App';

interface HomeProps extends ShopProps, ArticleProps {}

const EVEN_COLUMN_COUNT = 2;
const ODD_COLUMN_COUNT = 3;

/**
 * Determines how many columns to use for the brand grid based on the number of shops.
 *
 * @param shopCount - Total number of shops to display in the grid.
 * @returns The number of columns to use for the brand grid layout.
 */
const getBrandGridColumns = (shopCount: number) => {
  // Use 2 columns for an even number of shops and 3 columns for an odd number.
  // This keeps even counts in a balanced 2-column grid (e.g., 4 shops → 2×2)
  // and uses 3 columns for odd counts to reduce the visual impact of a short final row (e.g., 5 shops → 3+2).
  if (shopCount % 2 === 0) {
    return EVEN_COLUMN_COUNT;
  }

  return ODD_COLUMN_COUNT;
};

const getContentStatus = (loading: boolean, error: boolean, hasData: boolean) => {
  if (loading) {
    return 'loading';
  }

  if (error) {
    return 'error';
  }

  return hasData ? 'ready' : 'empty';
};

/**
 * Home page showing brand highlights and latest news.
 *
 * @param props - Shop and article data with loading states.
 * @returns JSX for the home route.
 */
function Home(props: HomeProps) {
  usePageMetadata({
    title: 'Home',
    description: 'Explore the active M-K Enterprises brands and the latest company news.',
  });

  const hasBrands = props.shops.length > 0;
  const hasArticles = props.articles.length > 0;
  const brandStatus = getContentStatus(props.loading, props.error, hasBrands);
  const newsStatus = getContentStatus(props.loading, props.error, hasArticles);
  const brandGridColumns = getBrandGridColumns(props.shops.length);

  return (
    <>
      <h1 className="visually-hidden">M-K Enterprises Home</h1>
      <Carousel>
        {brandStatus === 'loading' ? (
          <Carousel.Item className="carousel-item-large">
            <div className="carousel-background" />
            <Carousel.Caption className="text-end text-primary">
              <Container>
                <Placeholder className="display-1" animation="wave" as="h2">
                  {Array.from({ length: random(2, 3) }).map((_, i) => (
                    <React.Fragment key={i}>
                      <Placeholder xs={random(1, 3)} />{' '}
                    </React.Fragment>
                  ))}
                </Placeholder>
                <Placeholder className="lead" animation="wave" as="p">
                  {Array.from({ length: random(4, 8) }).map((_, i) => (
                    <React.Fragment key={i}>
                      <Placeholder xs={random(1, 6)} />{' '}
                    </React.Fragment>
                  ))}
                </Placeholder>
                <Placeholder.Button variant="more" size="lg" animation="wave" xs={2}>
                  <Placeholder xs={12} />
                </Placeholder.Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ) : props.shops.map(shop => (
          <ShopCarouselItem key={shop.id} shop={shop} />
        ))}
      </Carousel>
      <Block className="text-bg-primary">
        <Container>
          <p className="lead">M-K Enterprises is committed to delivering excellence in every aspect of our business. From the quality of our products to the level of customer service we provide, we go above and beyond to ensure your complete satisfaction.</p>
        </Container>
      </Block>
      <Block>
        <Container>
          <h2>Our Brands</h2>
          {brandStatus === 'loading' ? (
            <Row className="g-3" xs={1} md={brandGridColumns}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Col key={i} className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading&hellip;</span>
                  </Spinner>
                </Col>
              ))}
            </Row>
          ) : brandStatus === 'ready' || hasBrands ? (
            <Row className="g-3" xs={1} md={brandGridColumns} data-testid="brand-tiles">
              {props.shops.map((shop) => (
                <Col key={shop.id}>
                  <BrandTile shop={shop} />
                </Col>
              ))}
            </Row>
          ) : (
            <StatusMessage
              state={brandStatus === 'error' ? 'error' : 'empty'}
              message={brandStatus === 'error'
                  ? 'We ran into trouble loading brand details.'
                  : 'No brand details are available right now.'}
              onRetry={brandStatus === 'error' ? props.onRetry : undefined}
            />
          )}
        </Container>
      </Block>
      <Block>
        <Container>
          <h2>Latest News</h2>
          {newsStatus === 'loading' || newsStatus === 'ready' || hasArticles ? (
            <Row className="g-3" xs={1} md={2} xl={3}>
              <Articles loading={props.loading} error={props.error} articles={props.articles} />
            </Row>
          ) : (
            <StatusMessage
              state={newsStatus === 'error' ? 'error' : 'empty'}
              message={newsStatus === 'error'
                  ? 'We ran into trouble loading news updates.'
                  : 'No news updates are available right now.'}
              onRetry={newsStatus === 'error' ? props.onRetry : undefined}
            />
          )}
        </Container>
      </Block>
    </>
  );
}

export default Home;
