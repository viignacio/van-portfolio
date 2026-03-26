'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { urlFor } from '@/lib/sanity/image';
import { motion } from 'motion/react';

interface HeroProps {
  data?: {
    headline?: string;
    subheading?: string;
    bodyText?: string;
    image?: {
      asset?: { _ref?: string };
      hotspot?: unknown;
      crop?: unknown;
    };
    cta1?: { text?: string; url?: string; isExternal?: boolean };
    cta2?: { text?: string; url?: string; isExternal?: boolean; email?: string };
    layout?: 'fullscreen' | 'compact';
  };
}

export default function Hero({ data }: HeroProps) {
  if (!data) return null;

  const { headline, subheading, bodyText, image, cta1, cta2, layout = 'fullscreen' } = data;
  const isCompact = layout === 'compact';

  return (
    <div className={`w-full text-left ${isCompact ? 'py-12 lg:py-20' : ''}`}>
      {image?.asset?._ref && (
        <div className={`${isCompact ? 'mb-6' : 'mb-8'} flex justify-start`}>
          <div className="relative">
            <Image
              src={urlFor(image).width(256).height(256).fit('crop').auto('format').url()}
              alt={headline || 'Profile'}
              width={isCompact ? 96 : 128}
              height={isCompact ? 96 : 128}
              className={`${isCompact ? 'w-24 h-24' : 'w-32 h-32'} rounded-full object-cover border-4 border-text-muted shadow-2xl`}
              priority
            />
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl scale-110" />
          </div>
        </div>
      )}

      <div className={`${isCompact ? 'px-0 py-2' : 'px-0 py-6 lg:p-8 lg:-mt-32'}`}>
        {headline && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${isCompact ? 'text-3xl md:text-6xl' : 'text-4xl md:text-8xl'} font-bold text-text-primary mb-4 drop-shadow-4xl`}
          >
            {headline}
          </motion.h1>
        )
}

        {subheading && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-4xl font-semibold text-accent mb-6 drop-shadow-4xl"
          >
            {subheading}
          </motion.h2>
        )}

        {bodyText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl leading-relaxed drop-shadow-4xl"
          >
            {bodyText}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-start"
        >
          {cta1?.url && (
            <a
              href={cta1.url}
              className="btn btn-primary inline-flex items-center w-full sm:w-auto justify-center focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base shadow-lg"
              target={cta1.isExternal ? '_blank' : undefined}
              rel={cta1.isExternal ? 'noopener noreferrer' : undefined}
              download={!cta1.isExternal}
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              {cta1.text}
            </a>
          )}
          {cta2?.text && cta2?.email && (
            <a
              href={`mailto:${cta2.email}`}
              className="btn btn-outline inline-flex items-center w-full sm:w-auto justify-center focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base shadow-lg"
            >
              {cta2.text}
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
