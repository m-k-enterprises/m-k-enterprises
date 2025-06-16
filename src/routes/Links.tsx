import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { ShopProps } from '../App';
import LinkCard from './LinkCard';
import './Links.scss';

interface LinksProps extends ShopProps {}

/**
 * External links page.
 *
 * @param props - Shop data with loading state.
 * @returns React element containing corporate links.
 */

function Links(props: LinksProps) {
  const items = props.shops.map(shop => ({
    name: shop.name,
    tagline: shop.brand?.slogan,
    href: shop.primaryDomain.url,
  }));

  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>Useful Links</Block.Title>
        </Container>
      </Block>
      <Block>
        <Container className="links">
          <Row>
            {items.map(link => (
              <LinkCard key={link.href} name={link.name} tagline={link.tagline} href={link.href} />
            ))}
          </Row>
        </Container>
      </Block>
    </>
  );
}

export default Links;
