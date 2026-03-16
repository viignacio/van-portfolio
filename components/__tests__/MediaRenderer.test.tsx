import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MediaRenderer from '../MediaRenderer';

vi.mock('next/image', () => ({
  default: ({ src, alt, fill, sizes, quality, className }: {
    src: string; alt: string; fill?: boolean; sizes?: string; quality?: number; className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      data-fill={fill ? 'true' : undefined}
      data-sizes={sizes}
      data-quality={quality}
      className={className}
    />
  ),
}));

vi.mock('@/lib/sanity/image', () => ({
  urlFor: vi.fn(() => ({
    width: vi.fn().mockReturnThis(),
    auto: vi.fn().mockReturnThis(),
    url: vi.fn().mockReturnValue('https://cdn.sanity.io/test-image.jpg'),
  })),
}));

describe('MediaRenderer', () => {
  it('returns null when mediaType is image but has no asset ref', () => {
    const { container } = render(
      <MediaRenderer media={{ mediaType: 'image' }} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null when media has no videoUrl and no image asset', () => {
    const { container } = render(
      <MediaRenderer media={{ mediaType: 'video' }} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders a video element for video mediaType with videoUrl', () => {
    render(
      <MediaRenderer
        media={{ mediaType: 'video', videoUrl: 'https://example.com/video.mp4' }}
        className="video-class"
      />
    );
    expect(document.querySelector('video')).toBeInTheDocument();
  });

  it('video element has correct attributes', () => {
    render(
      <MediaRenderer
        media={{ mediaType: 'video', videoUrl: 'https://example.com/video.mp4' }}
      />
    );
    const video = document.querySelector('video')!;
    expect(video).toHaveAttribute('autoplay');
    // `muted` is a DOM property in React/jsdom, not reflected as an HTML attribute
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
  });

  it('video has a source child with the correct src', () => {
    render(
      <MediaRenderer
        media={{ mediaType: 'video', videoUrl: 'https://example.com/video.mp4' }}
      />
    );
    const source = document.querySelector('source')!;
    expect(source).toHaveAttribute('src', 'https://example.com/video.mp4');
  });

  it('renders Next.js Image with fill when fill=true and image has asset ref', () => {
    render(
      <MediaRenderer
        media={{ mediaType: 'image', image: { asset: { _ref: 'image-abc-123' } } }}
        alt="Test image"
        fill
        sizes="100vw"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Test image');
    expect(img).toHaveAttribute('data-fill', 'true');
    expect(img).toHaveAttribute('data-sizes', '100vw');
  });

  it('uses default sizes when fill=true and no sizes prop', () => {
    render(
      <MediaRenderer
        media={{ mediaType: 'image', image: { asset: { _ref: 'image-abc-123' } } }}
        fill
      />
    );
    // alt="" → role="presentation", use querySelector instead
    const img = document.querySelector('img')!;
    expect(img).toHaveAttribute('data-sizes', '(max-width: 1024px) 100vw, 800px');
  });

  it('renders plain img (lazy-loaded) when fill=false and image has asset ref', () => {
    render(
      <MediaRenderer
        media={{ mediaType: 'image', image: { asset: { _ref: 'image-abc-123' } } }}
        alt="Lazy image"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Lazy image');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).not.toHaveAttribute('data-fill');
  });

  it('applies className to the rendered element', () => {
    render(
      <MediaRenderer
        media={{ mediaType: 'image', image: { asset: { _ref: 'image-abc-123' } } }}
        className="my-image"
      />
    );
    // alt="" → role="presentation", use querySelector instead
    const img = document.querySelector('img')!;
    expect(img).toHaveClass('my-image');
  });
});
