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
