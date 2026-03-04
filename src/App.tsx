import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Image, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import type { Article, Shop, StorefrontData } from './services';
import { useStorefrontData } from './services/storefront';
import logo from './logo.svg';

import './App.scss';

export type { Article, Shop } from './services';

const Home = React.lazy(() => import('./routes/Home'));
const About = React.lazy(() => import('./routes/About'));
const Brands = React.lazy(() => import('./routes/Brands'));
const News = React.lazy(() => import('./routes/News'));
const Responsibility = React.lazy(() => import('./routes/Responsibility'));
const Contact = React.lazy(() => import('./routes/Contact'));
const PrivacyPolicy = React.lazy(() => import('./routes/PrivacyPolicy'));
const Links = React.lazy(() => import('./routes/Links'));

interface QueryProps {
  loading: boolean
  error: boolean
  onRetry?: () => Promise<void>
}

export interface ShopProps extends QueryProps {
  shops: Shop[]
}

export interface ArticleProps extends QueryProps {
  articles: Article[]
}

const mapStorefrontData = (data: StorefrontData | null) => {
  if (!data) {
    return { shop: null as Shop | null, articles: [] as Article[] };
  }

  return {
    shop: data.shop,
    articles: data.articles.nodes.map((article) => ({
      ...article,
      brand: data.shop.brand,
    })),
  };
};

/**
 * Top-level React application component that composes storefront data, navigation and route layout.
 *
 * Aggregates data from multiple storefronts into a unified list of shops and sorted articles, exposes a combined retry handler to route components, and renders the site navigation, lazy-loaded routes and footer.
 *
 * @returns The root React element for the application
 */
function App() {
  const queryBearBelts = useStorefrontData('bearBelts');
  const queryPocketBearsApparel = useStorefrontData('pocketBearsApparel');
  const queryMythicalMoods = useStorefrontData('mythicalMoods');

  const { retry: retryBearBelts } = queryBearBelts;
  const { retry: retryPocketBearsApparel } = queryPocketBearsApparel;
  const { retry: retryMythicalMoods } = queryMythicalMoods;

  const queries = [
    queryBearBelts,
    queryPocketBearsApparel,
    queryMythicalMoods,
  ];

  const loading = queries.some((query) => query.loading);
  const error = queries.some((query) => query.error);

  const retryAll = React.useCallback(async () => {
    await Promise.all([
      retryBearBelts(),
      retryPocketBearsApparel(),
      retryMythicalMoods(),
    ]);
  }, [retryBearBelts, retryPocketBearsApparel, retryMythicalMoods]);

  const bearBeltsData = React.useMemo(() => mapStorefrontData(queryBearBelts.data), [queryBearBelts.data]);
  const pocketBearsData = React.useMemo(() => mapStorefrontData(queryPocketBearsApparel.data), [queryPocketBearsApparel.data]);
  const mythicalMoodsData = React.useMemo(() => mapStorefrontData(queryMythicalMoods.data), [queryMythicalMoods.data]);

  // Memoize derived data keyed off the per-query data values to ensure stability and purity.
  // This avoids re-sorting when loading/error changes but data remains the same.
  const { shops, articles } = React.useMemo(() => {
    const shopData: Shop[] = [];
    let articlesData: Article[] = [];

    const dataList = [bearBeltsData, pocketBearsData, mythicalMoodsData];

    dataList.forEach(({ shop, articles: shopArticles }) => {
      if (shop) {
        shopData.push(shop);
      }

      if (shopArticles.length > 0) {
        articlesData.push(...shopArticles);
      }
    });

    articlesData = articlesData.sort((a, b) => {
      const aTime = new Date(a.publishedAt).getTime();
      const bTime = new Date(b.publishedAt).getTime();

      return bTime - aTime;
    });

    return { shops: shopData, articles: articlesData };
  }, [bearBeltsData, pocketBearsData, mythicalMoodsData]);

  const now = new Date();

  return (
    <Router>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container className="justify-content-between" fluid>
          <Navbar.Brand href="/">
            <Image className="d-inline-block align-top" src={logo} alt="M-K" fluid /> Enterprises
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto" variant="bordered">
              <Nav.Item>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/brands">
                  <Nav.Link>Our Brands</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/news">
                  <Nav.Link>News</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/responsibility">
                  <Nav.Link>Responsibility</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <React.Suspense fallback={(
        <Spinner className="m-5" animation="border" role="status">
          <span className="visually-hidden">Loading&hellip;</span>
        </Spinner>
      )}>
        <Routes>
          <Route path="/" element={<Home loading={loading} error={error} onRetry={retryAll} shops={shops} articles={articles} />} />
          <Route path="/about" element={<About loading={loading} error={error} shops={shops} />} />
          <Route path="/brands" element={<Brands loading={loading} error={error} onRetry={retryAll} shops={shops} />} />
          <Route path="/news" element={<News loading={loading} error={error} onRetry={retryAll} articles={articles} />} />
          <Route path="/responsibility" element={<Responsibility />} />
          <Route path="/contact" element={<Contact loading={loading} error={error} shops={shops} />} />
          <Route path="/links" element={<Links loading={loading} error={error} shops={shops} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </React.Suspense>
      <Block>
        <Container>
          <p>
            &copy; 2022 - {now.getFullYear()} M-K Enterprises. All rights reserved.
            {' '}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </p>
        </Container>
      </Block>
    </Router>
  );
}

export default App;