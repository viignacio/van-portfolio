import { urlFor } from '@/lib/sanity/image';
import type { SanityMedia } from '@/lib/cms/types';

interface MediaRendererProps {
  media: SanityMedia;
  alt?: string;
  className?: string;
  width?: number;
  quality?: number;
}

export default function MediaRenderer({
  media,
  alt = '',
  className = '',
  width = 800,
  quality = 75,
}: MediaRendererProps) {
  if (media.mediaType === 'video' && media.videoUrl) {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={media.videoUrl} />
      </video>
    );
  }

  if (media.image?.asset?._ref) {
    return (
      <img
        src={urlFor(media.image).width(width).quality(quality).auto('format').url()}
        alt={alt}
        className={className}
      />
    );
  }

  return null;
}
