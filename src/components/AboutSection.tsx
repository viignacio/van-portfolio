'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
import { JavaIcon, CSharpIcon, AzureIcon, PlaywrightIcon, PythonIcon, TypeScriptIcon, CypressIcon, RobotFrameworkIcon, LighthouseIcon, WaveIcon, AxeDevToolsIcon, CommerceToolsIcon, AwsIcon, GitHubIcon } from './icons/technologies';

// Map technology values to their proper display names
const getTechnologyDisplayName = (value: string): string => {
  const displayNames: Record<string, string> = {
    'react': 'React',
    'vue': 'Vue.js',
    'angular': 'Angular',
    'nextjs': 'Next.js',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
    'html5': 'HTML5',
    'css3': 'CSS3',
    'tailwind': 'Tailwind CSS',
    'sass': 'Sass/SCSS',
    'nodejs': 'Node.js',
    'python': 'Python',
    'java': 'Java',
    'csharp': 'C#',
    'php': 'PHP',
    'express': 'Express.js',
    'django': 'Django',
    'spring': 'Spring',
    'dotnet': '.NET',
    'laravel': 'Laravel',
    'mongodb': 'MongoDB',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'redis': 'Redis',
    'firebase': 'Firebase',
    'snowflake': 'Snowflake',
    'sql': 'SQL',
    'docker': 'Docker',
    'git': 'Git',
    'github': 'GitHub',
    'aws': 'AWS',
    'azure': 'Azure',
    'jenkins': 'Jenkins',
    'kubernetes': 'Kubernetes',
    'vercel': 'Vercel',
    'commercetools': 'commercetools',
    'shopify': 'Shopify',
    'sanity': 'Sanity',
    'googletagmanager': 'Google Tag Manager',
    'figma': 'Figma',
    'webflow': 'WebFlow',
    'jest': 'Jest',
    'cypress': 'Cypress',
    'selenium': 'Selenium',
    'playwright': 'Playwright',
    'robotframework': 'RobotFramework',
    'cucumber': 'Cucumber',
    'jmeter': 'JMeter',
    'lighthouse': 'Google Lighthouse',
    'wave': 'WAVE',
    'axedevtools': 'Axe DevTools',
    'graphql': 'GraphQL',
    'rest': 'REST API',
    'webpack': 'Webpack',
    'vite': 'Vite',
    'npm': 'NPM',
    'yarn': 'Yarn',
  };
  
  return displayNames[value.toLowerCase()] || value;
};

