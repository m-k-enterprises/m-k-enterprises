'use strict';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

/**
 * Display the privacy policy.
 */
function Privacy() {
  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Privacy Policy</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container>
          <p className="lead">We respect your privacy and protect your data. 🤝</p>
          <p>
            We only use your information to deliver and improve our services. We
            will never share your details without your consent.
          </p>
        </Container>
      </Block>
    </>
  );
}

export default Privacy;
