'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

interface SiteShellProps {
  children: ReactNode;
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/brands', label: 'Our Brands' },
  { href: '/news', label: 'News' },
  { href: '/responsibility', label: 'Responsibility' },
  { href: '/contact', label: 'Contact' },
];

function normalisePathname(pathname: string): string {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/+$/, '');
}

function isActiveRoute(currentPathname: string, href: string): boolean {
  return normalisePathname(currentPathname) === normalisePathname(href);
}

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container className="justify-content-between" fluid>
          <Navbar.Brand as={Link} href="/">
            <Image className="d-inline-block align-top" src="/logo.svg" alt="M-K" fluid /> Enterprises
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto" variant="bordered">
              {navigationItems.map((item) => (
                <Nav.Item key={item.href}>
                  <Nav.Link as={Link} href={item.href} active={isActiveRoute(pathname, item.href)}>
                    {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
      <Block>
        <Container>
          <p>
            &copy; 2022 - {currentYear} M-K Enterprises. All rights reserved.
            {' '}
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
        </Container>
      </Block>
    </>
  );
}
