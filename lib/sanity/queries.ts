import { sanityClient } from './client';

export async function getHomePage() {
  const query = `*[_type == "page" && isHomePage == true][0]{
    ...,
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
        profileImage{ asset, hotspot, crop },
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
  }`;

  try {
    return await sanityClient.fetch(query, {}, { next: { revalidate: 3600, tags: ['homepage'] } });
  } catch (error) {
    console.error('Error fetching homepage data:', error instanceof Error ? error.message : error);
    return null;
  }
}
