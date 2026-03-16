import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import LayoutBlock from '@/components/LayoutBlock';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import HeroBackground from '@/components/HeroBackground';
import { getPageBySlug } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageBySlug('blog');
  const seo = pageData?.seo;
  return {
    title: seo?.metaTitle ?? 'Blog | Van Ian Ignacio',
    description: seo?.metaDescription ?? 'Articles and insights on QA automation and software testing',
    openGraph: seo?.ogImage ? { images: [{ url: seo.ogImage }] } : undefined,
  };
}

export default async function BlogPage() {
  const pageData = await getPageBySlug('blog');

  if (!pageData) {
    notFound();
  }

  const logoUrl = pageData?.navbar?.logo?.asset?._ref
    ? urlFor(pageData.navbar.logo).width(128).height(128).fit('fill').auto('format').url()
    : undefined;

  return (
    <Layout
      navbarData={pageData?.navbar}
      footerData={pageData?.footer}
      logoUrl={logoUrl}
    >
      <div
        className="will-change-scroll"
        style={{ willChange: 'scroll-position', backfaceVisibility: 'hidden' }}
      >
        {pageData.layoutBlocks?.map((layoutBlock: any, index: number) => (
          <LayoutBlock
            key={layoutBlock._id || `layout-block-${index}`}
            id={layoutBlock.blockType}
            className={`${index === 0 ? 'h-screen-dynamic bg-base relative overflow-hidden' : 'bg-base'}`}
          >
            {index === 0 && layoutBlock.heroSection && (
              <>
                <HeroBackground background={layoutBlock.heroSection?.background} />
                <div className="absolute inset-0 bg-linear-to-b from-base/40 via-transparent to-transparent pointer-events-none z-10" />
                <div className="h-full flex items-center justify-start relative z-20 pointer-events-none">
                  <div className="pointer-events-auto relative z-20 px-4 lg:w-4/5 lg:mx-auto lg:p-8">
                    <Hero data={layoutBlock.heroSection} />
                  </div>
                </div>
              </>
            )}

            {layoutBlock.aboutSection && (
              <AboutSection data={layoutBlock.aboutSection} />
            )}

            {layoutBlock.projectsSection && (
              <ProjectsSection data={layoutBlock.projectsSection} />
            )}

            {layoutBlock.certificationsSection && (
              <CertificationsSection
                data={layoutBlock.certificationsSection}
                id={layoutBlock.blockType === 'certifications' ? layoutBlock.blockType : undefined}
              />
            )}
          </LayoutBlock>
        ))}
      </div>
    </Layout>
  );
}
