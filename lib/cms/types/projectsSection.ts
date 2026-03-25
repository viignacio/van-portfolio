import type { LayoutBlock } from './layoutBlock';

export interface ProjectsSection {
  headline: string;
  projects: Project[];
  ctaButton: { text: string; url: string };
}

export interface Project {
  _id: string;
  _ref?: string;
  _type: 'project';
  title: string;
  role: string;
  slug: { current: string };
  description: string;
  image?: { asset?: { _ref?: string }; hotspot?: unknown; crop?: unknown };
  techStack?: string[];
  challenges?: string[];
  demoUrl?: string;
  demoCta?: string;
  repoUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  layoutBlocks?: LayoutBlock[];
}
