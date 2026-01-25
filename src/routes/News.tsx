import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { Articles, PageLayout, StatusMessage, usePageMetadata } from '../components';
import { ArticleProps } from '../App';

/**
 * News route listing recent company articles.
 *
 * @param props - Article data with loading state.
 * @returns JSX for the news route.
 */
function News(props: ArticleProps) {
  usePageMetadata({
    title: 'News',
    description: 'Read the latest news and updates from M-K Enterprises.',
  });

  const status = props.loading ? 'loading' : props.error ? 'error' : props.articles.length === 0 ? 'empty' : 'ready';

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
