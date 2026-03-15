'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import {
  SiReact, SiVuedotjs, SiAngular, SiNextdotjs, SiTypescript, SiJavascript,
  SiHtml5, SiCss, SiTailwindcss, SiSass, SiNodedotjs, SiPython, SiPhp,
  SiExpress, SiDjango, SiSpring, SiDotnet, SiLaravel, SiMongodb, SiPostgresql,
  SiMysql, SiRedis, SiFirebase, SiDocker, SiGit,
  SiJenkins, SiKubernetes, SiJest, SiCypress, SiSelenium, SiRobotframework,
  SiCucumber, SiGraphql, SiWebpack, SiVite, SiNpm, SiYarn, SiJira, SiConfluence,
  SiSlack, SiFigma, SiPostman, SiInsomnia, SiVsco, SiIntellijidea,
  SiSanity, SiVercel, SiShopify, SiSnowflake, SiGoogletagmanager, SiApachejmeter, SiWebflow
} from 'react-icons/si';
import {
  JavaIcon, CSharpIcon, AzureIcon, PlaywrightIcon, PythonIcon, TypeScriptIcon,
  CypressIcon, RobotFrameworkIcon, LighthouseIcon, WaveIcon, AxeDevToolsIcon,
  CommerceToolsIcon, AwsIcon, GitHubIcon
} from '@/components/icons/technologies';
import { useMouseGlow } from '@/hooks/useMouseGlow';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import type { CareerEntry as CareerEntryType } from '@/lib/cms/types';

const displayNames: Record<string, string> = {
  react: 'React', vue: 'Vue.js', angular: 'Angular', nextjs: 'Next.js',
  typescript: 'TypeScript', javascript: 'JavaScript', html5: 'HTML5', css3: 'CSS3',
  tailwind: 'Tailwind CSS', sass: 'Sass/SCSS', nodejs: 'Node.js', python: 'Python',
  java: 'Java', csharp: 'C#', php: 'PHP', express: 'Express.js', django: 'Django',
  spring: 'Spring', dotnet: '.NET', laravel: 'Laravel', mongodb: 'MongoDB',
  postgresql: 'PostgreSQL', mysql: 'MySQL', redis: 'Redis', firebase: 'Firebase',
  snowflake: 'Snowflake', sql: 'SQL', docker: 'Docker', git: 'Git', github: 'GitHub',
  aws: 'AWS', azure: 'Azure', jenkins: 'Jenkins', kubernetes: 'Kubernetes',
  vercel: 'Vercel', commercetools: 'commercetools', shopify: 'Shopify', sanity: 'Sanity',
  googletagmanager: 'Google Tag Manager', figma: 'Figma', webflow: 'WebFlow',
  jest: 'Jest', cypress: 'Cypress', selenium: 'Selenium', playwright: 'Playwright',
  robotframework: 'RobotFramework', cucumber: 'Cucumber', jmeter: 'JMeter',
  lighthouse: 'Google Lighthouse', wave: 'WAVE', axedevtools: 'Axe DevTools',
  graphql: 'GraphQL', rest: 'REST API', webpack: 'Webpack', vite: 'Vite',
  npm: 'NPM', yarn: 'Yarn',
};

function getTechnologyDisplayName(value: string): string {
  return displayNames[value.toLowerCase()] || value;
}

