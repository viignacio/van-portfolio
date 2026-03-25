'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import MediaRenderer from '@/components/MediaRenderer';
import { useMouseGlow, glowStyle } from '@/hooks/useMouseGlow';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useSwipe } from '@/hooks/useSwipe';
import type { CertificationsSection as CertificationsSectionType, Certification } from '@/lib/cms/types';

function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return dateString;
  }
}

// Extracted sub-component so useMouseGlow is at component level
function CertificationCard({ certification, index, isDesktop }: { certification: Certification; index: number; isDesktop: boolean }) {
  const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();

  return (
    <motion.div
      key={certification._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full h-full"
    >
      <div
        className="card group relative overflow-hidden min-h-[500px] flex flex-col isolation-isolate transform-gpu"
        onMouseMove={isDesktop ? handleMouseMove : undefined}
        onMouseEnter={isDesktop ? handleMouseEnter : undefined}
        onMouseLeave={isDesktop ? handleMouseLeave : undefined}
      >
        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={glowStyle(mousePosition.x, mousePosition.y)}
          />
        )}

        <div className="relative z-10 space-y-4 flex-1 flex flex-col">
          {certification.image && (
            <div className="relative overflow-hidden rounded-xl w-full aspect-video">
              <MediaRenderer
                media={{ mediaType: 'image', image: certification.image }}
                alt={certification.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                quality={80}
                className="object-cover lg:group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <h3 className="text-xl font-bold text-text-primary lg:group-hover:text-accent transition-colors line-clamp-1">
            {certification.title}
          </h3>

          <div className="text-text-secondary line-clamp-1">
            <span className="font-medium">Issued by: </span>
            <span>{certification.issuer}</span>
          </div>

          <div className="space-y-2">
            {certification.issueDate && (
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <CalendarIcon className="w-4 h-4 shrink-0" />
                <span>Issued: {formatDate(certification.issueDate)}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <CalendarIcon className="w-4 h-4 shrink-0" />
              <span>
                {certification.expirationDate && certification.expirationDate.trim()
                  ? `Expires: ${formatDate(certification.expirationDate)}`
                  : 'No expiry'}
              </span>
            </div>
          </div>

          {certification.credentialId && (
            <div className="text-sm text-text-muted">
              <span className="font-medium">Credential ID: </span>
              <span className="truncate block" title={certification.credentialId}>
                {certification.credentialId}
              </span>
            </div>
          )}

          {certification.description && certification.description.trim() && (
            <p className="text-text-secondary leading-relaxed line-clamp-3 text-sm">{certification.description}</p>
          )}

          <div className="grow" />

          {certification.credentialUrl && (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-ui-card text-accent rounded-lg lg:hover:bg-ui-card/80 transition-all duration-200 text-sm font-semibold border border-base-700 lg:hover:border-accent mt-auto self-start active:scale-95 active:opacity-80"
            >
              View Certificate
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface CertificationsSectionProps {
  data?: CertificationsSectionType;
  id?: string;
}

export default function CertificationsSection({ data, id }: CertificationsSectionProps) {
  if (!data) return null;
  const { title, subtitle, description, certifications } = data;
  if (!title && (!certifications || certifications.length === 0)) return null;

  const [currentSlide, setCurrentSlide] = useState(0);
  const isDesktop = useIsDesktop();

  const nextSlide = () => {
    if (certifications && certifications.length > 0) {
      setCurrentSlide(prev => prev >= certifications.length - 1 ? prev : prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev <= 0 ? prev : prev - 1);
  };

  const goToSlide = (index: number) => {
    if (certifications && index >= 0 && index < certifications.length) {
      setCurrentSlide(index);
    }
  };

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(nextSlide, prevSlide);

  return (
    <section id={id} className="py-20">
      <div className="px-4 lg:w-4/5 lg:mx-auto relative z-20 lg:p-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-start mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">{title}</h2>
            {subtitle && <h3 className="text-2xl font-semibold text-text-secondary mb-4">{subtitle}</h3>}
            {description && <p className="text-lg text-text-secondary leading-relaxed">{description}</p>}
          </motion.div>
        )}

        {certifications && certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Desktop: 3-column asymmetric layout */}
            <div className="hidden lg:flex lg:flex-row gap-6 pb-32 px-4">
              {/* Column 1 - Main anchor */}
              <div className="flex-1 flex flex-col gap-6 lg:mt-0">
                {certifications.filter((_, i) => i % 3 === 0).map((cert, i) => (
                  <CertificationCard key={`col1-${cert._id}`} certification={cert} index={i * 3} isDesktop={isDesktop} />
                ))}
              </div>

              {/* Column 2 - Offset down */}
              <div className="flex-1 flex flex-col gap-6 lg:mt-24">
                {certifications.filter((_, i) => i % 3 === 1).map((cert, i) => (
                  <CertificationCard key={`col2-${cert._id}`} certification={cert} index={i * 3 + 1} isDesktop={isDesktop} />
                ))}
              </div>

              {/* Column 3 - Main anchor */}
              <div className="flex-1 flex flex-col gap-6 lg:mt-0">
                {certifications.filter((_, i) => i % 3 === 2).map((cert, i) => (
                  <CertificationCard key={`col3-${cert._id}`} certification={cert} index={i * 3 + 2} isDesktop={isDesktop} />
                ))}
              </div>
            </div>

            {/* Mobile: swipeable carousel */}
            <div
              className="lg:hidden relative overflow-hidden rounded-2xl"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {certifications.map((cert, i) => (
                  <div key={cert._id} className="w-full shrink-0 px-2">
                    <CertificationCard certification={cert} index={i} isDesktop={isDesktop} />
                  </div>
                ))}
              </div>

              {certifications.length > 1 && (
                <div className="flex justify-center mt-4 pb-8">
                  <div className="flex space-x-4">
                    {certifications.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 active:scale-125 ${i === currentSlide ? 'bg-accent' : 'bg-white hover:bg-gray-300'}`}
                        aria-label={`Go to certification ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
