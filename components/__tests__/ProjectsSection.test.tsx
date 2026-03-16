import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ProjectsSection from '../ProjectsSection';

vi.mock('motion/react', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_: object, tag: string) => {
      return function MotionEl({ children, initial, animate, exit, whileInView, viewport, transition, variants, custom, ...rest }: {
        children?: React.ReactNode;
        initial?: unknown; animate?: unknown; exit?: unknown; whileInView?: unknown;
        viewport?: unknown; transition?: unknown; variants?: unknown; custom?: unknown;
        [key: string]: unknown;
      }) {
        return React.createElement(tag, rest, children);
      };
    },
  });
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: {
    href: string; children: React.ReactNode; [key: string]: unknown;
  }) => <a href={href} {...rest}>{children}</a>,
}));

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

vi.mock('@/hooks/useSwipe', () => ({
  useSwipe: () => ({
    onTouchStart: vi.fn(),
    onTouchMove: vi.fn(),
    onTouchEnd: vi.fn(),
  }),
}));

vi.mock('@/components/MediaRenderer', () => ({
  default: ({ alt }: { alt?: string }) => <img data-testid="project-image" alt={alt} />,
}));

const projects = [
  {
    _id: 'proj-1',
    title: 'Playwright Test Suite',
    description: 'An end-to-end test suite built with Playwright.',
    techStack: ['Playwright', 'TypeScript'],
    demoUrl: 'https://demo.example.com',
    demoCta: 'Live Demo',
    repoUrl: 'https://github.com/example/playwright',
    image: undefined,
  },
  {
    _id: 'proj-2',
    title: 'API Test Framework',
    description: 'A REST API testing framework.',
    techStack: ['Python', 'pytest'],
    demoUrl: '',
    repoUrl: 'https://github.com/example/api-tests',
    image: undefined,
  },
];

describe('ProjectsSection', () => {
  it('returns null when data is undefined', () => {
    const { container } = render(<ProjectsSection />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when headline and projects are both missing', () => {
    const { container } = render(<ProjectsSection data={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the section headline', () => {
    render(<ProjectsSection data={{ headline: 'My Projects', projects }} />);
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  it('renders the current project title', () => {
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    expect(screen.getAllByText('Playwright Test Suite').length).toBeGreaterThan(0);
  });

  it('renders the current project description', () => {
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    expect(screen.getAllByText(/end-to-end test suite built with playwright/i).length).toBeGreaterThan(0);
  });

  it('renders demo link when demoUrl is provided', () => {
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    const demoLinks = screen.getAllByRole('link', { name: /live demo/i });
    expect(demoLinks.length).toBeGreaterThan(0);
    expect(demoLinks[0]).toHaveAttribute('href', 'https://demo.example.com');
  });

  it('renders repo link when repoUrl is provided', () => {
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    const repoLinks = screen.getAllByRole('link', { name: /view code/i });
    expect(repoLinks.length).toBeGreaterThan(0);
    expect(repoLinks[0]).toHaveAttribute('href', 'https://github.com/example/playwright');
  });

  it('renders slide counter', () => {
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    expect(screen.getAllByText('01 / 02').length).toBeGreaterThan(0);
  });

  it('navigates to next project when "Next project" button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    const nextButton = screen.getByRole('button', { name: /next project/i });
    await user.click(nextButton);
    // Counter should update to 02 / 02
    expect(screen.getAllByText('02 / 02').length).toBeGreaterThan(0);
  });

  it('navigates to previous project when "Previous project" button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    // Navigate to second first
    await user.click(screen.getByRole('button', { name: /next project/i }));
    await user.click(screen.getByRole('button', { name: /previous project/i }));
    expect(screen.getAllByText('01 / 02').length).toBeGreaterThan(0);
  });

  it('wraps around to last project when going previous from first', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    await user.click(screen.getByRole('button', { name: /previous project/i }));
    expect(screen.getAllByText('02 / 02').length).toBeGreaterThan(0);
  });

  it('renders CTA button when ctaButton is provided', () => {
    render(<ProjectsSection data={{
      headline: 'Projects',
      projects,
      ctaButton: { text: 'View All Projects', url: '/projects' },
    }} />);
    expect(screen.getByText('View All Projects')).toBeInTheDocument();
  });

  it('CTA button links to the correct URL', () => {
    render(<ProjectsSection data={{
      headline: 'Projects',
      projects,
      ctaButton: { text: 'View All Projects', url: '/projects' },
    }} />);
    const ctaLink = screen.getByRole('link', { name: /view all projects/i });
    expect(ctaLink).toHaveAttribute('href', '/projects');
  });

  it('does not render counter or navigation when only one project', () => {
    render(<ProjectsSection data={{ headline: 'Projects', projects: [projects[0]] }} />);
    expect(screen.queryByRole('button', { name: /next project/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /previous project/i })).toBeNull();
  });

  it('renders tech stack toggle button', () => {
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    expect(screen.getAllByRole('button', { name: /technologies/i }).length).toBeGreaterThan(0);
  });

  it('expands tech stack when toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection data={{ headline: 'Projects', projects }} />);
    const techButton = screen.getAllByRole('button', { name: /technologies/i })[0];
    await user.click(techButton);
    expect(screen.getAllByText('Playwright').length).toBeGreaterThan(0);
  });

  it('renders "Read more" link when description is long', () => {
    const longDesc = 'A'.repeat(201);
    const projectsWithLong = [{ ...projects[0], description: longDesc }];
    render(<ProjectsSection data={{ headline: 'Projects', projects: projectsWithLong }} />);
    expect(screen.getAllByText('Read more →').length).toBeGreaterThan(0);
  });
});
