import React from 'react';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

/**
 * Details the company's sustainability efforts.
 *
 * @returns JSX for the responsibility route.
 */
function Responsibility() {
  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Our Commitment</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container>
          <p className="lead"><strong>M-K Enterprises</strong> is committed to making the world a better place than we found it. We're focused on reducing our impact on the environment through sustainable practices, and we're constantly exploring new ways to innovate and improve.</p>
        </Container>
      </Block>
    </>
  );
}

export default Responsibility;
