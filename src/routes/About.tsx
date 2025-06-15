import React from 'react';
import { Button, Card, Col, Container, Figure, Placeholder, Row } from 'react-bootstrap';
import { Block, PullQuote, StatCard } from '@smolpack/react-bootstrap-extensions';
import { intersection, union } from 'lodash';
import { ShopProps } from '../App';
import about from './about.jpg';
import Gravatar from 'react-gravatar';

/**
 * About page describing the company and team.
 *
 * @param props - Shop data with loading state.
 * @returns JSX for the about route.
 */
function About(props: ShopProps) {
  const shipsToCountriesMin = intersection(...props.shops.map(shop => shop.shipsToCountries)).length;
  const shipsToCountriesMax = union(...props.shops.map(shop => shop.shipsToCountries)).length;

  const team = [
    {
      firstName: 'Kristian',
      lastName: 'Matthews-Kennington',
      email: 'kristian@m-k.enterprises',
      job: 'Co-Owner',
      linkedInUrl: 'http://linkedin.com/in/kristianmatthewskennington'
    },
    {
      firstName: 'Paul',
      lastName: 'Matthews-Kennington',
      email: 'paul@m-k.enterprises',
      job: 'Co-Owner',
      linkedInUrl: 'https://linkedin.com/in/paul-matthews-kennington-201007a6'
    }
  ];

  return (
    <>
      <Block className="text-bg-primary">
        <Container>
          <Block.Title>About Us</Block.Title>
        </Container>
      </Block>
      <Block>
        <Row>
          <Col>
            <StatCard className="text-center">
              <StatCard.Desc>Ships to</StatCard.Desc>
              {props.loading || props.error ? (
                <Placeholder className="statcard-number text-primary" as="h2" animation="wave">
                  <Placeholder xs={1} />
                </Placeholder>
              ) : (
                <StatCard.Number className="text-primary">{shipsToCountriesMin}{shipsToCountriesMax > shipsToCountriesMin ? '+' : null}</StatCard.Number>
              )}
              <StatCard.Desc>Countries</StatCard.Desc>
            </StatCard>
          </Col>
        </Row>
      </Block>
      <Block>
        <Container>
          <Row className="align-items-center">
            <Col>
              <Figure>
                <Figure.Image src={about} fluid />
                <Figure.Caption className="text-center">Bear Belts' first event in Edinburgh.</Figure.Caption>
              </Figure>
            </Col>
            <Col>
              <PullQuote>
                <p>Our focus from the beginning has been simple: to provide our customers with the best possible products and service.</p>
                <cite>
                  <div className="text-primary">Kristian Matthews-Kennington</div>
                  <div className="text-muted">Co-Owner</div>
                </cite>
              </PullQuote>
            </Col>
          </Row>
        </Container>
      </Block>
      <Block className="text-bg-primary">
        <Container>
          <Row>
            <Col>
              <h2>Mission</h2>
              <p className="lead">Customer success is everything.</p>
            </Col>
            <Col>
              <h2>Vision</h2>
              <p className="lead">Build brands that consumers love.</p>
            </Col>
            <Col>
              <h2>Values</h2>
              <p className="lead">Quality, service, honesty, teamwork.</p>
            </Col>
          </Row>
        </Container>
      </Block>
      <Block>
        <Container>
          <h2>One of the world's most popular brands, brought to you by M-K Enterprises.</h2>
          <p>Founded in 2022 by Kristian and Paul Matthews-Kennington, M-K Enterprises quickly established itself as a force to be reckoned with. With a laser focus on quality and customer service, the company has earned a reputation for excellence that has attracted a global following.</p>
          <p>M-K Enterprises offers a diverse portfolio of brands and products that cater to a range of needs. With a commitment to innovation and collaboration, the company works with partners and customers alike to develop cutting-edge solutions that meet the demands of a rapidly changing world.</p>
        </Container>
      </Block>
      <Block className="text-bg-primary text-center">
        <Container className="mb-5">
          <h2>Our Team</h2>
        </Container>
      </Block>
      <Container className="mt-n5">
        <Row className="justify-content-center">
          {team.map(member => (
            <Col key={member.email} xs={6} md={4} xl={3}>
              <Card className="border-0" border="light">
                <Gravatar className="card-img-top img-fluid" email={member.email} rating="g" size={1920} default="blank" />
                <Card.Body>
                  <Card.Title>{member.firstName} {member.lastName}</Card.Title>
                  <Card.Text>{member.job}</Card.Text>
                  <Button
                    variant="more"
                    as="a"
                    href={member.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default About;
