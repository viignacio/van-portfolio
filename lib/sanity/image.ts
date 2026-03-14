import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './client';

export function urlFor(source: SanityImageSource) {
  return createImageUrlBuilder(sanityClient).image(source);
}
