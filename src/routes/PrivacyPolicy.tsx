import React from 'react';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

/**
 * Privacy policy page.
 *
 * @returns Page component
 */
function PrivacyPolicy() {
  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Privacy Policy</Block.Title>
          <p>Effective Date: June 7, 2025</p>
        </Container>
      </Block>
      <Block as="section" id="introduction">
        <Container>
          <h2>Introduction and Scope</h2>
          <p>
            M-K Enterprise ("we", "us", or "our") operates this website to provide
            information about our products and services. This Privacy Policy
            explains how we collect, use, and share personal data from anyone who
            visits or interacts with our site. It applies to all visitors,
            customers, and users of{' '}
            <a href="https://m-k.enterprises">m-k.enterprises</a>.
          </p>
        </Container>
      </Block>
      <Block as="section" id="info-we-collect">
        <Container>
          <h2>Information We Collect</h2>
          <p>
            We collect the information you provide directly to us, such as your
            name, email, postal address, phone number, and payment details when
            you place an order or contact us. We also automatically gather data
            like IP address, browser type, device identifiers, usage
            information, and cookies. We may receive additional insights from
            analytics providers and other business partners.
          </p>
        </Container>
      </Block>
      <Block as="section" id="how-we-use">
        <Container>
          <h2>How We Use Your Information</h2>
          <p>
            We process personal data to fulfill orders, respond to inquiries,
            provide customer support, personalize your experience, send updates
            or promotions, and improve our services. We only use data for
            legitimate business interests or with your consent where required by
            law.
          </p>
        </Container>
      </Block>
      <Block as="section" id="share">
        <Container>
          <h2>How We Share Your Information</h2>
          <p>
            We may share personal information with trusted service providers that
            assist with payment processing, shipping, website hosting, analytics,
            or marketing. These partners may not use your data for their own
            purposes and must handle it in compliance with applicable privacy
            laws such as GDPR and CCPA. We may also disclose data to comply with
            legal obligations or during business transactions like a merger or
            acquisition.
          </p>
        </Container>
      </Block>
      <Block as="section" id="cookies">
        <Container>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            Our site uses cookies and similar technologies to operate
            efficiently, remember your preferences, analyze usage, and deliver
            relevant advertising. You can control cookies through your browser
            settings. We currently honor "Do Not Track" signals where supported.
            Third-party services, including Google Analytics and the Facebook
            Pixel, may also set cookies when you visit our site.
          </p>
        </Container>
      </Block>
      <Block as="section" id="rights">
        <Container>
          <h2>Your Rights</h2>
          <p>
            If you are in the EU or EEA, you can access, correct, update,
            delete, or restrict the processing of your personal data and request
            a copy in a portable format. If you are a California resident, you
            can request to know what personal information we collect or
            disclose, ask us to delete your data, and opt out of any sale of
            personal information. We do not sell personal information. You may
            exercise these rights by contacting us at{' '}
            <a href="mailto:team@m-k.enterprises">team@m-k.enterprises</a>. We
            may require verification before honoring a request.
          </p>
        </Container>
      </Block>
      <Block as="section" id="retention">
        <Container>
          <h2>Data Retention and Security</h2>
          <p>
            We retain personal information only as long as necessary to achieve
            the purposes described in this policy, unless the law requires a
            longer period. We implement encryption, secure servers, and other
            safeguards to protect personal data, but no method is 100% secure.
            We strive to use commercially acceptable means to keep your data
            safe.
          </p>
        </Container>
      </Block>
      <Block as="section" id="changes">
        <Container>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the
            revised policy on this page with an updated effective date.
            Significant changes may be announced via email or a prominent notice
            on our site. Please review this policy periodically.
          </p>
        </Container>
      </Block>
      <Block as="section" id="contact">
        <Container>
          <h2>Contact Information</h2>
          <p>
            For questions or concerns about this Privacy Policy or our data
            practices, please email us at{' '}
            <a href="mailto:team@m-k.enterprises">team@m-k.enterprises</a>.
          </p>
        </Container>
      </Block>
    </>
  );
}

export default PrivacyPolicy;
