'use client';

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { Articles, PageLayout, StatusMessage } from '../components';
import { ArticleProps, useStorefront } from '../App';

/**
 * Renders the latest company news, showing articles when available or an appropriate status message otherwise.
 *
 * @param props - Optional article data and state overrides
 * @returns The rendered React element for the news page
 */
function News(props?: Partial<ArticleProps>) {
  const storefront = useStorefront();
  const pageProps = props ? { ...storefront, ...props } : storefront;
  const status = pageProps.error ? 'error' : pageProps.loading ? 'loading' : pageProps.articles.length === 0 ? 'empty' : 'ready';

  return (
    <PageLayout title="Latest News">
      <Block>
        <Container>
          {status === 'ready' ? (
            <Row className="g-3" xs={1} md={2}>
              <Articles
                loading={pageProps.loading}
                error={pageProps.error}
                articles={pageProps.articles}
              />
            </Row>
          ) : (
            <StatusMessage
              state={status === 'error' ? 'error' : status === 'loading' ? 'loading' : 'empty'}
              message={status === 'loading'
                ? 'Loading the latest news…'
                : status === 'error'
                  ? 'We ran into trouble loading news updates.'
                  : 'No news updates are available right now.'}
              onRetry={status === 'error' ? pageProps.onRetry : undefined}
            />
          )}
        </Container>
      </Block>
    </PageLayout>
  );
}

export default News;
