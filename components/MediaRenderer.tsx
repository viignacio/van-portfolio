import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import type { SanityMedia } from '@/lib/cms/types';

interface MediaRendererProps {
  media: SanityMedia;
  alt?: string;
  className?: string;
  width?: number;
  quality?: number;
  fill?: boolean;
  sizes?: string;
}

export default function MediaRenderer({
  media,
  alt = '',
  className = '',
  width = 800,
  quality = 75,
  fill = false,
  sizes,
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
    const src = urlFor(media.image).width(width).auto('format').url();

    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? '(max-width: 1024px) 100vw, 800px'}
          quality={quality}
          className={className}
        />
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
      />
    );
  }

  return null;
}
