'use client';

import React from 'react';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { PageLayout } from '../components';

/**
 * Renders the company's sustainability commitment page.
 *
 * @returns The rendered Responsibility page.
 */
function Responsibility() {
  return (
    <PageLayout title="Our Commitment">
      <Block>
        <Container>
          <p className="lead"><strong>M-K Enterprises</strong> is committed to making the world a better place than we found it. We’re focused on reducing our impact on the environment through sustainable practices, and we’re constantly exploring new ways to innovate and improve.</p>
        </Container>
      </Block>
    </PageLayout>
  );
}

export default Responsibility;
