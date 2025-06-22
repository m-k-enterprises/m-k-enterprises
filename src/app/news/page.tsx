'use client';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { Articles } from '../../components';
import { ArticleProps } from '../../types';

/**
 * News route listing recent company articles.
 *
 * @param props - Article data with loading state.
 * @returns JSX for the news route.
 */
export default function News({
  loading = false,
  error = false,
  articles = [],
}: ArticleProps) {
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
            <Articles loading={loading} error={error} articles={articles} />
          </Row>
        </Container>
      </Block>
    </>
  );
}

