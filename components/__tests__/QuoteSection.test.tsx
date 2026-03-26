import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuoteSection from '../QuoteSection';

vi.mock('motion/react', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_: object, tag: string) => {
      return function MotionEl({ children, className, ...rest }: {
        children?: React.ReactNode;
        className?: string;
        [key: string]: unknown;
      }) {
        return React.createElement(tag, { className, ...rest }, children);
      };
    },
  });
  return { motion };
});

describe('QuoteSection', () => {
  it('returns null when text is missing', () => {
    const { container } = render(<QuoteSection data={{ text: '' }} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the quote text', () => {
    render(<QuoteSection data={{ text: 'Software is a great combination of artistry and engineering.' }} />);
    expect(screen.getByText(/Software is a great combination/i)).toBeInTheDocument();
  });

  it('renders author and role when provided', () => {
    render(
      <QuoteSection 
        data={{ 
          text: 'The best way to predict the future is to invent it.',
          author: 'Alan Kay',
          role: 'Computer Scientist'
        }} 
      />
    );
    expect(screen.getByText('Alan Kay')).toBeInTheDocument();
    expect(screen.getByText(/Computer Scientist/i)).toBeInTheDocument();
  });

  it('applies centered styles by default', () => {
    const { container } = render(<QuoteSection data={{ text: 'Test Quote' }} />);
    expect(container.firstChild).toHaveClass('text-center');
  });

  it('applies left-aligned styles when variant is left', () => {
    const { container } = render(<QuoteSection data={{ text: 'Test Quote', variant: 'left' }} />);
    expect(container.firstChild).toHaveClass('text-left');
    // Find the max-width container and check for border-l-4
    const content = container.querySelector('.max-w-4xl');
    expect(content).toHaveClass('border-l-4');
  });
});
