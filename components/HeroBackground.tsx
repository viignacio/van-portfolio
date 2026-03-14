'use client';

import FaultyTerminal from '@/components/Backgrounds/FaultyTerminal';
import MediaRenderer from '@/components/MediaRenderer';

const overlayClass: Record<'dark' | 'darker', string> = {
  dark: 'absolute inset-0 bg-black/50 z-[1]',
  darker: 'absolute inset-0 bg-black/80 z-[1]',
};

interface HeroBackgroundProps {
  background?: {
    overlay?: 'none' | 'dark' | 'darker';
    type?: 'faultyTerminal' | 'image' | 'video';
    image?: { asset?: { _ref?: string }; hotspot?: unknown; crop?: unknown };
    videoUrl?: string;
  };
}

export default function HeroBackground({ background }: HeroBackgroundProps) {
  const overlay = background?.overlay && background.overlay !== 'none'
    ? <div className={overlayClass[background.overlay]} aria-hidden="true" />
    : null;

  if (!background?.type || background.type === 'faultyTerminal') {
    return (
      <>
        <FaultyTerminal className="opacity-30 z-0" mouseReact={false} />
        {overlay}
      </>
    );
  }

  const media =
    background.type === 'image' && background.image
      ? { mediaType: 'image' as const, image: background.image }
      : background.type === 'video' && background.videoUrl
        ? { mediaType: 'video' as const, videoUrl: background.videoUrl }
        : null;

  if (media) {
    return (
      <>
        <MediaRenderer
          media={media}
          className="absolute inset-0 w-full h-full object-cover z-0"
          width={1920}
          quality={80}
        />
        {overlay}
      </>
    );
  }

  // No background selected or missing asset — black via parent's bg-base class
  return null;
}
