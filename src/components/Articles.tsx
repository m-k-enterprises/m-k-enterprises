import React from 'react';
import { Button, Card, Col, Placeholder, Ratio } from 'react-bootstrap';
import { ArticleProps } from '../App';
import { getBrandBorderStyle } from './brandStyles';

const articleSkeletons = [
  { title: [4, 3], text: [6, 5, 4, 2], footer: [1, 3] },
  { title: [5, 2], text: [4, 6, 3, 5], footer: [1, 2] },
  { title: [3, 5], text: [5, 4, 6, 2], footer: [1, 3] },
  { title: [6, 2], text: [3, 5, 4, 6], footer: [1, 2] },
  { title: [4, 4], text: [6, 3, 5, 3], footer: [1, 3] },
  { title: [5, 3], text: [4, 5, 6, 2], footer: [1, 2] },
] as const;

/**
 * Renders article cards in a responsive grid, or skeleton cards while loading or when an error is present.
 *
 * @param props - Article data and rendering state.
 * @returns A fragment containing skeleton cards or one card for each article.
 */
function Articles(props: ArticleProps) {
  return (
    <>
      {props.loading || props.error ? articleSkeletons.map((skeleton, index) => (
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
            {(() => {
              const imageUrl = article.image?.cardImageUrl ?? article.image?.url;
              if (!imageUrl) {
                return null;
              }

              return (
                <Ratio aspectRatio="16x9">
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={article.image?.altText || article.title}
                    width={article.image?.width}
                    height={article.image?.height}
                  />
                </Ratio>
              );
            })()}
            <Card.Body
              className="d-flex flex-column align-items-start"
              style={getBrandBorderStyle(article.brand)}
            >
              <Card.Title>{article.title}</Card.Title>
              {article.excerpt && <Card.Text>{article.excerpt}</Card.Text>}
              {article.onlineStoreUrl ? (
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
              ) : null}
            </Card.Body>
            <Card.Footer className="text-muted">{new Date(article.publishedAt).toLocaleDateString('en-GB', {
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
