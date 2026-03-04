import React from 'react';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';
import { PageLayout, usePageMetadata } from '../components';

/**
 * Render the Responsibility page describing the company's sustainability commitment.
 *
 * Sets the page metadata title to "Responsibility" and a descriptive summary for the route.
 *
 * @returns The rendered JSX element for the Responsibility page (PageLayout containing the sustainability content).
 */
function Responsibility() {
  usePageMetadata({
    title: 'Responsibility',
    description: 'See how M-K Enterprises is committed to responsible and sustainable practices.',
  });

  return (
    <PageLayout title="Our Commitment">
      <Block>
        <Container>
          <p className="lead"><strong>M-K Enterprises</strong> is committed to making the world a better place than we found it. We're focused on reducing our impact on the environment through sustainable practices, and we're constantly exploring new ways to innovate and improve.</p>
        </Container>
      </Block>
    </PageLayout>
  );
}

export default Responsibility;