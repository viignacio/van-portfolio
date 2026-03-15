'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import MediaRenderer from '@/components/MediaRenderer';
import {
  ArrowTopRightOnSquareIcon, CodeBracketIcon, EyeIcon,
  ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useMouseGlow } from '@/hooks/useMouseGlow';
import type { ProjectsSection as ProjectsSectionType, Project } from '@/lib/cms/types';

// Extracted sub-component so useMouseGlow is at component level
function ProjectSlide({
  project,
  isDesktop,
  isDescriptionExpanded,
  isTechExpanded,
  onToggleDescription,
  onToggleTech,
}: {
  project: Project;
  isDesktop: boolean;
  isDescriptionExpanded: boolean;
  isTechExpanded: boolean;
  onToggleDescription: () => void;
  onToggleTech: () => void;
}) {
  const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();

  const getFirstSentence = (text: string): string => {
    const match = text.match(/^[^.!?]+[.!?]/);
    return match ? match[0].trim() : text.split('.')[0] + '.';
  };

  return (
    <div
      className="w-full shrink-0 flex flex-col"
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
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 items-stretch pt-4 px-4 pb-8 lg:pt-8 lg:pr-20 lg:pl-20 flex-1 relative z-10">
        <div className="relative">
          {project.image ? (
            <div className="relative overflow-hidden rounded-xl group w-full h-40 lg:aspect-square lg:h-auto">
              <MediaRenderer
                media={{ mediaType: 'image', image: project.image }}
                alt={project.title}
                className="w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="w-full h-40 lg:aspect-square lg:h-auto bg-linear-to-br from-accent/20 to-base-700 rounded-xl flex items-center justify-center">
              <div className="text-center text-text-secondary">
                <div className="text-4xl mb-2">🖼️</div>
                <div className="text-sm">Project Image</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 lg:space-y-6 flex-1 flex flex-col pt-8 lg:pt-0">
          <h3 className="text-3xl font-bold text-text-primary">{project.title}</h3>

          {project.description && (
            <div className="space-y-2">
              <p className="text-lg text-text-secondary leading-relaxed">
                <span className="hidden lg:inline">{project.description}</span>
                <span className="lg:hidden">
                  {isDescriptionExpanded ? project.description : getFirstSentence(project.description)}
                </span>
              </p>
              {!isDescriptionExpanded && (
                <button onClick={onToggleDescription} className="lg:hidden text-accent! hover:text-[#38bdf8]! font-medium text-base transition-all duration-200 active:scale-95 active:opacity-80">
                  Read more about {project.title}
                </button>
              )}
              {isDescriptionExpanded && (
                <button onClick={onToggleDescription} className="lg:hidden text-accent! hover:text-[#38bdf8]! font-medium text-base transition-all duration-200 active:scale-95 active:opacity-80">
                  Read less
                </button>
              )}
            </div>
          )}

          <div className="border-t border-base-700" />

          {project.techStack && project.techStack.length > 0 && (
            <div>
              <button
                onClick={onToggleTech}
                className="lg:pointer-events-none flex items-center justify-between w-full lg:mb-3 transition-all duration-200 active:scale-95 active:opacity-80"
              >
                <h4 className="text-lg font-semibold text-text-primary">Technologies</h4>
                <ChevronDownIcon className={`w-5 h-5 text-text-primary transition-transform duration-300 lg:hidden ${isTechExpanded ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 lg:block ${isTechExpanded ? 'max-h-96' : 'max-h-0 lg:max-h-none'}`}>
                <div className="flex flex-wrap gap-4 pt-4 lg:pt-0">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-ui-card text-sm text-primary font-medium rounded-lg border border-base-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grow" />

          <div className="flex gap-4 pt-4 mt-auto">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-ui-card text-text-primary rounded-xl lg:hover:bg-ui-card/80 lg:hover:border-accent lg:hover:text-accent lg:hover:scale-105 transition-all duration-200 text-base font-semibold border border-base-700 active:scale-95 active:opacity-80">
                <EyeIcon className="w-5 h-5" />
                {project.demoCta || 'Live Demo'}
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-ui-card text-text-primary rounded-xl lg:hover:bg-ui-card/80 lg:hover:border-accent lg:hover:text-accent lg:hover:scale-105 transition-all duration-200 text-base font-semibold border border-base-700 active:scale-95 active:opacity-80">
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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());
  const [expandedTechSections, setExpandedTechSections] = useState<Set<string>>(new Set());
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const minSwipeDistance = 50;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const toggleDescription = (id: string) => setExpandedDescriptions(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

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

  return (
    <section className="py-20">
      <div className="px-4 lg:w-4/5 lg:mx-auto relative z-20 lg:p-8">
        {headline && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-start mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">{headline}</h2>
          </motion.div>
        )}

        {projects && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-16"
          >
            <div
              className="relative overflow-hidden rounded-2xl bg-base-800 border border-base-700"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {projects.map((project) => (
                    <ProjectSlide
                      key={project._id}
                      project={project}
                      isDesktop={isDesktop}
                      isDescriptionExpanded={expandedDescriptions.has(project._id)}
                      isTechExpanded={expandedTechSections.has(project._id)}
                      onToggleDescription={() => toggleDescription(project._id)}
                      onToggleTech={() => toggleTech(project._id)}
                    />
                  ))}
                </div>
              </div>

              {projects.length > 1 && (
                <>
                  <button onClick={prevSlide} className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-base-900/80 lg:hover:bg-base-900 text-text-primary p-2 rounded-full border border-base-700 lg:hover:border-accent transition-all duration-300 z-10 w-12 h-12 items-center justify-center" aria-label="Previous project">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button onClick={nextSlide} className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-base-900/80 lg:hover:bg-base-900 text-text-primary p-2 rounded-full border border-base-700 lg:hover:border-accent transition-all duration-300 z-10 w-12 h-12 items-center justify-center" aria-label="Next project">
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}

              {projects.length > 1 && (
                <div className="flex justify-center mt-4 pb-8">
                  <div className="flex space-x-4">
                    {projects.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 active:scale-125 ${i === currentSlide ? 'bg-accent' : 'bg-white hover:bg-gray-300'}`}
                        aria-label={`Go to project ${i + 1}`}
                      />
                    ))}
                  </div>
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
