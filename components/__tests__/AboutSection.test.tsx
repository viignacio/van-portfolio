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

  it('defaults title to "About Me" when title is not provided', () => {
    render(<AboutSection data={{}} />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders proficiency indicator for expert technologies', () => {
    const { container } = render(<AboutSection data={{ technologyStack: {
      _id: 'ts', title: 'Stack',
      technologies: [{ _key: 'k1', name: 'TypeScript', category: 'frontend', proficiency: 'expert' }],
    }}} />);
    expect(container.querySelector('.text-yellow-400')).toBeInTheDocument();
  });

  it('renders proficiency indicator for advanced technologies', () => {
    const { container } = render(<AboutSection data={{ technologyStack: {
      _id: 'ts', title: 'Stack',
      technologies: [{ _key: 'k1', name: 'Python', category: 'backend', proficiency: 'advanced' }],
    }}} />);
    expect(container.querySelector('.text-red-500')).toBeInTheDocument();
  });

  it('renders proficiency indicator for intermediate technologies', () => {
    const { container } = render(<AboutSection data={{ technologyStack: {
      _id: 'ts', title: 'Stack',
      technologies: [{ _key: 'k1', name: 'Java', category: 'backend', proficiency: 'intermediate' }],
    }}} />);
    expect(container.querySelector('.text-orange-400')).toBeInTheDocument();
  });

  it('renders proficiency indicator for beginner technologies', () => {
    const { container } = render(<AboutSection data={{ technologyStack: {
      _id: 'ts', title: 'Stack',
      technologies: [{ _key: 'k1', name: 'Rust', category: 'other', proficiency: 'beginner' }],
    }}} />);
    expect(container.querySelector('.text-yellow-300')).toBeInTheDocument();
  });

  it('groups technology with no category under "Other"', () => {
    render(<AboutSection data={{ technologyStack: {
      _id: 'ts', title: 'Stack',
      technologies: [{ _key: 'k1', name: 'SomeTool' }],
    }}} />);
    expect(screen.getByText('Other')).toBeInTheDocument();
    expect(screen.getByText('SomeTool')).toBeInTheDocument();
  });

  it('renders duration as "< 1 year" for entries under a year', () => {
    const shortTimeline = [{
      _id: 'entry-short',
      position: 'Junior Dev',
      company: 'Startup',
      startDate: { month: '1', year: 2023 },
      endDate: { month: '6', year: 2023 },
      isCurrent: false,
    }];
    render(<AboutSection data={{ careerTimeline: shortTimeline }} />);
    expect(screen.getByText('< 1 year')).toBeInTheDocument();
  });

  it('renders duration as "1 year" for entries spanning one year', () => {
    const oneYearTimeline = [{
      _id: 'entry-1yr',
      position: 'Dev',
      company: 'Company',
      startDate: { month: '1', year: 2022 },
      endDate: { month: '1', year: 2023 },
      isCurrent: false,
    }];
    render(<AboutSection data={{ careerTimeline: oneYearTimeline }} />);
    expect(screen.getByText('1 year')).toBeInTheDocument();
  });
});
