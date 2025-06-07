import React from 'react';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

/**
 * Privacy Policy page.
 *
 * @returns React element containing the policy.
 */
function PrivacyPolicy() {
  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Privacy Policy 📄</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container>
          <h2>Introduction and Scope</h2>
          <p>
            This Privacy Policy describes how M-K Enterprises ("we", "our", or
            "us") collects, uses, and shares personal information when you use
            our website. It applies to all visitors and users of the site and is
            effective as of 1 January 2023.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly, such as your name,
            contact details, and any communications sent to us. We also gather
            data automatically through cookies and similar technologies, as well
            as information from analytics providers and other third parties.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            We use personal data to operate our business, including processing
            orders, providing customer support, sending updates, and improving
            our services. We process information only for legitimate interests or
            with your consent where required.
          </p>
          <h2>How We Share Your Information</h2>
          <p>
            We may share data with service providers, business partners, or
            affiliates solely to deliver our services. We also disclose
            information if required by law or during business transfers. Third
            parties may use data only to perform services for us and must comply
            with applicable privacy laws.
          </p>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            Our site uses cookies and similar tools to remember preferences and
            analyse traffic. You can disable cookies in your browser. We respect
            Do Not Track signals and allow you to control these technologies at
            any time.
          </p>
          <h2>Your Rights</h2>
          <p>
            Under GDPR, you may access, correct, delete, or restrict processing
            of your personal data and request portability. Under CCPA, you have
            the right to know what information we collect, request deletion, and
            opt out of any sale of your data. We do not sell personal
            information. To exercise these rights, contact us at
            privacy@m-k.enterprises. We will verify your request before
            processing it and will not discriminate against you for exercising
            your rights.
          </p>
          <h2>Data Retention and Security</h2>
          <p>
            We keep personal data only as long as needed for the purposes stated
            in this policy. We protect information with encryption, secure
            servers, and other safeguards, though no method is completely secure.
          </p>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this policy occasionally. When we do, we will post the
            new version on this page with a revised effective date. Please check
            back regularly for updates.
          </p>
          <h2>Contact Information</h2>
          <p>
            For questions or requests regarding this Privacy Policy, contact us
            at <a href="mailto:privacy@m-k.enterprises">privacy@m-k.enterprises</a>.
          </p>
        </Container>
      </Block>
    </>
  );
}

export default PrivacyPolicy;
