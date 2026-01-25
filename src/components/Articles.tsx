import React from 'react';
import { Button, Card, Col, Placeholder, Ratio } from 'react-bootstrap';
import random from 'lodash/random';
import { ArticleProps } from '../App';

function Articles(props: ArticleProps) {
  const skeletons = React.useMemo(() => Array.from({ length: 6 }).map(() => ({
    title: Array.from({ length: random(2, 8) }).map(() => random(1, 6)),
    text: Array.from({ length: random(3, 12) }).map(() => random(1, 6)),
    footer: [random(1), random(1, 3)]
  })), []);

  return (
    <>
      {props.loading || props.error ? skeletons.map((skeleton, index) => (
        <Col key={index} border="light">
          <Card border="light">
            <Ratio aspectRatio="16x9">
              <Placeholder variant="top" animation="glow">
                <Placeholder className="w-100 h-100" />
              </Placeholder>
            </Ratio>
            <Card.Body>
              <Placeholder animation="wave" as={Card.Title}>
                {skeleton.title.map((width, i) => (
                    <React.Fragment key={i}>
                      <Placeholder xs={width} />{' '}
                    </React.Fragment>
                  ))}
              </Placeholder>
              <Placeholder animation="wave" as={Card.Text}>
                {skeleton.text.map((width, i) => (
                  <React.Fragment key={i}>
                    <Placeholder xs={width} />{' '}
                  </React.Fragment>
                ))}
              </Placeholder>
              <Placeholder.Button variant="more" animation="wave" xs={2}>
                <Placeholder xs={12} />
              </Placeholder.Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Placeholder animation="wave">
                <Placeholder xs={skeleton.footer[0]} /> <Placeholder xs={skeleton.footer[1]} /> <Placeholder xs={2} />
              </Placeholder>
            </Card.Footer>
          </Card>
        </Col>
      )) : props.articles.map(article => (
        <Col key={article.id}>
          <Card className="border-0" border="light">
            <Ratio aspectRatio="16x9">
              <Card.Img variant="top" src={article.image?.newsImageUrl} alt={article.image?.altText || article.title} />
            </Ratio>
            <Card.Body className="d-flex flex-column align-items-start"
              style={{
                borderColor: article.brand?.colors.primary[0].background ? `${article.brand.colors.primary[0].background}` : undefined,
              }}>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.excerpt || ''}</Card.Text>
              <Button
                variant="more"
                as="a"
                href={article.onlineStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto"
              >
                Read more
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">{new Date(article.publishedAt).toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</Card.Footer>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default Articles;
