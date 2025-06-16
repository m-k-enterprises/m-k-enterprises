import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import { ShopProps } from '../App';
import { LinkCard } from '../components';
import './Links.scss';

interface LinksProps extends ShopProps {}

/**
 * External links page.
 *
 * @param props - Shop data with loading state.
 * @returns React element containing corporate links.
 */

function Links(props: LinksProps) {
  const items = props.shops;

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
            {items.map(shop => (
              <LinkCard key={shop.id} shop={shop} />
            ))}
          </Row>
        </Container>
      </Block>
    </>
  );
}

export default Links;
