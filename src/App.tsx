import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Image as Img, Nav, Navbar, Spinner } from 'react-bootstrap';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
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

const shopConfigs = [
  { key: 'bearBelts', client: clients.bearBelts },
  { key: 'pocketBearsApparel', client: clients.pocketBearsApparel },
  { key: 'mythicalMoods', client: clients.mythicalMoods },
  { key: 'auraEssence', client: clients.auraEssence },
] as const;

function App() {
  const queries = shopConfigs.map(
    (shopConfig) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery<StorefrontData>(storefrontQuery, { client: shopConfig.client })
  );

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [shops, setShops] = React.useState<Shop[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);

  React.useEffect(() => {
    setLoading(queries.some((query) => query.loading));
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  queries.map((query) => query.loading));

  React.useEffect(() => {
    const hasError = queries.some((query) => query.error);

    if (hasError) {
      queries.forEach((query) => {
        if (query.error) {
          console.error(query.error);
        }
      });
    }
    setError(hasError);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  queries.map((query) => query.error));

  React.useEffect(() => {
    const shopData: Shop[] = [];
    let articlesData: Article[] = [];

    queries.forEach((query) => {
      if (query.data) {
        shopData.push(query.data.shop);
        if (query.data.articles.nodes) {
          articlesData.push(...query.data.articles.nodes);
        }
      }
    });

    articlesData = articlesData.sort((a, b) => {
      const aTime = new Date(a.publishedAt).getTime();
      const bTime = new Date(b.publishedAt).getTime();

      return bTime - aTime;
    });

    setShops(shopData);
    setArticles(articlesData);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  queries.map((query) => query.data));

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
