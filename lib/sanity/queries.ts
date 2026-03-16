import { cache } from 'react';
import { sanityClient } from './client';

const PAGE_FIELDS = `
  ...,
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription,
    "ogImage": seo.ogImage.asset->url
  },
  navbar->{
    title,
    logo{ asset, hotspot, crop },
    links[]{ label, href, isExternal }
  },
  footer->{
    title,
    contactInfo,
    socialMedia,
    copyright
  },
  layoutBlocks[]{
    ...,
    heroSection{
      ...,
      image{ asset, hotspot, crop },
      background{
        overlay,
        type,
        image{ asset, hotspot, crop },
        "videoUrl": video.asset->url
      }
    },
    projectsSection{
      headline,
      ctaButton,
      projects[]->{
        _id,
        _type,
        title,
        slug,
        description,
        image{ asset, hotspot, crop },
        techStack,
        challenges,
        demoUrl,
        demoCta,
        repoUrl,
        publishedAt,
        updatedAt
      }
    },
    aboutSection{
      ...,
      careerTimeline[]->{
        _id,
        _type,
        company,
        position,
        startDate,
        endDate,
        isCurrent
      },
      technologyStack->{
        _id,
        _type,
        title,
        technologies[]{ _key, name, category, proficiency }
      }
    },
    certificationsSection{
      title,
      subtitle,
      description,
      layout,
      showDates,
      certifications[]->{
        _id,
        _type,
        title,
        issuer,
        issueDate,
        expirationDate,
        credentialId,
        credentialUrl,
        description,
        image{ asset, hotspot, crop }
      }
    }
  }
`;

export const getPageBySlug = cache(async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{ ${PAGE_FIELDS} }`;

  try {
    return await sanityClient.fetch(query, { slug }, { next: { revalidate: 3600, tags: [`page-${slug}`] } });
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error instanceof Error ? error.message : error);
    return null;
  }
});
