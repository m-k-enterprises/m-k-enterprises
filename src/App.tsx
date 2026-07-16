'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import type { Article, Shop, StorefrontData } from './services';
import { useStorefrontData } from './services/storefront';

export type { Article, Shop } from './services';

interface QueryProps {
  loading: boolean;
  error: boolean;
  onRetry?: () => Promise<void>;
}

export interface ShopProps extends QueryProps {
  shops: Shop[];
}

export interface ArticleProps extends QueryProps {
  articles: Article[];
}

export interface StorefrontContextValue extends ShopProps, ArticleProps {
  onRetry: () => Promise<void>;
}

const emptyStorefrontValue: StorefrontContextValue = {
  shops: [],
  articles: [],
  loading: true,
  error: false,
  onRetry: async () => {},
};

const StorefrontContext = React.createContext<StorefrontContextValue>(emptyStorefrontValue);

/**
 * Provides access to the shared storefront data and query state.
 *
 * @returns The current storefront context value
 */
export function useStorefront(): StorefrontContextValue {
  return React.useContext(StorefrontContext);
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/brands', label: 'Our Brands' },
  { href: '/news', label: 'News' },
  { href: '/responsibility', label: 'Responsibility' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * Normalises storefront data for use by the application.
 *
 * @param data - The storefront data to normalise, or `null` when unavailable
 * @returns The shop and its articles, with each article associated with the shop's brand
 */
function mapStorefrontData(data: StorefrontData | null) {
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
}

interface AppProps {
  children?: React.ReactNode;
}

/**
 * Provide shared storefront state and render the site-wide navigation and footer.
 */
function App({ children }: AppProps) {
  const pathname = usePathname();
  const queryBearBelts = useStorefrontData('bearBelts');
  const queryPocketBearsApparel = useStorefrontData('pocketBearsApparel');
  const queryMythicalMoods = useStorefrontData('mythicalMoods');

  const { retry: retryBearBelts } = queryBearBelts;
  const { retry: retryPocketBearsApparel } = queryPocketBearsApparel;
  const { retry: retryMythicalMoods } = queryMythicalMoods;

  const queries = React.useMemo(
    () => [queryBearBelts, queryPocketBearsApparel, queryMythicalMoods],
    [queryBearBelts, queryPocketBearsApparel, queryMythicalMoods],
  );
  const loading = queries.some((query) => query.loading);
  const error = queries.some((query) => Boolean(query.error));

  const retryAll = React.useCallback(async () => {
    await Promise.all([
      retryBearBelts(),
      retryPocketBearsApparel(),
      retryMythicalMoods(),
    ]);
  }, [retryBearBelts, retryPocketBearsApparel, retryMythicalMoods]);

  const bearBeltsData = React.useMemo(
    () => mapStorefrontData(queryBearBelts.data),
    [queryBearBelts.data],
  );
  const pocketBearsData = React.useMemo(
    () => mapStorefrontData(queryPocketBearsApparel.data),
    [queryPocketBearsApparel.data],
  );
  const mythicalMoodsData = React.useMemo(
    () => mapStorefrontData(queryMythicalMoods.data),
    [queryMythicalMoods.data],
  );

  const { shops, articles } = React.useMemo(() => {
    const shopData: Shop[] = [];
    const articlesData: Article[] = [];
    const dataList = [bearBeltsData, pocketBearsData, mythicalMoodsData];

    dataList.forEach(({ shop, articles: shopArticles }) => {
      if (shop) {
        shopData.push(shop);
      }

      articlesData.push(...shopArticles);
    });

    articlesData.sort((firstArticle, secondArticle) => {
      const firstPublishedAt = new Date(firstArticle.publishedAt).getTime();
      const secondPublishedAt = new Date(secondArticle.publishedAt).getTime();

      return secondPublishedAt - firstPublishedAt;
    });

    return { shops: shopData, articles: articlesData };
  }, [bearBeltsData, pocketBearsData, mythicalMoodsData]);

  const storefrontValue = React.useMemo<StorefrontContextValue>(
    () => ({
      shops,
      articles,
      loading,
      error,
      onRetry: retryAll,
    }),
    [shops, articles, loading, error, retryAll],
  );

  return (
    <StorefrontContext.Provider value={storefrontValue}>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container className="justify-content-between" fluid>
          <Link className="navbar-brand" href="/">
            <Image
              className="d-inline-block align-top"
              src="/logo.svg"
              alt="M-K"
              fluid
            />{' '}
            Enterprises
          </Link>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto" variant="bordered">
              {navigationItems.map(({ href, label }) => {
                const isActive = pathname === href;

                return (
                  <Nav.Item key={href}>
                    <Link
                      className={`nav-link${isActive ? ' active' : ''}`}
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
      <Block>
        <Container>
          <p>
            &copy; 2022 - {new Date().getFullYear()} M-K Enterprises. All rights reserved.{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
        </Container>
      </Block>
    </StorefrontContext.Provider>
  );
}

export default App;
