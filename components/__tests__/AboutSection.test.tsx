import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutSection from '../AboutSection';

vi.mock('motion/react', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_: object, tag: string) => {
      return function MotionEl({ children, initial, animate, whileInView, viewport, transition, ...rest }: {
        children?: React.ReactNode;
        initial?: unknown; animate?: unknown; whileInView?: unknown;
        viewport?: unknown; transition?: unknown;
        [key: string]: unknown;
      }) {
        return React.createElement(tag, rest, children);
      };
    },
  });
  return { motion };
});

vi.mock('@/hooks/useMouseGlow', () => ({
  useMouseGlow: () => ({
    mousePosition: { x: 0, y: 0 },
    isHovering: false,
    handleMouseMove: vi.fn(),
    handleMouseEnter: vi.fn(),
    handleMouseLeave: vi.fn(),
  }),
  glowStyle: vi.fn().mockReturnValue({}),
}));

vi.mock('@/hooks/useIsDesktop', () => ({
  useIsDesktop: () => false,
}));

const careerTimeline = [
  {
    _id: 'entry-1',
    position: 'QA Engineer',
    company: 'Acme Corp',
    startDate: { month: '3', year: 2020 },
    endDate: { month: '6', year: 2022 },
    isCurrent: false,
  },
  {
    _id: 'entry-2',
    position: 'Senior QA Engineer',
    company: 'Tech Co',
    startDate: { month: '7', year: 2022 },
    isCurrent: true,
  },
];

const technologyStack = {
  _id: 'ts-1',
  title: 'My Tech Stack',
  technologies: [
    { _key: 'k1', name: 'TypeScript', category: 'frontend', proficiency: 'expert' },
    { _key: 'k2', name: 'Python', category: 'backend', proficiency: 'advanced' },
    { _key: 'k3', name: 'Playwright', category: 'testing', proficiency: 'expert' },
  ],
};

describe('AboutSection', () => {
  it('returns null when data is undefined', () => {
    const { container } = render(<AboutSection />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the section title', () => {
    render(<AboutSection data={{ title: 'About Me' }} />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders the professional summary', () => {
    render(<AboutSection data={{ professionalSummary: 'I am a QA Engineer.' }} />);
    expect(screen.getByText('I am a QA Engineer.')).toBeInTheDocument();
  });

  it('renders career entry position and company', () => {
    render(<AboutSection data={{ careerTimeline }} />);
    expect(screen.getByText('QA Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders formatted start date for career entry', () => {
    render(<AboutSection data={{ careerTimeline }} />);
    expect(screen.getByText('March 2020')).toBeInTheDocument();
  });

  it('renders "Present" when endDate is not provided', () => {
    render(<AboutSection data={{ careerTimeline }} />);
    expect(screen.getByText('Present')).toBeInTheDocument();
  });

  it('renders formatted end date when provided', () => {
    render(<AboutSection data={{ careerTimeline }} />);
    expect(screen.getByText('June 2022')).toBeInTheDocument();
  });

  it('shows "Current" badge for current career entry', () => {
    render(<AboutSection data={{ careerTimeline }} />);
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders technology stack title', () => {
    render(<AboutSection data={{ technologyStack }} />);
    expect(screen.getByText('My Tech Stack')).toBeInTheDocument();
  });

  it('renders technology names', () => {
    render(<AboutSection data={{ technologyStack }} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Playwright')).toBeInTheDocument();
  });

  it('renders category labels for technologies', () => {
    render(<AboutSection data={{ technologyStack }} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('renders career duration (2 years from March 2020 to June 2022)', () => {
    render(<AboutSection data={{ careerTimeline }} />);
    expect(screen.getByText('2 years')).toBeInTheDocument();
  });

  it('renders "Career History" heading when timeline has entries', () => {
    render(<AboutSection data={{ careerTimeline }} />);
    expect(screen.getByText('Career History')).toBeInTheDocument();
  });

  it('does not render career section when timeline is empty', () => {
    render(<AboutSection data={{ careerTimeline: [] }} />);
    expect(screen.queryByText('Career History')).toBeNull();
  });
});
