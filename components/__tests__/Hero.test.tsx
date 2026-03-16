import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '../Hero';

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: {
    src: string; alt: string; width?: number; height?: number; className?: string;
  }) => <img src={src} alt={alt} width={width} height={height} className={className} />,
}));

vi.mock('@/lib/sanity/image', () => ({
  urlFor: vi.fn(() => ({
    width: vi.fn().mockReturnThis(),
    height: vi.fn().mockReturnThis(),
    fit: vi.fn().mockReturnThis(),
    auto: vi.fn().mockReturnThis(),
    url: vi.fn().mockReturnValue('https://cdn.sanity.io/profile.jpg'),
  })),
}));

vi.mock('motion/react', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_: object, tag: string) => {
      return function MotionEl({ children, initial, animate, transition, ...rest }: {
        children?: React.ReactNode;
        initial?: unknown; animate?: unknown; transition?: unknown;
        [key: string]: unknown;
      }) {
        return React.createElement(tag, rest, children);
      };
    },
  });
  return { motion };
});

describe('Hero', () => {
  it('returns null when data is undefined', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the headline', () => {
    render(<Hero data={{ headline: 'Hello, I am Van' }} />);
    expect(screen.getByText('Hello, I am Van')).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<Hero data={{ subheading: 'QA Automation Engineer' }} />);
    expect(screen.getByText('QA Automation Engineer')).toBeInTheDocument();
  });

  it('renders the body text', () => {
    render(<Hero data={{ bodyText: 'I build quality software.' }} />);
    expect(screen.getByText('I build quality software.')).toBeInTheDocument();
  });

  it('renders cta1 as a download link', () => {
    render(<Hero data={{ cta1: { text: 'Download CV', url: '/cv.pdf', isExternal: false } }} />);
    const link = screen.getByRole('link', { name: /download cv/i });
    expect(link).toHaveAttribute('href', '/cv.pdf');
    expect(link).toHaveAttribute('download');
  });

  it('renders cta1 as an external link without download', () => {
    render(<Hero data={{ cta1: { text: 'View Resume', url: 'https://example.com', isExternal: true } }} />);
    const link = screen.getByRole('link', { name: /view resume/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).not.toHaveAttribute('download');
  });

  it('renders cta2 as a mailto link', () => {
    render(
      <Hero data={{ cta2: { text: 'Contact Me', email: 'hello@test.com' } }} />
    );
    const link = screen.getByRole('link', { name: 'Contact Me' });
    expect(link).toHaveAttribute('href', 'mailto:hello@test.com');
  });

  it('does not render cta2 when email is missing', () => {
    render(<Hero data={{ cta2: { text: 'Contact Me' } }} />);
    expect(screen.queryByRole('link', { name: 'Contact Me' })).toBeNull();
  });

  it('does not render cta1 when url is missing', () => {
    render(<Hero data={{ cta1: { text: 'Download CV' } }} />);
    expect(screen.queryByRole('link', { name: /download cv/i })).toBeNull();
  });

  it('renders profile image when asset ref is provided', () => {
    render(
      <Hero data={{
        headline: 'Van Ian',
        image: { asset: { _ref: 'image-abc-123' } },
      }} />
    );
    expect(screen.getByRole('img', { name: 'Van Ian' })).toBeInTheDocument();
  });

  it('does not render image when no asset ref', () => {
    render(<Hero data={{ headline: 'Van Ian' }} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('uses headline as image alt text', () => {
    render(
      <Hero data={{
        headline: 'Van Ian Ignacio',
        image: { asset: { _ref: 'image-abc-123' } },
      }} />
    );
    expect(screen.getByAltText('Van Ian Ignacio')).toBeInTheDocument();
  });

  it('falls back to "Profile" alt text when no headline', () => {
    render(<Hero data={{ image: { asset: { _ref: 'image-abc-123' } } }} />);
    expect(screen.getByAltText('Profile')).toBeInTheDocument();
  });
});
