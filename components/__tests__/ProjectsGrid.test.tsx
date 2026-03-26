import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProjectsGrid from '../ProjectsGrid';
import { getProjects } from '@/lib/sanity/queries';

// Mock dependencies
vi.mock('../ProjectGridCard', () => ({
  default: ({ project }: any) => <div data-testid="project-card">{project.title}</div>,
}));

vi.mock('@/lib/sanity/queries', () => ({
  getProjects: vi.fn(),
}));

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
class MockIntersectionObserver {
  static instance: MockIntersectionObserver;
  callback: (entries: any[]) => void;
  constructor(callback: (entries: any[]) => void) {
    this.callback = callback;
    MockIntersectionObserver.instance = this;
  }
  observe = mockObserve;
  unobserve = vi.fn();
  disconnect = mockDisconnect;
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

const mockProjects = [
  { _id: '1', title: 'Project 1', slug: 'p1' },
  { _id: '2', title: 'Project 2', slug: 'p2' },
] as any;

describe('ProjectsGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial projects', () => {
    render(<ProjectsGrid initialProjects={mockProjects} />);
    const cards = screen.getAllByTestId('project-card');
    expect(cards.length).toBe(2);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('renders empty state message when no projects', () => {
    render(<ProjectsGrid initialProjects={[]} emptyText="No projects found" />);
    expect(screen.getByText('No projects found')).toBeInTheDocument();
  });

  it('renders footer text when no more projects to load', () => {
    // case where initialProjects < 10, so hasMore is false
    render(<ProjectsGrid initialProjects={mockProjects} footerText="End of list" />);
    expect(screen.getByText(/End of list/i)).toBeInTheDocument();
  });

  it('distributes projects into two columns correctly (L, R, R, L pattern)', () => {
    const fourProjects = [
        { _id: '1', title: 'P1', slug: 'p1' },
        { _id: '2', title: 'P2', slug: 'p2' },
        { _id: '3', title: 'P3', slug: 'p3' },
        { _id: '4', title: 'P4', slug: 'p4' },
    ] as any;
    const { container } = render(<ProjectsGrid initialProjects={fourProjects} />);
    
    // Columns
    const leftColumn = screen.getByTestId('column-left');
    const rightColumn = screen.getByTestId('column-right');
    
    // Left column: 0, 3
    expect(leftColumn.textContent).toContain('P1');
    expect(leftColumn.textContent).toContain('P4');
    
    // Right column: 1, 2
    expect(rightColumn.textContent).toContain('P2');
    expect(rightColumn.textContent).toContain('P3');
  });

  it('loads more projects when intersecting and hasMore is true', async () => {
    const tenProjects = Array.from({ length: 10 }, (_, i) => ({ _id: `${i}`, title: `Project ${i}`, slug: `p${i}` })) as any;
    const nextBatch = [{ _id: '10', title: 'Project 10', slug: 'p10' }] as any;
    (getProjects as any).mockResolvedValue(nextBatch);

    render(<ProjectsGrid initialProjects={tenProjects} />);
    
    // Simulate intersection
    await waitFor(() => {
      expect(MockIntersectionObserver.instance).toBeDefined();
    });
    
    MockIntersectionObserver.instance.callback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(getProjects).toHaveBeenCalledWith(10, 10);
      expect(screen.getByText('Project 10')).toBeInTheDocument();
    });
  });
});
