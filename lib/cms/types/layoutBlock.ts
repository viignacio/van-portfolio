import { AboutSection } from './aboutSection';
import { ProjectsSection } from './projectsSection';
import { CertificationsSection } from './certificationsSection';

export interface HeroSection {
  fullName: string;
  professionalTitle: string;
  tagline?: string;
  profileImage?: {
    asset: { url: string };
  };
  cta1?: { text: string; url: string; isExternal: boolean };
  cta2?: { text: string; url: string; isExternal: boolean; email?: string };
}

export interface LayoutBlock {
  _id: string;
  blockType: 'hero' | 'about' | 'skills' | 'projects' | 'certifications' | 'commendations' | 'contact';
  isActive: boolean;
  heroSection?: HeroSection;
  aboutSection?: AboutSection;
  projectsSection?: ProjectsSection;
  certificationsSection?: CertificationsSection;
}

export interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  isHomePage: boolean;
  layoutBlocks: LayoutBlock[];
}