function getTechnologyIcon(techName: string) {
  const n = techName.toLowerCase();
  if (n.includes('react')) return <SiReact className="w-8 h-8 text-[#61DAFB]" />;
  if (n.includes('vue')) return <SiVuedotjs className="w-8 h-8 text-[#4FC08D]" />;
  if (n.includes('angular')) return <SiAngular className="w-8 h-8 text-[#DD0031]" />;
  if (n.includes('nextjs') || n.includes('next.js')) return <SiNextdotjs className="w-8 h-8 text-[#000000]" />;
  if (n.includes('typescript')) return <TypeScriptIcon className="w-8 h-8" />;
  if (n.includes('javascript')) return <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />;
  if (n.includes('html')) return <SiHtml5 className="w-8 h-8 text-[#E34F26]" />;
  if (n.includes('css')) return <SiCss className="w-8 h-8 text-[#1572B6]" />;
  if (n.includes('tailwind')) return <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" />;
  if (n.includes('sass') || n.includes('scss')) return <SiSass className="w-8 h-8 text-[#CC6699]" />;
  if (n.includes('nodejs') || n.includes('node.js')) return <SiNodedotjs className="w-8 h-8 text-[#339933]" />;
  if (n.includes('python')) return <PythonIcon className="w-8 h-8" />;
  if (n.includes('java')) return <JavaIcon className="w-8 h-8" />;
  if (n.includes('c#') || n.includes('csharp')) return <CSharpIcon className="w-8 h-8" />;
  if (n.includes('php')) return <SiPhp className="w-8 h-8 text-[#777BB4]" />;
  if (n.includes('express')) return <SiExpress className="w-8 h-8 text-[#000000]" />;
  if (n.includes('django')) return <SiDjango className="w-8 h-8 text-[#092E20]" />;
  if (n.includes('spring')) return <SiSpring className="w-8 h-8 text-[#6DB33F]" />;
  if (n.includes('.net') || n.includes('dotnet')) return <SiDotnet className="w-8 h-8 text-[#512BD4]" />;
  if (n.includes('laravel')) return <SiLaravel className="w-8 h-8 text-[#FF2D20]" />;
  if (n.includes('mongodb')) return <SiMongodb className="w-8 h-8 text-[#47A248]" />;
  if (n.includes('postgresql') || n.includes('postgres')) return <SiPostgresql className="w-8 h-8 text-[#336791]" />;
  if (n.includes('mysql')) return <SiMysql className="w-8 h-8 text-[#4479A1]" />;
  if (n.includes('redis')) return <SiRedis className="w-8 h-8 text-[#DC382D]" />;
  if (n.includes('firebase')) return <SiFirebase className="w-8 h-8 text-[#FFCA28]" />;
  if (n.includes('snowflake')) return <SiSnowflake className="w-8 h-8 text-[#29B5E8]" />;
  if (n.includes('sql')) return <SiMysql className="w-8 h-8 text-[#4479A1]" />;
  if (n.includes('docker')) return <SiDocker className="w-8 h-8 text-[#2496ED]" />;
  if (n.includes('github')) return <GitHubIcon className="w-8 h-8" />;
  if (n.includes('git')) return <SiGit className="w-8 h-8 text-[#F05032]" />;
  if (n.includes('aws')) return <AwsIcon className="w-8 h-8" />;
  if (n.includes('azure')) return <AzureIcon className="w-8 h-8" />;
  if (n.includes('jenkins')) return <SiJenkins className="w-8 h-8 text-[#D24939]" />;
  if (n.includes('kubernetes')) return <SiKubernetes className="w-8 h-8 text-[#326CE5]" />;
  if (n.includes('vercel')) return <SiVercel className="w-8 h-8 text-white" />;
  if (n.includes('jest')) return <SiJest className="w-8 h-8 text-[#C21325]" />;
  if (n.includes('cypress')) return <CypressIcon className="w-8 h-8" />;
  if (n.includes('selenium')) return <SiSelenium className="w-8 h-8 text-[#43B02A]" />;
  if (n.includes('playwright')) return <PlaywrightIcon className="w-8 h-8" />;
  if (n.includes('robotframework')) return <RobotFrameworkIcon className="w-8 h-8" />;
  if (n.includes('cucumber')) return <SiCucumber className="w-8 h-8 text-[#23D96C]" />;
  if (n.includes('jmeter')) return <SiApachejmeter className="w-8 h-8 text-[#D22128]" />;
  if (n.includes('lighthouse') || n.includes('google lighthouse')) return <LighthouseIcon className="w-8 h-8" />;
  if (n.includes('wave')) return <WaveIcon className="w-8 h-8" />;
  if (n.includes('axedevtools') || n.includes('axe devtools') || n.includes('axe')) return <AxeDevToolsIcon className="w-8 h-8" />;
  if (n.includes('graphql')) return <SiGraphql className="w-8 h-8 text-[#E10098]" />;
  if (n.includes('webpack')) return <SiWebpack className="w-8 h-8 text-[#8DD6F9]" />;
  if (n.includes('vite')) return <SiVite className="w-8 h-8 text-[#646CFF]" />;
  if (n.includes('npm')) return <SiNpm className="w-8 h-8 text-[#CB3837]" />;
  if (n.includes('yarn')) return <SiYarn className="w-8 h-8 text-[#2C8EBB]" />;
  if (n.includes('jira')) return <SiJira className="w-8 h-8 text-[#0052CC]" />;
  if (n.includes('confluence')) return <SiConfluence className="w-8 h-8 text-[#172B4D]" />;
  if (n.includes('slack')) return <SiSlack className="w-8 h-8 text-[#4A154B]" />;
  if (n.includes('figma')) return <SiFigma className="w-8 h-8 text-[#F24E1E]" />;
  if (n.includes('postman')) return <SiPostman className="w-8 h-8 text-[#FF6C37]" />;
  if (n.includes('insomnia')) return <SiInsomnia className="w-8 h-8 text-[#4000BF]" />;
  if (n.includes('vscode') || n.includes('visual studio code')) return <SiVsco className="w-8 h-8 text-[#007ACC]" />;
  if (n.includes('intellij') || n.includes('idea')) return <SiIntellijidea className="w-8 h-8 text-[#000000]" />;
  if (n.includes('commercetools')) return <CommerceToolsIcon className="w-8 h-8" />;
  if (n.includes('shopify')) return <SiShopify className="w-8 h-8 text-[#96BF48]" />;
  if (n.includes('sanity')) return <SiSanity className="w-8 h-8 text-[#F03E2F]" />;
  if (n.includes('googletagmanager') || n.includes('google tag manager') || n.includes('gtm')) return <SiGoogletagmanager className="w-8 h-8 text-[#4285F4]" />;
  if (n.includes('webflow')) return <SiWebflow className="w-8 h-8 text-[#4353FF]" />;
  return <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />;
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
                <div className="flex flex-wrap gap-4">
                  {technologyStack.technologies.map((tech, i) => (
                    <motion.div
                      key={tech._key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="group"
                    >
                      <div className="bg-ui-card text-text-primary px-4 py-2 rounded-full border border-base-700 text-sm font-medium lg:hover:bg-ui-card/80 transition-all duration-300 cursor-pointer lg:group-hover:scale-105 flex items-center gap-2">
                        <span className="text-accent">{getTechnologyIcon(tech.name)}</span>
                        <span>{getTechnologyDisplayName(tech.name)}</span>
                      </div>
                    </motion.div>
                  ))}
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
