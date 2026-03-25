'use client';

import { useState, useEffect, useRef } from 'react';
import ProjectGridCard from './ProjectGridCard';
import type { Project } from '@/lib/cms/types';
import { getProjects } from '@/lib/sanity/queries';

interface ProjectsGridProps {
  initialProjects: Project[];
  footerText?: string;
  emptyText?: string;
}

export default function ProjectsGrid({ initialProjects, footerText, emptyText }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProjects.length >= 10);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMoreProjects = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      const nextBatch = await getProjects(page * 10, 10);
      if (nextBatch.length < 10) {
        setHasMore(false);
      }
      setProjects((prev) => [...prev, ...nextBatch]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProjects();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  // Custom distribution logic for a more dynamic flow (L, R, R, L, ...)
  const leftColumn = projects.filter((_, i) => {
    const mod = i % 4;
    return mod === 0 || mod === 3;
  });
  const rightColumn = projects.filter((_, i) => {
    const mod = i % 4;
    return mod === 1 || mod === 2;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column - Offset from top */}
        <div className="flex-1 flex flex-col gap-12 md:mt-24">
          {leftColumn.map((project, index) => (
            <ProjectGridCard 
              key={project._id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-12">
          {rightColumn.map((project, index) => (
            <ProjectGridCard 
              key={project._id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
        )}
        {!hasMore && projects.length > 0 && (
          <p className="text-text-muted text-sm font-medium tracking-wide">
            {footerText || 'DESIGNED & BUILT WITH PASSION'} • {projects.length} PROJECTS LAUNCHED
          </p>
        )}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 bg-base-900/50 rounded-2xl border border-dashed border-base-700 w-full">
            <p className="text-text-secondary text-lg">{emptyText || 'No projects to show yet. Check back soon!'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
