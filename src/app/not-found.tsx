'use client';

import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import PageLayout from '../components/PageLayout';

export default function NotFound() {
  return (
    <PageLayout title="Page Not Found">
      <Block>
        <Container>
          <p className="lead">The page you requested does not exist.</p>
          <Link className="btn btn-primary" href="/">
            Return home
          </Link>
        </Container>
      </Block>
    </PageLayout>
  );
}
