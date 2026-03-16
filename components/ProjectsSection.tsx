'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import MediaRenderer from '@/components/MediaRenderer';
import {
  ArrowTopRightOnSquareIcon, CodeBracketIcon, EyeIcon,
  ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useMouseGlow, glowStyle } from '@/hooks/useMouseGlow';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useSwipe } from '@/hooks/useSwipe';
import type { ProjectsSection as ProjectsSectionType, Project } from '@/lib/cms/types';

const swiftEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ctaButtonClass = "flex items-center gap-2 px-4 py-2.5 bg-ui-card text-text-primary rounded-xl hover:bg-ui-card/80 hover:border-accent hover:text-accent hover:scale-105 transition-all duration-200 text-sm font-semibold border border-base-700 active:scale-95 active:opacity-80";

const noop = () => {};

function sideCardProps(xOffset: string) {
  return {
    initial: { opacity: 0, scale: 0.55, x: xOffset },
    animate: { opacity: 0.5, scale: 0.7, x: xOffset },
    exit: { opacity: 0, scale: 0.55, x: xOffset },
    transition: { duration: 0.4, ease: swiftEase },
    className: 'relative cursor-pointer',
    style: { transformOrigin: 'center' as const },
  };
}

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

const desktopCenterVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? '100%' : '-100%',
    scale: 0.7,
    opacity: 0.7,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: swiftEase },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? '-90%' : '90%',
    scale: 0.7,
    opacity: 0,
    transition: { duration: 0.4, ease: swiftEase },
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
  isTechExpanded?: boolean;
  onToggleTech?: () => void;
}) {
  const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();

  return (
    <div
      className="relative bg-base-800 border border-base-700 rounded-2xl overflow-hidden"
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseEnter={isDesktop ? handleMouseEnter : undefined}
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
    >
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={glowStyle(mousePosition.x, mousePosition.y, 0.08)}
        />
      )}

      <div className="flex flex-col relative z-10">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[2/1] bg-base-900 shrink-0">
          {project.image ? (
            <MediaRenderer
              media={{ mediaType: 'image', image: project.image }}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
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
        <div className="flex flex-col gap-4 p-6 min-h-0">
          <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>

          {project.description && (
            <div className="flex flex-col gap-2">
              <p className="text-base text-text-secondary leading-relaxed line-clamp-4">
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

          {project.techStack && project.techStack.length > 0 && onToggleTech && (
            <div>
              <button
                onClick={onToggleTech}
                className="flex items-center justify-between w-full transition-all duration-200 active:scale-95 active:opacity-80"
              >
                <h4 className="text-base font-semibold text-text-primary">Technologies</h4>
                <ChevronDownIcon className={`w-5 h-5 text-text-primary transition-transform duration-300 ${isTechExpanded ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isTechExpanded ? 'max-h-96' : 'max-h-0'}`}>
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-ui-card text-sm text-primary font-medium rounded-lg border border-base-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-auto">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={ctaButtonClass}>
                <EyeIcon className="w-4 h-4" />
                {project.demoCta || 'Live Demo'}
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={ctaButtonClass}>
                <CodeBracketIcon className="w-4 h-4" />
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
  const [expandedTechSections, setExpandedTechSections] = useState<Set<string>>(new Set());
  const isDesktop = useIsDesktop();

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrentSlide((prev) => (prev + dir + projects.length) % projects.length);
    setExpandedTechSections((prev) => (prev.size > 0 ? new Set() : prev));
  };

  const nextSlide = () => navigate(1);
  const prevSlide = () => navigate(-1);

  const toggleTech = useCallback((id: string) => setExpandedTechSections(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  }), []);

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(nextSlide, prevSlide);

  const prevIndex = (currentSlide - 1 + projects.length) % projects.length;
  const nextIndex = (currentSlide + 1) % projects.length;
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
            {/* ── Desktop: 3-card layout ── */}
            <div className="hidden lg:block">
              <div className="flex items-center">

                {/* Left slot — empty spacer when < 3 projects, card otherwise */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {projects.length >= 3 && (
                      <motion.div
                        key={projects[prevIndex]._id}
                        {...sideCardProps('10%')}
                        onClick={prevSlide}
                      >
                        <div className="absolute inset-0 z-20 rounded-2xl" />
                        <ProjectCard
                          project={projects[prevIndex]}
                          isDesktop={false}
                          onToggleTech={noop}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Center slot — active card, z-10 so it slides over side cards */}
                <div className="flex-1 min-w-0 relative z-10">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                      key={projects[currentSlide]._id}
                      custom={direction}
                      variants={desktopCenterVariants}
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

                {/* Right slot — empty spacer when 1 project, card otherwise */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {projects.length >= 2 && (
                      <motion.div
                        key={projects[nextIndex]._id}
                        {...sideCardProps('-10%')}
                        onClick={nextSlide}
                      >
                        <div className="absolute inset-0 z-20 rounded-2xl" />
                        <ProjectCard
                          project={projects[nextIndex]}
                          isDesktop={false}
                          onToggleTech={noop}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Desktop counter */}
              {projects.length > 1 && (
                <div className="flex items-center justify-center mt-8">
                  <span className="font-mono text-sm tracking-widest text-text-muted">{counter}</span>
                </div>
              )}
            </div>

            {/* ── Mobile: single-card carousel ── */}
            <div className="lg:hidden">
              <div
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

              {/* Mobile counter with arrows */}
              {projects.length > 1 && (
                <div className="flex items-center justify-center gap-8 mt-8">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 flex items-center justify-center bg-base-800 border border-base-700 rounded-full text-text-primary active:scale-95 active:opacity-80 transition-all duration-200"
                    aria-label="Previous project"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-sm tracking-widest text-text-muted">
                    {counter}
                  </span>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 flex items-center justify-center bg-base-800 border border-base-700 rounded-full text-text-primary active:scale-95 active:opacity-80 transition-all duration-200"
                    aria-label="Next project"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
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
            <a href={ctaButton.url} className="inline-flex items-center gap-4 px-8 py-4 bg-transparent text-text-primary rounded-xl hover:bg-ui-card/80 transition-all duration-300 text-lg font-semibold border border-base-700 hover:border-accent hover:scale-105 active:scale-95 active:opacity-80">
              {ctaButton.text}
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
