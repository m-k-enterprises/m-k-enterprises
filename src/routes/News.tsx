import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { Articles } from '../components';
import { ArticleProps } from '../App';

/**
 * News route listing recent company articles.
 *
 * @param props - Article data with loading state.
 * @returns JSX for the news route.
 */
function News(props: ArticleProps) {
  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Latest News</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container>
          <Row className="g-3" xs={1} md={2}>
            <Articles loading={props.loading} error={props.error} articles={props.articles} />
          </Row>
        </Container>
      </Block>
    </>
  );
}

export default News;
