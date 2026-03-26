'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';

interface ProjectNavigationProps {
  nextProject?: {
    slug: string;
    title: string;
  };
}

export default function ProjectNavigation({ nextProject }: ProjectNavigationProps) {
  return (
    <section className="w-full py-20 px-4 border-t border-white/5 bg-base-950/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Back to Projects */}
        <Link href="/projects" className="group flex items-center gap-4 text-text-secondary hover:text-accent transition-colors duration-300">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest opacity-50">Archive</span>
            <span className="text-lg font-bold">Back to Projects</span>
          </div>
        </Link>

        {/* Next Project */}
        {nextProject ? (
          <Link href={`/project/${nextProject.slug}`} className="group flex items-center gap-4 text-right hover:text-accent transition-colors duration-300">
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase tracking-widest opacity-50">Next Up</span>
              <span className="text-lg font-bold">{nextProject.title}</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4 opacity-50 cursor-not-allowed">
            <div className="flex flex-col items-end">
                <span className="text-xs uppercase tracking-widest">End of Feed</span>
                <span className="text-lg font-bold">No More Projects</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Grid size={20} />
              </div>
          </div>
        )}
      </div>
    </section>
  );
}