// Icon mapping for technologies using available React Icons and fallbacks
const getTechnologyIcon = (techName: string) => {
  const name = techName.toLowerCase();
  
  // Frontend - Using React Icons with official brand colors
  if (name.includes('react')) return <SiReact className="w-8 h-8 text-[#61DAFB]" />;
  if (name.includes('vue')) return <SiVuedotjs className="w-8 h-8 text-[#4FC08D]" />;
  if (name.includes('angular')) return <SiAngular className="w-8 h-8 text-[#DD0031]" />;
  if (name.includes('nextjs') || name.includes('next.js')) return <SiNextdotjs className="w-8 h-8 text-[#000000]" />;
  if (name.includes('typescript')) return <TypeScriptIcon className="w-8 h-8" />;
  if (name.includes('javascript')) return <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />;
  if (name.includes('html')) return <SiHtml5 className="w-8 h-8 text-[#E34F26]" />;
  if (name.includes('css')) return <SiCss className="w-8 h-8 text-[#1572B6]" />;
  if (name.includes('tailwind')) return <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" />;
  if (name.includes('sass') || name.includes('scss')) return <SiSass className="w-8 h-8 text-[#CC6699]" />;
  
  // Backend - Using React Icons with official brand colors
  if (name.includes('nodejs') || name.includes('node.js')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiNodedotjs className="w-8 h-8 text-[#339933]" /></div>;
  if (name.includes('python')) return <PythonIcon className="w-8 h-8" />;
  if (name.includes('java')) return <JavaIcon className="w-8 h-8" />;
  if (name.includes('c#') || name.includes('csharp')) return <CSharpIcon className="w-8 h-8" />;
  if (name.includes('php')) return <SiPhp className="w-8 h-8 text-[#777BB4]" />;
  if (name.includes('express')) return <SiExpress className="w-8 h-8 text-[#000000]" />;
  if (name.includes('django')) return <SiDjango className="w-8 h-8 text-[#092E20]" />;
  if (name.includes('spring')) return <SiSpring className="w-8 h-8 text-[#6DB33F]" />;
  if (name.includes('.net') || name.includes('dotnet')) return <SiDotnet className="w-8 h-8 text-[#512BD4]" />;
  if (name.includes('laravel')) return <SiLaravel className="w-8 h-8 text-[#FF2D20]" />;
  
  // Database - Using React Icons with official brand colors
  if (name.includes('mongodb')) return <SiMongodb className="w-8 h-8 text-[#47A248]" />;
  if (name.includes('postgresql') || name.includes('postgres')) return <SiPostgresql className="w-8 h-8 text-[#336791]" />;
  if (name.includes('mysql')) return <SiMysql className="w-8 h-8 text-[#4479A1]" />;
  if (name.includes('redis')) return <SiRedis className="w-8 h-8 text-[#DC382D]" />;
  if (name.includes('firebase')) return <SiFirebase className="w-8 h-8 text-[#FFCA28]" />;
  if (name.includes('snowflake')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiSnowflake className="w-8 h-8 text-[#29B5E8]" /></div>;
  if (name.includes('sql')) return <SiMysql className="w-8 h-8 text-[#4479A1]" />;
  
  // DevOps & Tools - Using React Icons with official brand colors
  if (name.includes('docker')) return <SiDocker className="w-8 h-8 text-[#2496ED]" />;
  if (name.includes('github')) return <GitHubIcon className="w-8 h-8" />;
  if (name.includes('git')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiGit className="w-8 h-8 text-[#F05032]" /></div>;
  if (name.includes('aws')) return <AwsIcon className="w-8 h-8" />;
  if (name.includes('azure')) return <AzureIcon className="w-8 h-8" />;
  if (name.includes('jenkins')) return <SiJenkins className="w-8 h-8 text-[#D24939]" />;
  if (name.includes('kubernetes')) return <SiKubernetes className="w-8 h-8 text-[#326CE5]" />;
  if (name.includes('vercel')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiVercel className="w-8 h-8 text-white" /></div>;
  
  // Testing - Using React Icons with official brand colors
  if (name.includes('jest')) return <SiJest className="w-8 h-8 text-[#C21325]" />;
  if (name.includes('cypress')) return <CypressIcon className="w-8 h-8" />;
  if (name.includes('selenium')) return <SiSelenium className="w-8 h-8 text-[#43B02A]" />;
  if (name.includes('playwright')) return <PlaywrightIcon className="w-8 h-8" />;
  if (name.includes('robotframework')) return <RobotFrameworkIcon className="w-8 h-8" />;
  if (name.includes('cucumber')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiCucumber className="w-8 h-8 text-[#23D96C]" /></div>;
  if (name.includes('jmeter')) return <SiApachejmeter className="w-8 h-8 text-[#D22128]" />;
  if (name.includes('lighthouse') || name.includes('google lighthouse')) return <LighthouseIcon className="w-8 h-8" />;
  if (name.includes('wave')) return <WaveIcon className="w-8 h-8" />;
  if (name.includes('axedevtools') || name.includes('axe devtools') || name.includes('axe')) return <AxeDevToolsIcon className="w-8 h-8" />;
  
  // Other - Using React Icons with official brand colors
  if (name.includes('graphql')) return <SiGraphql className="w-8 h-8 text-[#E10098]" />;
  if (name.includes('webpack')) return <SiWebpack className="w-8 h-8 text-[#8DD6F9]" />;
  if (name.includes('vite')) return <SiVite className="w-8 h-8 text-[#646CFF]" />;
  if (name.includes('npm')) return <SiNpm className="w-8 h-8 text-[#CB3837]" />;
  if (name.includes('yarn')) return <SiYarn className="w-8 h-8 text-[#2C8EBB]" />;
  
  // Additional tools - Using React Icons with official brand colors
  if (name.includes('jira')) return <SiJira className="w-8 h-8 text-[#0052CC]" />;
  if (name.includes('confluence')) return <SiConfluence className="w-8 h-8 text-[#172B4D]" />;
  if (name.includes('slack')) return <SiSlack className="w-8 h-8 text-[#4A154B]" />;
  if (name.includes('figma')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiFigma className="w-8 h-8 text-[#F24E1E]" /></div>;
  if (name.includes('adobe') || name.includes('xd')) return <SiFigma className="w-8 h-8 text-[#FF61F6]" />;
  if (name.includes('postman')) return <SiPostman className="w-8 h-8 text-[#FF6C37]" />;
  if (name.includes('insomnia')) return <SiInsomnia className="w-8 h-8 text-[#4000BF]" />;
  if (name.includes('vscode') || name.includes('visual studio code')) return <SiVsco className="w-8 h-8 text-[#007ACC]" />;
  if (name.includes('intellij') || name.includes('idea')) return <SiIntellijidea className="w-8 h-8 text-[#000000]" />;
  if (name.includes('commercetools')) return <CommerceToolsIcon className="w-8 h-8" />;
  if (name.includes('shopify')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiShopify className="w-8 h-8 text-[#96BF48]" /></div>;
  if (name.includes('sanity')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiSanity className="w-8 h-8 text-[#F03E2F]" /></div>;
  if (name.includes('googletagmanager') || name.includes('google tag manager') || name.includes('gtm')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiGoogletagmanager className="w-8 h-8 text-[#4285F4]" /></div>;
  if (name.includes('webflow')) return <div className="flex items-center justify-center" style={{transform: 'scale(0.875)'}}><SiWebflow className="w-8 h-8 text-[#4353FF]" /></div>;
  
  // Fallback for technologies not in React Icons - will be replaced with official SVGs
  return <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />;
};

// Custom hook for mouse tracking glow effect
const useMouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);
  
  return {
    mousePosition,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  };
};

interface CareerEntry {
  _id: string;
  _type: 'careerEntry';
  company: string;
  position: string;
  startDate: {
    month: string;
    year: number;
  };
  endDate?: {
    month: string;
    year: number;
  };
  isCurrent: boolean;
}

interface AboutSectionProps {
  data?: {
    title?: string;
    professionalSummary?: string;
    careerTimeline?: CareerEntry[];
    technologyStack?: {
      _id: string;
      _type: 'technologyStack';
      title: string;
      technologies: Array<{
        _key: string;
        name: string;
        category?: string;
        proficiency?: string;
      }>;
    };
  };
}

export default function AboutSection({ data }: AboutSectionProps) {
  if (!data) return null;

  const { title, professionalSummary, careerTimeline, technologyStack } = data;
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect if we're on desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Helper function to format date
  const formatDate = (date: { month: string; year: number }) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = parseInt(date.month) - 1;
    return `${monthNames[monthIndex]} ${date.year}`;
  };

  // Helper function to get duration
  const getDuration = (start: { month: string; year: number }, end?: { month: string; year: number }) => {
    const startDate = new Date(start.year, parseInt(start.month) - 1);
    const endDate = end ? new Date(end.year, parseInt(end.month) - 1) : new Date();
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    
    if (diffYears === 0) return '< 1 year';
    if (diffYears === 1) return '1 year';
    return `${diffYears} years`;
  };

  return (
    <section id="about-section-debug" className="py-20">
      <div className="px-4 lg:w-4/5 lg:mx-auto relative z-20 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Container: About Me & Tech Stack (Stacked) */}
          <div className="space-y-12">
            {/* Upper Container: About Me & Professional Summary */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Section Header */}
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

            {/* Lower Container: Technology Stack */}
            {technologyStack && technologyStack.technologies && technologyStack.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-text-primary mb-6">
                  {technologyStack.title || 'Technology Stack'}
                </h3>
                
                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-3">
                  {technologyStack.technologies.map((tech, index) => (
                    <motion.div
                      key={tech._key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group"
                    >
                        {/* Tech Pill Component */}
                        <div className="bg-ui-card text-text-primary px-3 py-2 rounded-full border border-base-700 text-sm font-medium lg:hover:bg-ui-card/80 transition-all duration-300 cursor-pointer lg:group-hover:scale-105 flex items-center gap-2">
                          {/* Technology Icon */}
                          <span className="text-accent">
                            {getTechnologyIcon(tech.name)}
                          </span>
                          
                          {/* Technology Name */}
                          <span>
                            {getTechnologyDisplayName(tech.name)}
                          </span>
                        </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Container: Career History */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {careerTimeline && careerTimeline.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold text-text-primary mb-8">
                  Career History
                </h3>

                {/* Vertical Timeline */}
                <div className="relative">
                  {/* Continuous Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-accent/50 to-transparent"></div>
                  
                  <div className="space-y-6">
                    {careerTimeline.map((entry, index) => {
                      const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();
                      
                      return (
                        <motion.div
                          key={entry._id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="relative"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-3.5 top-6 w-6 h-6 bg-accent rounded-full border-4 border-base-900 shadow-lg"></div>
                          
                          {/* Content Card with Glow Effect */}
                          <div 
                            className="card ml-16 lg:hover:shadow-soft transition-all duration-300 group relative overflow-visible"
                            onMouseMove={isDesktop ? handleMouseMove : undefined}
                            onMouseEnter={isDesktop ? handleMouseEnter : undefined}
                            onMouseLeave={isDesktop ? handleMouseLeave : undefined}
                          >
                            {/* Glow Effect Overlay - Desktop only */}
                            {isHovering && (
                              <div
                                className="absolute inset-0 pointer-events-none transition-opacity duration-300 hidden lg:block"
                                style={{
                                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
                                  opacity: isHovering ? 1 : 0
                                }}
                              />
                            )}
                            
                            {/* Current Position Badge */}
                            {entry.isCurrent && (
                              <div className="absolute -top-2 -right-2 bg-accent text-accent-fg px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg z-10 whitespace-nowrap">
                                Current
                              </div>
                            )}
                            
                            {/* Company & Position */}
                            <div className="mb-4 relative z-10">
                              <h4 className="text-xl font-bold text-text-primary mb-2 lg:group-hover:text-accent transition-colors">
                                {entry.position}
                              </h4>
                              <div className="flex items-center gap-2 text-text-secondary">
                                <BuildingOfficeIcon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
                                <span className="font-medium">{entry.company}</span>
                              </div>
                            </div>
                            
                            {/* Dates & Duration */}
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
                    })}
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
