import { render, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReadProgressBar from '../ReadProgressBar';

vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_: object, tag: string) => {
      return function MotionEl({ children, className, style, ...rest }: {
        children?: React.ReactNode;
        className?: string;
        style?: any;
        [key: string]: unknown;
      }) {
        return React.createElement(tag, { className, style, ...rest }, children);
      };
    },
  });
  return { 
    motion,
    useScroll: () => ({ scrollYProgress: { get: () => 0.5 } }),
    useSpring: (val: any) => val,
  };
});

describe('ReadProgressBar', () => {
  it('does not render immediately (waits for timeout)', () => {
    const { container } = render(<ReadProgressBar />);
    expect(container.firstChild).toBeNull();
  });

  it('renders after the visibility timer', async () => {
    vi.useFakeTimers();
    const { container } = render(<ReadProgressBar />);
    
    act(() => {
      vi.advanceTimersByTime(600);
    });
    
    // Check if it's visible now
    // We might need to wrap in act() or use a screen query
    const progressBar = container.querySelector('.fixed');
    expect(progressBar).not.toBeNull();
    
    vi.useRealTimers();
  });
});
