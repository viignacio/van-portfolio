export interface SanityMedia {
  mediaType?: 'image' | 'video';
  image?: {
    asset?: { _ref?: string };
    hotspot?: unknown;
    crop?: unknown;
  };
  /** Resolved video URL (from GROQ `video.asset->url` projection) */
  videoUrl?: string;
}
