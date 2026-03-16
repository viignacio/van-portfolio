import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Layout from '../Layout';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: {
    href: string; children: React.ReactNode; [key: string]: unknown;
  }) => <a href={href} {...rest}>{children}</a>,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, fill, className }: {
    src: string; alt: string; fill?: boolean; className?: string;
  }) => <img src={src} alt={alt} data-fill={fill ? 'true' : undefined} className={className} />,
}));

vi.mock('motion/react', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_: object, tag: string) => {
      return function MotionEl({ children, initial, animate, variants, transition, style, ...rest }: {
        children?: React.ReactNode;
        initial?: unknown; animate?: unknown; variants?: unknown; transition?: unknown; style?: unknown;
        [key: string]: unknown;
      }) {
        return React.createElement(tag, rest, children);
      };
    },
  });
  return { motion };
});

const navbarData = {
  title: 'My Portfolio',
  links: [
    { label: 'Home', href: '/', isExternal: false },
    { label: 'About', href: '#about', isExternal: false },
    { label: 'Blog', href: '/blog', isExternal: false },
    { label: 'GitHub', href: 'https://github.com', isExternal: true },
    { label: 'Style Guide', href: '/style-guide', isExternal: false },
  ],
};

const footerData = {
  title: 'Van Ian Ignacio',
  contactInfo: { email: 'hello@test.com', phone: '+1 234 567 890', location: 'Manila, PH' },
  socialMedia: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
  copyright: '© 2024 Van Ian Ignacio',
};

describe('Layout', () => {
  it('renders children', () => {
    render(<Layout><div>Page Content</div></Layout>);
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('renders navbar links', () => {
    render(<Layout navbarData={navbarData}><div /></Layout>);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
  });

  it('filters out Style Guide link', () => {
    render(<Layout navbarData={navbarData}><div /></Layout>);
    expect(screen.queryByText('Style Guide')).toBeNull();
  });

  it('renders external link with target="_blank"', () => {
    render(<Layout navbarData={navbarData}><div /></Layout>);
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' });
    githubLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders footer contact email', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    expect(screen.getByText('hello@test.com')).toBeInTheDocument();
  });

  it('renders footer contact phone', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    expect(screen.getByText('+1 234 567 890')).toBeInTheDocument();
  });

  it('renders footer contact location', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    expect(screen.getByText('Manila, PH')).toBeInTheDocument();
  });

  it('renders social media links in footer', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://linkedin.com');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com');
    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', 'https://facebook.com');
  });

  it('renders copyright text', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    expect(screen.getByText('© 2024 Van Ian Ignacio')).toBeInTheDocument();
  });

  it('renders logo image when logoUrl is provided', () => {
    render(<Layout logoUrl="/logo.png" navbarData={navbarData}><div /></Layout>);
    const logos = screen.getAllByAltText('Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('opens mobile menu when hamburger button is clicked', async () => {
    const user = userEvent.setup();
    render(<Layout navbarData={navbarData}><div /></Layout>);
    const hamburger = screen.getByRole('button', { name: /open mobile menu/i });
    await user.click(hamburger);
    expect(screen.getByRole('button', { name: /close mobile menu/i })).toBeInTheDocument();
  });

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Layout navbarData={navbarData}><div /></Layout>);
    await user.click(screen.getByRole('button', { name: /open mobile menu/i }));
    await user.click(screen.getByRole('button', { name: /close mobile menu/i }));
    expect(screen.queryByRole('button', { name: /close mobile menu/i })).toBeNull();
  });

  it('renders without navbar when navbarData is not provided', () => {
    render(<Layout><div>Content</div></Layout>);
    expect(screen.queryByRole('button', { name: /open mobile menu/i })).toBeNull();
  });

  it('renders without footer when footerData is not provided', () => {
    render(<Layout><div>Content</div></Layout>);
    expect(screen.queryByRole('contentinfo')).toBeNull();
  });

  it('locks body scroll when mobile menu is opened', async () => {
    const user = userEvent.setup();
    render(<Layout navbarData={navbarData}><div /></Layout>);
    await user.click(screen.getByRole('button', { name: /open mobile menu/i }));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when mobile menu is closed', async () => {
    const user = userEvent.setup();
    render(<Layout navbarData={navbarData}><div /></Layout>);
    await user.click(screen.getByRole('button', { name: /open mobile menu/i }));
    await user.click(screen.getByRole('button', { name: /close mobile menu/i }));
    expect(document.body.style.overflow).toBe('');
  });

  it('footer email is a mailto link', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    const emailLink = screen.getByRole('link', { name: 'hello@test.com' });
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@test.com');
  });

  it('footer phone is a tel link', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    const phoneLink = screen.getByRole('link', { name: '+1 234 567 890' });
    expect(phoneLink).toHaveAttribute('href', 'tel:+1 234 567 890');
  });

  it('social media links open in a new tab with noopener noreferrer', () => {
    render(<Layout footerData={footerData}><div /></Layout>);
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the expand navigation pill button when navbarData is provided', () => {
    render(<Layout navbarData={navbarData}><div /></Layout>);
    expect(screen.getByRole('button', { name: /expand navigation/i })).toBeInTheDocument();
  });
});
