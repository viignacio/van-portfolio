/**
 * Build an optimized Sanity CDN image URL.
 * Appends transformation params so the CDN serves the right size and
 * automatically picks the best format (WebP/AVIF where supported).
 */
export function buildSanityImageUrl(
  url: string | undefined | null,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'crop' | 'clip' | 'fill' | 'max' | 'scale' | 'min';
  } = {}
): string | undefined {
  if (!url) return undefined;
  if (!url.includes('cdn.sanity.io')) return url;

  const params = new URLSearchParams();
  if (options.width) params.set('w', String(options.width));
  if (options.height) params.set('h', String(options.height));
  params.set('q', String(options.quality ?? 80));
  if (options.fit) params.set('fit', options.fit);
  params.set('auto', 'format');

  return `${url}?${params.toString()}`;
}
