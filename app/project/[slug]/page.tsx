import { getProjectBySlug, getPageBySlug } from '@/lib/sanity/queries';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import HeroBackground from '@/components/HeroBackground';
import ContentSection from '@/components/ContentSection';
import LayoutBlock from '@/components/LayoutBlock';
import { urlFor } from '@/lib/sanity/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  return {
    title: `${project?.title || 'Project'} | Van Ian Ignacio`,
    description: project?.description,
    openGraph: project?.image ? { images: [{ url: urlFor(project.image).url() }] } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const homeData = await getPageBySlug('home');

  if (!project) {
    notFound();
  }

  const logoUrl = homeData?.navbar?.logo?.asset?._ref
    ? urlFor(homeData.navbar.logo).width(128).height(128).fit('fill').auto('format').url()
    : undefined;

  return (
    <Layout
      navbarData={homeData?.navbar}
      footerData={homeData?.footer}
      logoUrl={logoUrl}
    >
      <div className="will-change-scroll">
        {/* Render Layout Blocks from the project document */}
        {project.layoutBlocks?.map((layoutBlock: any, index: number) => {
          const isCompactHero = index === 0 && layoutBlock.heroSection?.layout === 'compact';
          
          return (
            <LayoutBlock
              key={layoutBlock._id || `project-block-${index}`}
              id={layoutBlock.blockType}
              className={`${index === 0 ? (isCompactHero ? 'min-h-[40vh] bg-base relative overflow-hidden' : 'h-screen-dynamic bg-base relative overflow-hidden') : 'bg-base'}`}
            >
              {index === 0 && layoutBlock.heroSection && (
                <>
                  <HeroBackground background={layoutBlock.heroSection?.background} />
                  {!isCompactHero && (
                    <div className="absolute inset-0 bg-linear-to-b from-base/40 via-transparent to-transparent pointer-events-none z-10" />
                  )}
                  <div className={`${isCompactHero ? 'py-20' : 'h-full flex items-center'} justify-start relative z-20 pointer-events-none`}>
                    <div className="pointer-events-auto relative z-20 px-4 lg:w-4/5 lg:mx-auto lg:p-8">
                      <Hero data={layoutBlock.heroSection} />
                    </div>
                  </div>
                </>
              )}

            {layoutBlock.contentSection && (
              <ContentSection data={layoutBlock.contentSection} />
            )}
            </LayoutBlock>
          );
        })}
        
        {/* If no layout blocks, fallback to a basic project overview */}
        {!project.layoutBlocks || project.layoutBlocks.length === 0 ? (
          <main className="min-h-screen pt-32 pb-20 px-4">
             <div className="max-w-4xl mx-auto">
               <h1 className="text-5xl font-bold text-text-primary mb-8">{project.title}</h1>
               <p className="text-xl text-text-secondary leading-relaxed mb-12">{project.description}</p>
               {/* Add more default fields here if needed */}
             </div>
          </main>
        ) : null}
      </div>
    </Layout>
  );
}
