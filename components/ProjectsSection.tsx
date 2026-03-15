'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import MediaRenderer from '@/components/MediaRenderer';
import {
  ArrowTopRightOnSquareIcon, CodeBracketIcon, EyeIcon,
  ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useMouseGlow } from '@/hooks/useMouseGlow';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import type { ProjectsSection as ProjectsSectionType, Project } from '@/lib/cms/types';

const swiftEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: swiftEase },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.25, ease: swiftEase },
  }),
};

function ProjectCard({
  project,
  isDesktop,
  isTechExpanded,
  onToggleTech,
}: {
  project: Project;
  isDesktop: boolean;
  isTechExpanded: boolean;
  onToggleTech: () => void;
}) {
  const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();

  return (
    <div
      className="relative bg-base-800 border border-base-700 rounded-2xl overflow-hidden h-[640px] lg:h-[560px]"
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseEnter={isDesktop ? handleMouseEnter : undefined}
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
    >
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block z-0"
          style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.08), transparent 40%)` }}
        />
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-2 h-full relative z-10">
        {/* Image — flush to card edges, no inner card */}
        <div className="relative overflow-hidden h-56 lg:h-full bg-base-900 shrink-0">
          {project.image ? (
            <MediaRenderer
              media={{ mediaType: 'image', image: project.image }}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-accent/20 to-base-700 flex items-center justify-center">
              <div className="text-center text-text-secondary">
                <div className="text-4xl mb-2">🖼️</div>
                <div className="text-sm">Project Image</div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 p-10 min-h-0">
          <h3 className="text-3xl font-bold text-text-primary">{project.title}</h3>

          {project.description && (
            <div className="flex flex-col gap-2">
              <p className="text-lg text-text-secondary leading-relaxed line-clamp-4">
                {project.description}
              </p>
              {project.description.length > 200 && (
                <Link
                  href="/projects"
                  className="text-accent text-sm font-medium hover:text-accent-hover transition-colors self-start"
                >
                  Read more →
                </Link>
              )}
            </div>
          )}

          <div className="border-t border-base-700" />

          {project.techStack && project.techStack.length > 0 && (
            <div>
              <button
                onClick={onToggleTech}
                className="lg:pointer-events-none flex items-center justify-between w-full lg:mb-4 transition-all duration-200 active:scale-95 active:opacity-80"
              >
                <h4 className="text-lg font-semibold text-text-primary">Technologies</h4>
                <ChevronDownIcon className={`w-5 h-5 text-text-primary transition-transform duration-300 lg:hidden ${isTechExpanded ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 lg:block ${isTechExpanded ? 'max-h-96' : 'max-h-0 lg:max-h-none'}`}>
                <div className="flex flex-wrap gap-2 pt-4 lg:pt-0">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-ui-card text-sm text-primary font-medium rounded-lg border border-base-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-auto">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-4 bg-ui-card text-text-primary rounded-xl lg:hover:bg-ui-card/80 lg:hover:border-accent lg:hover:text-accent lg:hover:scale-105 transition-all duration-200 text-base font-semibold border border-base-700 active:scale-95 active:opacity-80">
                <EyeIcon className="w-5 h-5" />
                {project.demoCta || 'Live Demo'}
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-4 bg-ui-card text-text-primary rounded-xl lg:hover:bg-ui-card/80 lg:hover:border-accent lg:hover:text-accent lg:hover:scale-105 transition-all duration-200 text-base font-semibold border border-base-700 active:scale-95 active:opacity-80">
                <CodeBracketIcon className="w-5 h-5" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectsSectionProps {
  data?: ProjectsSectionType;
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  if (!data) return null;
  const { headline, projects, ctaButton } = data;
  if (!headline && (!projects || projects.length === 0)) return null;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [expandedTechSections, setExpandedTechSections] = useState<Set<string>>(new Set());
  const isDesktop = useIsDesktop();

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const toggleTech = (id: string) => setExpandedTechSections(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    if (touchStartX !== null && touchStartY !== null) {
      const dx = Math.abs(touchStartX - e.targetTouches[0].clientX);
      const dy = Math.abs(touchStartY - e.targetTouches[0].clientY);
      if (dx > dy && dx > 10) e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
  };

  const counter = `${String(currentSlide + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;

  return (
    <section className="py-20">
      <div className="px-4 lg:w-4/5 lg:mx-auto relative z-20 lg:p-8">
        {headline && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">{headline}</h2>
          </motion.div>
        )}

        {projects && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            {/* Carousel row — arrows flank card on desktop */}
            <div className="flex items-center gap-6">
              {projects.length > 1 && (
                <button
                  onClick={prevSlide}
                  className="hidden lg:flex shrink-0 w-12 h-12 items-center justify-center bg-base-800 border border-base-700 rounded-full text-text-primary hover:border-accent hover:text-accent transition-all duration-200"
                  aria-label="Previous project"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
              )}

              <div
                className="flex-1"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <ProjectCard
                      project={projects[currentSlide]}
                      isDesktop={isDesktop}
                      isTechExpanded={expandedTechSections.has(projects[currentSlide]._id)}
                      onToggleTech={() => toggleTech(projects[currentSlide]._id)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {projects.length > 1 && (
                <button
                  onClick={nextSlide}
                  className="hidden lg:flex shrink-0 w-12 h-12 items-center justify-center bg-base-800 border border-base-700 rounded-full text-text-primary hover:border-accent hover:text-accent transition-all duration-200"
                  aria-label="Next project"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Counter — desktop: center only; mobile: flanked by arrows */}
            {projects.length > 1 && (
              <div className="flex items-center justify-center gap-8 mt-8">
                <button
                  onClick={prevSlide}
                  className="lg:hidden w-10 h-10 flex items-center justify-center bg-base-800 border border-base-700 rounded-full text-text-primary active:scale-95 active:opacity-80 transition-all duration-200"
                  aria-label="Previous project"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <span className="font-mono text-sm tracking-widest text-text-muted">
                  {counter}
                </span>
                <button
                  onClick={nextSlide}
                  className="lg:hidden w-10 h-10 flex items-center justify-center bg-base-800 border border-base-700 rounded-full text-text-primary active:scale-95 active:opacity-80 transition-all duration-200"
                  aria-label="Next project"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {ctaButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <a href={ctaButton.url} className="inline-flex items-center gap-4 px-8 py-4 bg-transparent text-text-primary rounded-xl lg:hover:bg-ui-card/80 transition-all duration-300 text-lg font-semibold border border-base-700 lg:hover:border-accent lg:hover:scale-105 active:scale-95 active:opacity-80">
              {ctaButton.text}
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
