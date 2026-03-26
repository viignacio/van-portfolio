import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectGridCard from '../ProjectGridCard';

// Mock dependencies
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  },
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

vi.mock('@/components/MediaRenderer', () => ({
  default: ({ alt }: any) => <img data-testid="project-image" alt={alt} />,
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

const mockProject = {
  title: 'Test Project',
  slug: 'test-project',
  description: 'A test project description.',
  role: 'Developer',
  techStack: ['React', 'TypeScript', 'Tailwind', 'Vitest'],
  image: { asset: { _ref: 'image-1' } },
} as any;

describe('ProjectGridCard', () => {
  it('renders project title and description', () => {
    render(<ProjectGridCard project={mockProject} index={0} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description.')).toBeInTheDocument();
  });

  it('renders project role', () => {
    render(<ProjectGridCard project={mockProject} index={0} />);
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('renders project image when provided', () => {
    render(<ProjectGridCard project={mockProject} index={0} />);
    expect(screen.getByTestId('project-image')).toBeInTheDocument();
    expect(screen.getByAltText('Test Project')).toBeInTheDocument();
  });

  it('renders placeholder when image is missing', () => {
    const projectNoImage = { ...mockProject, image: undefined };
    render(<ProjectGridCard project={projectNoImage} index={0} />);
    expect(screen.getByText('🖼️')).toBeInTheDocument();
  });

  it('renders first 3 tech stack items and a counter for the rest', () => {
    render(<ProjectGridCard project={mockProject} index={0} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
    expect(screen.queryByText('Vitest')).toBeNull();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('links to the correct project page', () => {
    render(<ProjectGridCard project={mockProject} index={0} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/project/test-project');
  });
});
