import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProjects, getProjectBySlug, getPageBySlug } from '../queries';
import { sanityClient } from '../client';

// Mock sanityClient.fetch
vi.mock('../client', () => ({
  sanityClient: {
    fetch: vi.fn(),
  },
}));

// Mock react.cache
vi.mock('react', () => ({
  cache: (fn: any) => fn,
}));

describe('Sanity Queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProjects', () => {
    it('calls fetch with correct query and default parameters', async () => {
      (sanityClient.fetch as any).mockResolvedValue([]);
      
      await getProjects();
      
      expect(sanityClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == "project"]'),
        { start: 0, end: 10 },
        expect.any(Object)
      );
    });

    it('calls fetch with custom parameters', async () => {
      (sanityClient.fetch as any).mockResolvedValue([]);
      
      await getProjects(10, 20);
      
      expect(sanityClient.fetch).toHaveBeenCalledWith(
        expect.any(String),
        { start: 10, end: 30 },
        expect.any(Object)
      );
    });

    it('returns empty array on error', async () => {
      (sanityClient.fetch as any).mockRejectedValue(new Error('Fetch failed'));
      
      const result = await getProjects();
      
      expect(result).toEqual([]);
    });
  });

  describe('getProjectBySlug', () => {
    it('calls fetch with project slug', async () => {
      const mockProject = { title: 'Test Project' };
      (sanityClient.fetch as any).mockResolvedValue({ project: mockProject, nextProject: null });
      
      const result = await getProjectBySlug('test-slug');
      
      expect(sanityClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('slug.current == $slug'),
        { slug: 'test-slug' },
        expect.any(Object)
      );
      expect(result).toEqual({ project: mockProject, nextProject: null });
    });

    it('returns null on error', async () => {
      (sanityClient.fetch as any).mockRejectedValue(new Error('Fetch failed'));
      
      const result = await getProjectBySlug('test-slug');
      
      expect(result).toBeNull();
    });
  });

  describe('getPageBySlug', () => {
    it('calls fetch with page slug', async () => {
      (sanityClient.fetch as any).mockResolvedValue({ title: 'Test Page' });
      
      const result = await getPageBySlug('test-page');
      
      expect(sanityClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == "page" && slug.current == $slug]'),
        { slug: 'test-page' },
        expect.any(Object)
      );
      expect(result).toEqual({ title: 'Test Page' });
    });

    it('returns null on error', async () => {
      (sanityClient.fetch as any).mockRejectedValue(new Error('Fetch failed'));
      
      const result = await getPageBySlug('test-page');
      
      expect(result).toBeNull();
    });
  });
});
