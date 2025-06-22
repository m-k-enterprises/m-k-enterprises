import { useEffect, useState } from 'react';
import { loader } from 'graphql.macro';
import { ApolloQueryResult } from '@apollo/client';
import { clients } from '../clients';
import { Article, Shop } from '../types';

const STOREFRONT_QUERY = loader('../storefront.gql');

export interface StorefrontState {
  shops: Shop[];
  articles: Article[];
  loading: boolean;
  error: boolean;
}

/**
 * Fetches shops and articles using the configured Shopify clients.
 *
 * @returns Data and status flags.
 */
export default function useStorefront(): StorefrontState {
  const [state, setState] = useState<StorefrontState>({
    shops: [],
    articles: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const results: ApolloQueryResult<any>[] = await Promise.all(
          Object.values(clients).map(client => client.query({
            query: STOREFRONT_QUERY,
            fetchPolicy: 'no-cache',
          }))
        );
        if (!active) return;
        setState({
          shops: results.map(r => r.data.shop as Shop),
          articles: results.flatMap(r => r.data.articles.nodes as Article[]),
          loading: false,
          error: false,
        });
      } catch {
        if (active) {
          setState(prev => ({ ...prev, loading: false, error: true }));
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
