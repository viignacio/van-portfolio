import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsPage from '../page';
import { getProjects, getPageBySlug } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

// Mock dependencies
vi.mock('@/lib/sanity/queries', () => ({
  getProjects: vi.fn(),
  getPageBySlug: vi.fn(),
}));

vi.mock('@/lib/sanity/image', () => ({
  urlFor: vi.fn().mockReturnValue({
    width: vi.fn().mockReturnThis(),
    height: vi.fn().mockReturnThis(),
    fit: vi.fn().mockReturnThis(),
    auto: vi.fn().mockReturnThis(),
    url: vi.fn().mockReturnValue('https://example.com/logo.png'),
  }),
}));

vi.mock('@/components/Layout', () => ({
  default: ({ children }: any) => <div data-testid="layout">{children}</div>,
}));

vi.mock('@/components/ProjectsGrid', () => ({
  default: ({ initialProjects }: any) => (
    <div data-testid="projects-grid">
      {initialProjects.map((p: any) => <div key={p._id}>{p.title}</div>)}
    </div>
  ),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn().mockImplementation(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

describe('ProjectsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPageData = {
    navbar: { title: 'Navbar' },
    footer: { title: 'Footer' },
    archiveHeader: {
      title: 'Our',
      highlightedTitle: 'Projects',
      description: 'Test description',
    },
    archiveFooter: 'Footer text',
    emptyStateText: 'No projects',
  };

  it('renders correctly with projects and page data', async () => {
    (getProjects as any).mockResolvedValue([{ _id: '1', title: 'Project 1' }]);
    (getPageBySlug as any).mockResolvedValue(mockPageData);

    const jsx = await ProjectsPage();
    render(jsx);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByText('Our')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByTestId('projects-grid')).toBeInTheDocument();
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  it('calls notFound if pageData is missing', async () => {
    (getProjects as any).mockResolvedValue([]);
    (getPageBySlug as any).mockResolvedValue(null);

    const { notFound } = await import('next/navigation');
    
    await expect(ProjectsPage()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});
