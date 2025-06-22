'use client';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { Articles } from '../../components';
import useStorefront from '../../hooks/useStorefront';

/**
 * News route listing recent company articles.
 *
 * Fetches article data for the news listing.
 *
 * @returns JSX for the news route.
 */
export default function News() {
  const { articles, loading, error } = useStorefront();
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

