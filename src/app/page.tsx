'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Layout from '@/components/Layout';
import LayoutBlock from '@/components/LayoutBlock';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import { getHomePage } from '@/lib/sanity/queries';
import { FaultyTerminal } from '@/components/Backgrounds';

export default function Home() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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

  // Simple background component
  const BackgroundComponent = useMemo(() => (
    <FaultyTerminal 
      className="opacity-30 z-0"
      mouseReact={isDesktop}
    />
  ), [isDesktop]);

  // Helper function to generate readable section IDs
  const generateSectionId = (blockType: string) => {
    // Use the blockType as the base for the ID
    return blockType;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching homepage data...');
        const data = await getHomePage();
        console.log('Homepage data received:', data);
        setPageData(data);
      } catch (error) {
        console.error('Error fetching page data:', error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-text-primary">Loading...</div>;
  }

  if (!pageData) {
    return <div className="min-h-screen flex items-center justify-center text-text-primary">No data found</div>;
  }

  return (
    <Layout 
      navbarData={pageData?.navbar}
      footerData={pageData?.footer}
    >
      <div className="will-change-scroll" style={{ 
        willChange: 'scroll-position',
        backfaceVisibility: 'hidden'
      }}>
      {/* Render all layout blocks */}
      {pageData.layoutBlocks?.map((layoutBlock: any, index: number) => {
        return (
          <LayoutBlock 
            key={layoutBlock._id || `layout-block-${index}`}
            id={generateSectionId(layoutBlock.blockType)}
            className={`${index === 0 ? 'h-screen-dynamic bg-base relative overflow-hidden' : 'bg-base'}`}
          >
            {/* Hero Section */}
            {index === 0 && layoutBlock.heroSection && (
              <>
                {/* Background that only runs when at top of page */}
                {BackgroundComponent}
                
                {/* Subtle gradient overlay for navbar readability */}
                <div className="absolute inset-0 bg-linear-to-b from-base/40 via-transparent to-transparent pointer-events-none z-10"></div>
                
                <div className="h-full flex items-center justify-start relative z-20 pointer-events-none">
                  <div className="pointer-events-auto relative z-20 px-4 lg:w-4/5 lg:mx-auto lg:p-8">
                    <Hero data={layoutBlock.heroSection} />
                  </div>
                </div>
              </>
            )}
            
            {/* About Section - render regardless of blockType since it's in the same block */}
            {layoutBlock.aboutSection && (
              <AboutSection data={layoutBlock.aboutSection} />
            )}
            
            {/* Projects Section - render regardless of blockType since it's in the same block */}
            {layoutBlock.projectsSection && (
              <ProjectsSection data={layoutBlock.projectsSection} />
            )}
            
            {/* Certifications Section - render regardless of blockType since it's in the same block */}
            {layoutBlock.certificationsSection && (
              <CertificationsSection 
                data={layoutBlock.certificationsSection} 
                id={layoutBlock.blockType === 'certifications' ? generateSectionId(layoutBlock.blockType) : undefined}
              />
            )}
          </LayoutBlock>
        );
      })}
      </div>
    </Layout>
  );
}
