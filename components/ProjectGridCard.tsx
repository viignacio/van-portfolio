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
      <Link href={`/project/${project.slug}`}>
        <div
          className="group relative bg-base-900/50 backdrop-blur-sm border border-base-700 rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)] flex flex-col"
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

          <div className="relative z-10 h-full flex flex-col">
            {/* Image Container - 50% on mobile, 60% on desktop */}
            <div className="relative overflow-hidden bg-base-800 h-1/2 lg:h-[60%] shrink-0">
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

            {/* Content Preview - 50% on mobile, 40% on desktop */}
            <div className="p-5 lg:p-6 flex-1 flex flex-col gap-3 lg:gap-4 overflow-hidden">
              <div className="flex flex-col gap-2 lg:gap-3 min-h-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-accent px-2 py-0.5 bg-accent/10 rounded-full border border-accent/20">
                    {project.role}
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors leading-tight min-h-0 shrink-0">
                  {project.title}
                </h3>
                <p className="text-[14px] text-text-secondary leading-relaxed opacity-90 line-clamp-3 lg:line-clamp-5 overflow-hidden">
                  {project.description}
                </p>
              </div>

              {project.techStack && (
                <div className="flex flex-wrap gap-2 mt-auto pt-2 shrink-0">
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
                      +{project.techStack.length - 3}
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
