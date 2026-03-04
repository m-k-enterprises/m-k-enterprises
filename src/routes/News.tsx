import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { Articles, PageLayout, StatusMessage, usePageMetadata } from '../components';
import { ArticleProps } from '../App';

/**
 * Render the News route showing recent company articles.
 *
 * Sets page metadata (title "News" and a brief description) and displays either
 * an Articles grid when data is ready or a StatusMessage for loading, error or
 * empty states.
 *
 * @param props - ArticleProps containing `articles`, `loading`, `error` and optional `onRetry`
 * @returns The rendered React element for the news page
 */
function News(props: ArticleProps) {
  usePageMetadata({
    title: 'News',
    description: 'Read the latest news and updates from M-K Enterprises.',
  });

  const status = props.error ? 'error' : props.loading ? 'loading' : props.articles.length === 0 ? 'empty' : 'ready';

  return (
    <PageLayout title="Latest News">
      <Block>
        <Container>
          {status === 'ready' ? (
            <Row className="g-3" xs={1} md={2}>
              <Articles loading={props.loading} error={props.error} articles={props.articles} />
            </Row>
          ) : (
            <StatusMessage
              state={status === 'error' ? 'error' : status === 'loading' ? 'loading' : 'empty'}
              message={status === 'loading'
                ? 'Loading the latest news…'
                : status === 'error'
                  ? 'We ran into trouble loading news updates.'
                  : 'No news updates are available right now.'}
              onRetry={status === 'error' ? props.onRetry : undefined}
            />
          )}
        </Container>
      </Block>
    </PageLayout>
  );
}

export default News;