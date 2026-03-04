import React from 'react';
import { Container } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'start' | 'center' | 'end';
  variant?: 'primary' | 'light';
  children?: React.ReactNode;
}

/**
 * Render a page header block with a title, optional subtitle and optional children.
 *
 * @param title - The header title text
 * @param subtitle - Optional subheading displayed as a lead paragraph
 * @param align - Text alignment: 'start', 'center' or 'end' (defaults to 'start')
 * @param variant - Visual variant affecting background/text: 'primary' or 'light' (defaults to 'primary')
 * @param children - Optional React nodes rendered inside the header container
 * @returns A React element representing the header block
 */
function PageHeader({ title, subtitle, align = 'start', variant = 'primary', children }: PageHeaderProps) {
  return (
    <Block className={`text-bg-${variant} text-${align}`}>
      <Container>
        <Block.Title>{title}</Block.Title>
        {subtitle ? <p className="lead">{subtitle}</p> : null}
        {children}
      </Container>
    </Block>
  );
}

export default PageHeader;