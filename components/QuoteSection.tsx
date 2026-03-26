'use client';

import { motion } from 'motion/react';

interface QuoteSectionProps {
  data: {
    text: string;
    author?: string;
    role?: string;
    variant?: 'centered' | 'left';
  };
}

export default function QuoteSection({ data }: QuoteSectionProps) {
  if (!data?.text) return null;

  const { text, author, role, variant = 'centered' } = data;
  const isCentered = variant === 'centered';

  return (
    <section className={`w-full py-12 px-4 ${isCentered ? 'text-center' : 'text-left'}`}>
      <div className={`max-w-4xl mx-auto ${isCentered ? '' : 'border-l-4 border-accent pl-8'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Subtle Decorative Quote Mark */}
          <span className={`absolute -top-12 ${isCentered ? 'left-1/2 -translate-x-1/2' : 'left-0'} text-accent/40 text-9xl font-serif select-none pointer-events-none`}>
            &ldquo;
          </span>

          <p className={`${isCentered ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'} font-bold text-text-primary leading-tight mb-8 relative z-10 italic`}>
            {text}
          </p>

          {(author || role) && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col gap-1"
            >
              {author && <span className="text-xl font-bold text-accent">{author}</span>}
              {role && <span className="text-sm text-text-muted uppercase tracking-widest">{role}</span>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
