import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NotFound from '../not-found';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: {
    href: string; children: React.ReactNode; [key: string]: unknown;
  }) => <a href={href} {...rest}>{children}</a>,
}));

describe('NotFound', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('renders the 404 code', () => {
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the "Page not found" heading', () => {
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });

  it('renders the lost message', () => {
    expect(screen.getByText(/looks like someone got lost/i)).toBeInTheDocument();
  });

  it('renders "Back to Home" link pointing to /', () => {
    const link = screen.getByRole('link', { name: /back to home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
