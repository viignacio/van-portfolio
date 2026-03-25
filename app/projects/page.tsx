import { getProjects, getPageBySlug } from '@/lib/sanity/queries';
import ProjectsGrid from '@/components/ProjectsGrid';
import Layout from '@/components/Layout';
import { urlFor } from '@/lib/sanity/image';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const pageData = await getPageBySlug('projects');
  const seo = pageData?.seo;
  return {
    title: seo?.metaTitle ?? 'Projects | Van Ian Ignacio',
    description: seo?.metaDescription ?? 'A curated collection of my professional engineering work and personal projects.',
    openGraph: seo?.ogImage ? { images: [{ url: seo.ogImage }] } : undefined,
  };
}

export default async function ProjectsPage() {
  const initialProjects = await getProjects(0, 10);
  const pageData = await getPageBySlug('projects') || await getPageBySlug('home');

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
      <main className="min-h-screen pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {pageData.archiveHeader && (
            <header className="mb-20 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight">
                {pageData.archiveHeader.title}{' '}
                {pageData.archiveHeader.highlightedTitle && (
                  <span className="text-accent underline decoration-accent/20 underline-offset-8">
                    {pageData.archiveHeader.highlightedTitle}
                  </span>
                )}
              </h1>
              {pageData.archiveHeader.description && (
                <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                  {pageData.archiveHeader.description}
                </p>
              )}
            </header>
          )}

          <ProjectsGrid 
            initialProjects={initialProjects} 
            footerText={pageData.archiveFooter} 
            emptyText={pageData.emptyStateText}
          />
        </div>
      </main>
    </Layout>
  );
}
