'use client';
import React from 'react';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

/**
 * Global 404 page.
 *
 * @returns React element shown when a page is not found.
 */
export default function NotFound() {
  return (
    <>
      <Block className='text-bg-primary'>
        <Container>
          <Block.Title>Page Not Found</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container className='text-center'>
          <p className='lead'>Sorry, we couldn\'t find that page.</p>
          <Link href='/' className='btn btn-more'>
            Go Home
          </Link>
        </Container>
      </Block>
    </>
  );
}

