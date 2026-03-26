import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TechSelectionSection from '../TechSelectionSection';

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

vi.mock('lucide-react', () => ({
  Terminal: () => <div data-testid="icon-terminal" />,
  Cpu: () => <div data-testid="icon-cpu" />,
  Zap: () => <div data-testid="icon-zap" />,
  Search: () => <div data-testid="icon-search" />,
  Shield: () => <div data-testid="icon-shield" />,
  Settings: () => <div data-testid="icon-settings" />,
  Code: () => <div data-testid="icon-code" />,
}));

describe('TechSelectionSection', () => {
  it('returns null when items are missing', () => {
    const { container } = render(<TechSelectionSection data={{ items: [] }} />);
    expect(container.firstChild).toBeNull();
  });

  const mockData = {
    title: 'Custom Tech Stack Title',
    items: [
      { tool: 'React', reasoning: 'Component-based UI.', icon: 'code' },
      { tool: 'Sanity', reasoning: 'Headless CMS for flexibility.', icon: 'settings' }
    ]
  };

  it('renders the section title', () => {
    render(<TechSelectionSection data={mockData} />);
    expect(screen.getByText('Custom Tech Stack Title')).toBeInTheDocument();
  });

  it('renders all tech items', () => {
    render(<TechSelectionSection data={mockData} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Component-based UI.')).toBeInTheDocument();
    expect(screen.getByText('Sanity')).toBeInTheDocument();
    expect(screen.getByText('Headless CMS for flexibility.')).toBeInTheDocument();
  });

  it('renders the correct icons', () => {
    render(<TechSelectionSection data={mockData} />);
    expect(screen.getByTestId('icon-code')).toBeInTheDocument();
    expect(screen.getByTestId('icon-settings')).toBeInTheDocument();
  });

  it('falls back to default title if not provided', () => {
    render(<TechSelectionSection data={{ items: mockData.items }} />);
    expect(screen.getByText('Tech Stack & Rationale')).toBeInTheDocument();
  });
});
