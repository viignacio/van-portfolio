'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import MediaRenderer from '@/components/MediaRenderer';
import { useMouseGlow, glowStyle } from '@/hooks/useMouseGlow';
import type { Project } from '@/lib/cms/types';

interface ProjectGridCardProps {
  project: Project;
  index: number;
}

export default function ProjectGridCard({ project, index }: ProjectGridCardProps) {
  const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className=""
    >
      <Link href={`/project/${project.slug.current}`}>
        <div
          className="group relative bg-base-900/50 backdrop-blur-sm border border-base-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovering && (
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={glowStyle(mousePosition.x, mousePosition.y, 0.15)}
            />
          )}

          <div className="relative z-10">
            {/* Image Container - Uniform aspect ratio for all cards */}
            <div className="relative overflow-hidden bg-base-800 aspect-square">
              {project.image ? (
                <MediaRenderer
                  media={{ mediaType: 'image', image: project.image }}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  🖼️
                </div>
              )}
            </div>

            {/* Content Preview */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-accent px-2 py-0.5 bg-accent/10 rounded-full border border-accent/20">
                  {project.role}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                {project.description}
              </p>

              {project.techStack && (
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-base-800 text-text-muted rounded border border-base-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] text-text-muted self-center">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
