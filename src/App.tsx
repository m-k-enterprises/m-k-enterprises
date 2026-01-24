import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Image as Img, Nav, Navbar, Spinner } from 'react-bootstrap';
import { loader } from 'graphql.macro';
import { ApolloError, useQuery } from '@apollo/client';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { clients } from './clients';
import logo from './logo.svg';

import './App.scss';

const Home = React.lazy(() => import('./routes/Home'));
const About = React.lazy(() => import('./routes/About'));
const Brands = React.lazy(() => import('./routes/Brands'));
const News = React.lazy(() => import('./routes/News'));
const Responsibility = React.lazy(() => import('./routes/Responsibility'));
const Contact = React.lazy(() => import('./routes/Contact'));
const PrivacyPolicy = React.lazy(() => import('./routes/PrivacyPolicy'));
const Links = React.lazy(() => import('./routes/Links'));

interface StorefrontData {
  shop: Shop
  articles: {
    nodes: Article[]
  }
}

export interface Shop {
  id: string
  name: string
  shipsToCountries: string[]
  primaryDomain: {
    url: string
  }
  brand?: {
    logo?: MediaImage
    slogan?: string
    coverImage?: MediaImage
    shortDescription?: string
    colors: {
      primary: [{
        background?: string
        foreground?: string
      }]
    }
  }
}

interface Article {
  id: string
  title: string
  excerptHtml?: string
  onlineStoreUrl?: string
  image?: Image
  publishedAt: string
}

interface MediaImage {
  image?: Image
}

interface Image {
  altText?: string
  url: string
  carouselUrl?: string
  logoUrl?: string
  newsUrl?: string
  width?: number
  height?: number
}

interface QueryProps {
  loading: boolean
  error: boolean
}

export interface ShopProps extends QueryProps {
  shops: Shop[]
}

export interface ArticleProps extends QueryProps {
  articles: Article[]
}

const storefrontQuery = loader('./storefront.gql');

function App() {
  const queryBearBelts = useQuery<StorefrontData>(storefrontQuery, { client: clients.bearBelts });
  const queryPocketBearsApparel = useQuery<StorefrontData>(storefrontQuery, { client: clients.pocketBearsApparel });
  const queryMythicalMoods = useQuery<StorefrontData>(storefrontQuery, { client: clients.mythicalMoods });
  const queryAuraEssence = useQuery<StorefrontData>(storefrontQuery, { client: clients.auraEssence });

  const queries = [
    queryBearBelts,
    queryPocketBearsApparel,
    queryMythicalMoods,
    queryAuraEssence,
  ];

  const loading = queries.some((query) => query.loading);
  const error = queries.some((query) => query.error);

  const prevErrorsRef = React.useRef<(ApolloError | undefined)[]>([]);

  React.useEffect(() => {
    const prevErrors = prevErrorsRef.current;

    queries.forEach((query, index) => {
      if (query.error && query.error !== prevErrors[index]) {
        console.error(query.error);
      }
    });

    prevErrorsRef.current = queries.map((query) => query.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  // Memoize derived data keyed off the query data values to ensure stability and purity.
  // This avoids re-sorting when loading/error changes but data remains the same.
  const queryData = queries.map((q) => q.data);
  const { shops, articles } = React.useMemo(() => {
    const shopData: Shop[] = [];
    let articlesData: Article[] = [];

    queryData.forEach((data) => {
      if (data) {
        shopData.push(data.shop);
        if (data.articles.nodes) {
          articlesData.push(...data.articles.nodes);
        }
      }
    });

    articlesData = articlesData.sort((a, b) => {
      const aTime = new Date(a.publishedAt).getTime();
      const bTime = new Date(b.publishedAt).getTime();

      return bTime - aTime;
    });

    return { shops: shopData, articles: articlesData };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, queryData);

  const now = new Date();

  return (
    <Router>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container className="justify-content-between" fluid>
          <Navbar.Brand href="/">
            <Img className="d-inline-block align-top" src={logo} alt="M-K" fluid /> Enterprises
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
          <Route path="/" element={<Home loading={loading} error={error} shops={shops} articles={articles} />} />
          <Route path="/about" element={<About loading={loading} error={error} shops={shops} />} />
          <Route path="/brands" element={<Brands loading={loading} error={error} shops={shops} />} />
          <Route path="/news" element={<News loading={loading} error={error} articles={articles} />} />
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
