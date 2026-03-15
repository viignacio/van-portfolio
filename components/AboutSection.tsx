'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarIcon, BuildingOfficeIcon, MinusIcon } from '@heroicons/react/24/outline';
import { StarIcon, ChevronDoubleUpIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useMouseGlow } from '@/hooks/useMouseGlow';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import type { CareerEntry as CareerEntryType } from '@/lib/cms/types';


const categoryLabels: Record<string, string> = {
  frontend: 'Frontend', backend: 'Backend', database: 'Database',
  devops: 'DevOps', testing: 'Testing', tools: 'Tools', other: 'Other',
};

const categoryOrder = ['frontend', 'backend', 'database', 'devops', 'testing', 'tools', 'other'];
const proficiencyOrder = ['expert', 'advanced', 'intermediate', 'beginner'];

function ProficiencyIcon({ proficiency }: { proficiency?: string }) {
  if (proficiency === 'expert') return <StarIcon className="w-3.5 h-3.5 text-yellow-400" />;
  if (proficiency === 'advanced') return <ChevronDoubleUpIcon className="w-3.5 h-3.5 text-red-500" />;
  if (proficiency === 'intermediate') return <ChevronUpIcon className="w-3.5 h-3.5 text-orange-400" />;
  if (proficiency === 'beginner') return (
    <span className="flex flex-col gap-px">
      <MinusIcon className="w-3.5 h-1.5 text-yellow-300" />
      <MinusIcon className="w-3.5 h-1.5 text-yellow-300" />
    </span>
  );
  return null;
}

// Formats the date from { month: string, year: number } shape
function formatDate(date: { month: string; year: number }): string {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[parseInt(date.month) - 1]} ${date.year}`;
}

function getDuration(start: { month: string; year: number }, end?: { month: string; year: number }): string {
  const s = new Date(start.year, parseInt(start.month) - 1);
  const e = end ? new Date(end.year, parseInt(end.month) - 1) : new Date();
  const years = Math.floor(Math.abs(e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24 * 365));
  if (years === 0) return '< 1 year';
  return years === 1 ? '1 year' : `${years} years`;
}

// Extracted sub-component so useMouseGlow is called at component level, not inside a loop
function CareerCard({ entry, index, isDesktop }: { entry: CareerEntryType; index: number; isDesktop: boolean }) {
  const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <div className="absolute left-3.5 top-6 w-6 h-6 bg-accent rounded-full border-4 border-base-900 shadow-lg" />
      <div
        className="card ml-16 lg:hover:shadow-soft transition-all duration-300 group relative overflow-visible"
        onMouseMove={isDesktop ? handleMouseMove : undefined}
        onMouseEnter={isDesktop ? handleMouseEnter : undefined}
        onMouseLeave={isDesktop ? handleMouseLeave : undefined}
      >
        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), transparent 40%)` }}
          />
        )}
        {entry.isCurrent && (
          <div className="absolute -top-2 -right-2 bg-accent text-accent-fg px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10 whitespace-nowrap">
            Current
          </div>
        )}
        <div className="mb-4 relative z-10">
          <h4 className="text-xl font-bold text-text-primary mb-2 lg:group-hover:text-accent transition-colors">
            {entry.position}
          </h4>
          <div className="flex items-center gap-2 text-text-secondary">
            <BuildingOfficeIcon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
            <span className="font-medium">{entry.company}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 text-sm text-text-muted relative z-10">
          <div className="flex items-center gap-2 flex-1">
            <CalendarIcon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 flex-1">
              <span>{formatDate(entry.startDate)}</span>
              <span className="hidden lg:inline"> - </span>
              <span className="lg:mx-1">{entry.endDate ? formatDate(entry.endDate) : 'Present'}</span>
            </div>
          </div>
          <span className="bg-ui-card px-2 py-1 rounded-md text-accent font-medium shrink-0">
            {getDuration(entry.startDate, entry.endDate)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface AboutSectionProps {
  data?: {
    title?: string;
    professionalSummary?: string;
    careerTimeline?: CareerEntryType[];
    technologyStack?: {
      _id: string;
      title: string;
      technologies: Array<{ _key: string; name: string; category?: string; proficiency?: string }>;
    };
  };
}

export default function AboutSection({ data }: AboutSectionProps) {
  if (!data) return null;
  const { title, professionalSummary, careerTimeline, technologyStack } = data;
  const isDesktop = useIsDesktop();

  return (
    <section className="py-20">
      <div className="px-4 lg:w-4/5 lg:mx-auto relative z-20 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                  {title || 'About Me'}
                </h2>
                {professionalSummary && (
                  <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                    {professionalSummary}
                  </p>
                )}
              </div>
            </motion.div>

            {technologyStack?.technologies && technologyStack.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-text-primary">
                  {technologyStack.title || 'Technology Stack'}
                </h3>
                <div className="space-y-6">
                  {categoryOrder
                    .filter(cat => technologyStack.technologies.some(t => t.category === cat))
                    .map(cat => (
                      <div key={cat}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
                          {categoryLabels[cat]}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {technologyStack.technologies
                            .filter(t => t.category === cat)
                            .sort((a, b) => proficiencyOrder.indexOf(a.proficiency ?? '') - proficiencyOrder.indexOf(b.proficiency ?? ''))
                            .map(tech => (
                              <div
                                key={tech._key}
                                className="flex items-center gap-1.5 bg-ui-card text-text-primary px-3 py-1.5 rounded-full border border-base-700 text-sm font-medium"
                              >
                                <ProficiencyIcon proficiency={tech.proficiency} />
                                <span>{tech.name}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  {technologyStack.technologies.some(t => !t.category) && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Other</p>
                      <div className="flex flex-wrap gap-2">
                        {technologyStack.technologies
                          .filter(t => !t.category)
                          .sort((a, b) => proficiencyOrder.indexOf(a.proficiency ?? '') - proficiencyOrder.indexOf(b.proficiency ?? ''))
                          .map(tech => (
                            <div
                              key={tech._key}
                              className="flex items-center gap-1.5 bg-ui-card text-text-primary px-3 py-1.5 rounded-full border border-base-700 text-sm font-medium"
                            >
                              <ProficiencyIcon proficiency={tech.proficiency} />
                              <span>{tech.name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {careerTimeline && careerTimeline.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold text-text-primary">Career History</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-accent/50 to-transparent" />
                  <div className="space-y-6">
                    {careerTimeline.map((entry, i) => (
                      <CareerCard key={entry._id} entry={entry} index={i} isDesktop={isDesktop} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
