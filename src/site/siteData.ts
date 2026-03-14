import React from 'react';

import type { Article, Shop, StorefrontData } from '../services';
import { useStorefrontData } from '../services/storefront';

export type { Article, Shop } from '../services';

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

export interface SiteStorefrontData {
  loading: boolean;
  error: boolean;
  shops: Shop[];
  articles: Article[];
  retryAll: () => Promise<void>;
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

export function useSiteStorefrontData(): SiteStorefrontData {
  const bearBelts = useStorefrontData('bearBelts');
  const pocketBearsApparel = useStorefrontData('pocketBearsApparel');
  const mythicalMoods = useStorefrontData('mythicalMoods');

  const queries = [bearBelts, pocketBearsApparel, mythicalMoods];
  const loading = queries.some((query) => query.loading);
  const error = queries.some((query) => query.error !== null);

  const retryAll = React.useCallback(async () => {
    await Promise.all([
      bearBelts.retry(),
      pocketBearsApparel.retry(),
      mythicalMoods.retry(),
    ]);
  }, [bearBelts, pocketBearsApparel, mythicalMoods]);

  const bearBeltsData = React.useMemo(() => mapStorefrontData(bearBelts.data), [bearBelts.data]);
  const pocketBearsData = React.useMemo(
    () => mapStorefrontData(pocketBearsApparel.data),
    [pocketBearsApparel.data]
  );
  const mythicalMoodsData = React.useMemo(
    () => mapStorefrontData(mythicalMoods.data),
    [mythicalMoods.data]
  );

  const { shops, articles } = React.useMemo(() => {
    const aggregatedShops: Shop[] = [];
    const aggregatedArticles: Article[] = [];

    [bearBeltsData, pocketBearsData, mythicalMoodsData].forEach(({ shop, articles: shopArticles }) => {
      if (shop) {
        aggregatedShops.push(shop);
      }

      aggregatedArticles.push(...shopArticles);
    });

    aggregatedArticles.sort((first, second) => {
      const firstPublishedAt = new Date(first.publishedAt).getTime();
      const secondPublishedAt = new Date(second.publishedAt).getTime();

      return secondPublishedAt - firstPublishedAt;
    });

    return {
      shops: aggregatedShops,
      articles: aggregatedArticles,
    };
  }, [bearBeltsData, pocketBearsData, mythicalMoodsData]);

  return {
    loading,
    error,
    shops,
    articles,
    retryAll,
  };
}
