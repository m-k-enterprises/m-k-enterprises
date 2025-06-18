import React from 'react';
import { Button, Card, Col, Placeholder, Ratio } from 'react-bootstrap';
import { random } from 'lodash';
import { ArticleProps } from '../types';

function Articles(props: ArticleProps) {
  return (
    <>
      {props.loading || props.error ? Array.from({ length: 6 }).map((_, index) => (
        <Col key={index} border="light">
          <Card border="light">
            <Ratio aspectRatio="16x9">
              <Placeholder variant="top" animation="glow">
                <Placeholder className="w-100 h-100" />
              </Placeholder>
            </Ratio>
            <Card.Body>
              <Placeholder animation="wave" as={Card.Title}>
                {Array.from({ length: random(2, 8) }).map((_, i) => (
                    <React.Fragment key={i}>
                      <Placeholder xs={random(1, 6)} />{' '}
                    </React.Fragment>
                  ))}
              </Placeholder>
              <Placeholder animation="wave" as={Card.Text}>
                {Array.from({ length: random(3, 12) }).map((_, i) => (
                  <React.Fragment key={i}>
                    <Placeholder xs={random(1, 6)} />{' '}
                  </React.Fragment>
                ))}
              </Placeholder>
              <Placeholder.Button variant="more" animation="wave" xs={2}>
                <Placeholder xs={12} />
              </Placeholder.Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Placeholder animation="wave">
                <Placeholder xs={random(1)} /> <Placeholder xs={random(1, 3)} /> <Placeholder xs={2} />
              </Placeholder>
            </Card.Footer>
          </Card>
        </Col>
      )) : props.articles.map(article => (
        <Col key={article.id}>
          <Card className="border-0" border="light">
            <Ratio aspectRatio="16x9">
              <Card.Img variant="top" src={article.image?.newsUrl} alt={article.image?.altText} width={article.image?.width} height={article.image?.height} />
            </Ratio>
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text dangerouslySetInnerHTML={{ __html: article.excerptHtml || '' }} />
              <Button
                variant="more"
                as="a"
                href={article.onlineStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
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
