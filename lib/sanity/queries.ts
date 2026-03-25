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
  archiveHeader,
  archiveFooter,
  emptyStateText,
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
    },
    contentSection{
      contentItems[]{
        _type,
        _type == "richText" => {
          content
        },
        _type == "mediaBlock" => {
          image{ asset, hotspot, crop },
          videoUrl,
          caption
        },
        _type == "galleryBlock" => {
          items[]{
            image{ asset, hotspot, crop },
            caption
          }
        },
        _type == "ctaBlock" => {
          text,
          url
        }
      }
    }
  }
`;

const PROJECT_FIELDS = `
  _id,
  _type,
  title,
  role,
  slug,
  description,
  image{ asset, hotspot, crop },
  techStack,
  challenges,
  demoUrl,
  demoCta,
  repoUrl,
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
    contentSection{
      contentItems[]{
        _type,
        _type == "richText" => {
          content
        },
        _type == "mediaBlock" => {
          image{ asset, hotspot, crop },
          videoUrl,
          caption
        },
        _type == "galleryBlock" => {
          items[]{
            image{ asset, hotspot, crop },
            caption
          }
        },
        _type == "ctaBlock" => {
          text,
          url
        }
      }
    }
  }
`;

export const getProjects = cache(async function getProjects(start = 0, limit = 10) {
  const query = `*[_type == "project"] | order(publishedAt desc) [$start...$end]{
    _id,
    _type,
    title,
    slug,
    description,
    image{ asset, hotspot, crop },
    techStack,
    demoUrl,
    demoCta,
    repoUrl
  }`;

  try {
    return await sanityClient.fetch(query, { start, end: start + limit }, { next: { revalidate: 3600, tags: ['projects'] } });
  } catch (error) {
    console.error(`Error fetching projects:`, error instanceof Error ? error.message : error);
    return [];
  }
});

export const getProjectBySlug = cache(async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{ ${PROJECT_FIELDS} }`;

  try {
    return await sanityClient.fetch(query, { slug }, { next: { revalidate: 3600, tags: [`project-${slug}`] } });
  } catch (error) {
    console.error(`Error fetching project "${slug}":`, error instanceof Error ? error.message : error);
    return null;
  }
});

export const getPageBySlug = cache(async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{ ${PAGE_FIELDS} }`;

  try {
    return await sanityClient.fetch(query, { slug }, { next: { revalidate: 3600, tags: [`page-${slug}`] } });
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error instanceof Error ? error.message : error);
    return null;
  }
});
