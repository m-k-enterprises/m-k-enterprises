import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('../../hooks/useStorefront', () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useStorefront from '../../hooks/useStorefront';
import About from './page';

const urls = [
  'http://linkedin.com/in/kristianmatthewskennington',
  'https://linkedin.com/in/paul-matthews-kennington-201007a6',
];

beforeEach(() => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops: [],
    articles: [],
    loading: true,
    error: false,
  });
});

test('renders heading', () => {
  render(<About />);
  const heading = screen.getByRole('heading', { name: /about us/i });
  expect(heading).toBeInTheDocument();
});

test('renders team links', () => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops: [],
    articles: [],
    loading: false,
    error: false,
  });
  render(<About />);
  const links = screen.getAllByRole('button', { name: /linkedin/i });
  expect(links).toHaveLength(2);
  links.forEach((link, i) => {
    expect(link).toHaveAttribute('href', urls[i]);
    expect(typeof link.getAttribute('href')).toBe('string');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('renders about image with alt', () => {
  (useStorefront as jest.Mock).mockReturnValue({
    shops: [],
    articles: [],
    loading: false,
    error: false,
  });
  render(<About />);
  const image = screen.getByAltText(/Bear Belts launch event/i);
  expect(image).toBeInTheDocument();
});
