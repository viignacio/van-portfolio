'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
  logoUrl?: string;
  navbarData?: {
    title?: string;
    links?: Array<{ label: string; href: string; isExternal: boolean }>;
  };
  footerData?: {
    title?: string;
    contactInfo?: { email?: string; phone?: string; location?: string };
    socialMedia?: {
      facebook?: string;
      github?: string;
      linkedin?: string;
      twitter?: string;
      instagram?: string;
    };
    copyright?: string;
  };
}

export default function Layout({ children, logoUrl, navbarData, footerData }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const isManuallyExpandedRef = useRef(false);
  const expandedAtRef = useRef(0);

  const setManuallyExpanded = (val: boolean) => {
    isManuallyExpandedRef.current = val;
    setIsManuallyExpanded(val);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsAtTop(prev => {
        const atTop = y < 150;
        return prev === atTop ? prev : atTop;
      });
      if (isManuallyExpandedRef.current && Math.abs(y - expandedAtRef.current) > 30) {
        setManuallyExpanded(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showExpanded = isAtTop || isManuallyExpanded;

  const handlePillClick = () => {
    expandedAtRef.current = window.scrollY;
    setManuallyExpanded(true);
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 32;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const filteredNavLinks = navbarData?.links?.filter(
    (link) => !link.href.includes('style-guide') && link.label !== 'Style Guide'
  ) ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Navbar - Full */}
      {navbarData && (
        <motion.nav
          className="hidden lg:block fixed top-0 left-0 right-0 z-50 pointer-events-none"
          initial={false}
          animate={showExpanded ? 'expanded' : 'collapsed'}
          variants={{
            expanded: {
              opacity: 1,
              transition: { duration: 0.25, ease: 'easeOut' },
            },
            collapsed: {
              opacity: 0,
              transition: { duration: 0.2, ease: 'easeIn' },
            },
          }}
          aria-hidden={!showExpanded}
        >
          <div style={{ pointerEvents: showExpanded ? 'auto' : 'none' }} className="w-4/5 mx-auto mt-6">
            <div className="bg-base-950 border border-accent/20 shadow-lg shadow-accent/15 rounded-2xl">
              <div className="flex items-center justify-between h-20 px-8">
                <div className="shrink-0">
                  {logoUrl && (
                    <div className="relative h-12 w-12 overflow-hidden">
                      <Image src={logoUrl} alt="Logo" fill className="object-contain" priority unoptimized />
                    </div>
                  )}
                </div>
                {filteredNavLinks.length > 0 && (
                  <ul className="flex items-center space-x-8">
                    {filteredNavLinks.map((link, i) => (
                      <li key={i}>
                        {link.isExternal ? (
                          <Link
                            href={link.href}
                            className="text-text-primary lg:hover:text-accent transition-colors duration-200 font-medium text-lg relative group drop-shadow-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-200 lg:group-hover:w-full" />
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="text-text-primary lg:hover:text-accent transition-colors duration-200 font-medium text-lg relative group drop-shadow-xs cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(link.href.replace('#', ''));
                            }}
                          >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-200 lg:group-hover:w-full" />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Desktop Floating Pill - Collapsed */}
      {navbarData && (
        <motion.button
          onClick={handlePillClick}
          className="hidden lg:flex fixed top-8 right-[10%] z-50 h-16 w-16 rounded-full items-center justify-center bg-base-950 border border-accent/20 shadow-lg shadow-accent/15 text-text-primary focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base"
          initial={false}
          animate={!showExpanded ? 'visible' : 'hidden'}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: { type: 'spring', stiffness: 480, damping: 24, delay: 0.12 },
            },
            hidden: {
              opacity: 0,
              scale: 0.4,
              transition: { duration: 0.15, ease: 'easeIn' },
            },
          }}
          style={{ pointerEvents: !showExpanded ? 'auto' : 'none' }}
          aria-label="Expand navigation"
        >
          {logoUrl ? (
            <div className="relative h-9 w-9">
              <Image src={logoUrl} alt="Logo" fill className="object-contain" priority unoptimized />
            </div>
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </motion.button>
      )}

      {/* Mobile Hamburger */}
      {navbarData && filteredNavLinks.length > 0 && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full bg-base-950 border border-accent/20 shadow-lg shadow-accent/15 flex items-center justify-center text-text-primary focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base active:bg-base-700"
          aria-label="Open mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Drawer */}
      {navbarData && filteredNavLinks.length > 0 && (
        <>
          <div
            className={`fixed inset-0 bg-base z-60 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden={!isMobileMenuOpen}
          />
          <div
            className={`fixed inset-0 z-70 lg:hidden transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="h-full w-full bg-base flex flex-col">
              <div className="flex items-center justify-end p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-text-primary focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base rounded-lg active:text-accent"
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 pt-16 pb-8 flex justify-center" aria-label="Mobile navigation">
                <ul className="space-y-4 text-center">
                  {filteredNavLinks.map((link, i) => (
                    <li key={i}>
                      {link.isExternal ? (
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-4 text-text-primary transition-colors duration-200 font-medium text-xl focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base rounded-lg px-2 active:text-accent"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            scrollToSection(link.href.replace('#', ''));
                          }}
                          className="block py-4 text-text-primary hover:text-accent transition-colors duration-200 font-medium text-xl focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base rounded-lg px-2 cursor-pointer"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}

      <main className="flex-1">{children}</main>

      {/* Footer */}
      {footerData && (
        <footer className="bg-base-800 text-white py-12">
          <div className="px-4 lg:w-4/5 lg:mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-xl font-semibold font-heading text-white mb-2">Contact Information</h3>
                <ul className="space-y-2" role="list">
                  {footerData.contactInfo?.email && (
                    <li className="flex items-center space-x-4">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href={`mailto:${footerData.contactInfo.email}`} className="text-text-secondary lg:hover:text-accent transition-colors duration-200">
                        {footerData.contactInfo.email}
                      </a>
                    </li>
                  )}
                  {footerData.contactInfo?.phone && (
                    <li className="flex items-center space-x-4">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a href={`tel:${footerData.contactInfo.phone}`} className="text-text-secondary lg:hover:text-accent transition-colors duration-200">
                        {footerData.contactInfo.phone}
                      </a>
                    </li>
                  )}
                  {footerData.contactInfo?.location && (
                    <li className="flex items-center space-x-4">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-text-secondary">{footerData.contactInfo.location}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold font-heading text-white mb-2 lg:ml-8">Follow Me</h3>
                <ul className="flex flex-col space-y-2 lg:ml-8" role="list">
                  {footerData.socialMedia?.linkedin && (
                    <li>
                      <a href={footerData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-text-secondary lg:hover:text-accent transition-colors duration-200 group">
                        <svg className="w-5 h-5 text-accent lg:group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    </li>
                  )}
                  {footerData.socialMedia?.github && (
                    <li>
                      <a href={footerData.socialMedia.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-text-secondary lg:hover:text-accent transition-colors duration-200 group">
                        <svg className="w-5 h-5 text-accent lg:group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    </li>
                  )}
                  {footerData.socialMedia?.facebook && (
                    <li>
                      <a href={footerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-text-secondary lg:hover:text-accent transition-colors duration-200 group">
                        <svg className="w-5 h-5 text-accent lg:group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>Facebook</span>
                      </a>
                    </li>
                  )}
                  {footerData.socialMedia?.twitter && (
                    <li>
                      <a href={footerData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-text-secondary lg:hover:text-accent transition-colors duration-200 group">
                        <svg className="w-5 h-5 text-accent lg:group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        <span>Twitter</span>
                      </a>
                    </li>
                  )}
                  {footerData.socialMedia?.instagram && (
                    <li>
                      <a href={footerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-text-secondary lg:hover:text-accent transition-colors duration-200 group">
                        <svg className="w-5 h-5 text-accent lg:group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.49.49-1.297.49-1.787 0-.49-.49-.49-1.297 0-1.787.49-.49 1.297-.49 1.787 0 .49.49.49 1.297 0 1.787zm1.297-7.718c-.49.49-1.297.49-1.787 0-.49-.49-.49-1.297 0-1.787.49-.49 1.297-.49 1.787 0 .49.49.49 1.297 0 1.787z"/>
                        </svg>
                        <span>Instagram</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="border-t border-ui-border/30 my-12" />

            <div className="text-left lg:text-center">
              {footerData.copyright && (
                <p className="text-sm text-text-muted">{footerData.copyright}</p>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
