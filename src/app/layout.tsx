'use client';
import React from 'react';
import Link from 'next/link';
import { Container, Image as Img, Nav, Navbar } from 'react-bootstrap';
import { Block } from '@smolpack/react-bootstrap-extensions';

import logo from '../logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.scss';
import '../App.scss';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout wrapping every page.
 *
 * Imports Bootstrap and custom SCSS so styles and fonts apply globally.
 *
 * @param props - Layout content.
 * @returns Page wrapper element.
 */
export default function RootLayout({ children }: LayoutProps) {
  const now = new Date();

  return (
    <html lang="en">
      <body>
        <Navbar bg="light" expand="lg" sticky="top">
          <Container className="justify-content-between" fluid>
            <Navbar.Brand as={Link} href="/">
              <Img className="d-inline-block align-top" src={logo} alt="M-K" fluid />{' '}
              Enterprises
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar-nav" />
            <Navbar.Collapse id="main-navbar-nav">
              <Nav className="ms-auto" variant="bordered">
                <Nav.Item>
                  <Nav.Link as={Link} href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} href="/about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} href="/brands">Our Brands</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} href="/news">News</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} href="/responsibility">Responsibility</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} href="/contact">Contact</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {children}
        <Block>
          <Container>
            <p>
              &copy; 2022 - {now.getFullYear()} M-K Enterprises.{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </p>
          </Container>
        </Block>
      </body>
    </html>
  );
}
