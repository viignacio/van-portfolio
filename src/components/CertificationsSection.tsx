'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { buildSanityImageUrl } from '@/lib/sanity/imageUrl';
import { CertificationsSection as CertificationsSectionType, Certification } from '@/lib/cms/types';

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

interface CertificationsSectionProps {
  data?: CertificationsSectionType;
  id?: string;
}

export default function CertificationsSection({ data, id }: CertificationsSectionProps) {
  if (!data) return null;

  const { title, subtitle, description, certifications } = data;
  
  // Don't render if there's no content
  if (!title && (!certifications || certifications.length === 0)) {
    return null;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
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

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const nextSlide = () => {
    if (certifications && certifications.length > 0) {
      setCurrentSlide((prev) => {
        // Remove infinite scrolling - stop at last slide
        if (prev >= certifications.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }
  };

  const prevSlide = () => {
    if (certifications && certifications.length > 0) {
      setCurrentSlide((prev) => {
        // Remove infinite scrolling - stop at first slide
        if (prev <= 0) {
          return prev;
        }
        return prev - 1;
      });
    }
  };

  const goToSlide = (index: number) => {
    if (certifications && index >= 0 && index < certifications.length) {
      setCurrentSlide(index);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    
    // Prevent vertical scrolling if it's a horizontal swipe
    if (touchStartX !== null && touchStartY !== null) {
      const horizontalDistance = Math.abs(touchStartX - e.targetTouches[0].clientX);
      const verticalDistance = Math.abs(touchStartY - e.targetTouches[0].clientY);
      
      // If horizontal movement is greater than vertical, prevent default scrolling
      if (horizontalDistance > verticalDistance && horizontalDistance > 10) {
        e.preventDefault();
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && certifications && certifications.length > 0) {
      nextSlide();
    }
    if (isRightSwipe && certifications && certifications.length > 0) {
      prevSlide();
    }

    // Reset
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
  };

  // Helper function to format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return dateString;
    }
  };

  // Render certification card
  const renderCertificationCard = (certification: Certification, index: number) => {
    const { mousePosition, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMouseGlow();
    
    return (
      <motion.div
        key={certification._id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-full lg:w-full h-full"
      >
        <div 
          className="card group relative overflow-visible h-full flex flex-col"
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

          <div className="relative z-10 space-y-4 flex-1 flex flex-col">
            {/* Certification Image */}
            {certification.image && (
              <div className="relative overflow-hidden rounded-xl w-full aspect-video">
                <img
                  src={buildSanityImageUrl(certification.image.asset.url, { width: 800, quality: 80 })}
                  alt={certification.title}
                  className="w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-text-primary lg:group-hover:text-accent transition-colors">
              {certification.title}
            </h3>

            {/* Issuer */}
            <div className="text-text-secondary">
              <span className="font-medium">Issued by: </span>
              <span>{certification.issuer}</span>
            </div>

            {/* Dates */}
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
                    : 'No expiry'
                  }
                </span>
              </div>
            </div>

            {/* Credential ID */}
            {certification.credentialId && (
              <div className="text-sm text-text-muted">
                <span className="font-medium">Credential ID: </span>
                <span 
                  className="truncate block"
                  title={certification.credentialId}
                  style={{ 
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {certification.credentialId}
                </span>
              </div>
            )}

            {/* Description */}
            {certification.description && certification.description.trim() && (
              <p className="text-text-secondary leading-relaxed">
                {certification.description}
              </p>
            )}

            {/* Spacer to push button to bottom */}
            <div className="grow"></div>

            {/* View Certificate Button */}
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
  };

  return (
    <>
      {(title || (certifications && certifications.length > 0)) ? (
        <section id={id} className="py-20">
          <div className="px-4 lg:w-4/5 lg:mx-auto relative z-20 lg:p-8">
            {/* Section Header */}
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-start mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
                  {title}
                </h2>
                {subtitle && (
                  <h3 className="text-2xl font-semibold text-text-secondary mb-4">
                    {subtitle}
                  </h3>
                )}
                {description && (
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {description}
                  </p>
                )}
              </motion.div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Desktop: 3-column grid */}
                <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
                  {certifications.map((certification, index) => {
                    const totalItems = certifications.length;
                    const fullRows = Math.floor(totalItems / 3);
                    const itemsInLastRow = totalItems % 3;
                    const isInPartialRow = itemsInLastRow > 0 && index >= fullRows * 3;
                    
                    // Center items in partial row
                    let gridColumnClass = '';
                    if (isInPartialRow && itemsInLastRow === 1) {
                      // Single item: center it in column 2
                      gridColumnClass = 'lg:col-start-2';
                    } else if (isInPartialRow && itemsInLastRow === 2) {
                      // Two items: center them (start at column 1, span 2 columns total)
                      // First item at col 1, second at col 2
                      const positionInRow = index - fullRows * 3;
                      gridColumnClass = positionInRow === 0 ? 'lg:col-start-1' : 'lg:col-start-2';
                    }
                    
                    return (
                      <div key={`grid-item-${certification._id}`} className={gridColumnClass}>
                        {renderCertificationCard(certification, index)}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: Swipeable carousel */}
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
                    {certifications.map((certification, index) => (
                      <div 
                        key={certification._id} 
                        className="w-full shrink-0 px-2"
                      >
                        {renderCertificationCard(certification, index)}
                      </div>
                    ))}
                  </div>
                  
                  {/* Dots Navigation */}
                  {certifications.length > 1 && (
                    <div className="flex justify-center mt-4 pb-8">
                      <div className="flex space-x-3">
                        {certifications.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 active:scale-125 ${
                              index === currentSlide 
                                ? 'bg-accent' 
                                : 'bg-white hover:bg-gray-300'
                            }`}
                            aria-label={`Go to certification ${index + 1}`}
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
      ) : null}
    </>
  );
}

