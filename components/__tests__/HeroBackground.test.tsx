import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroBackground from '../HeroBackground';

vi.mock('next/dynamic', () => ({
  default: () => () => <div data-testid="faulty-terminal" />,
}));

vi.mock('@/components/MediaRenderer', () => ({
  default: ({ media, className }: { media: { mediaType: string }; className?: string }) => (
    <div data-testid="media-renderer" data-media-type={media.mediaType} className={className} />
  ),
}));

describe('HeroBackground', () => {
  it('renders FaultyTerminal when no background prop is given', () => {
    const { getByTestId } = render(<HeroBackground />);
    expect(getByTestId('faulty-terminal')).toBeInTheDocument();
  });

  it('renders FaultyTerminal when background type is faultyTerminal', () => {
    const { getByTestId } = render(
      <HeroBackground background={{ type: 'faultyTerminal' }} />
    );
    expect(getByTestId('faulty-terminal')).toBeInTheDocument();
  });

  it('renders FaultyTerminal when background type is not set', () => {
    const { getByTestId } = render(<HeroBackground background={{ overlay: 'none' }} />);
    expect(getByTestId('faulty-terminal')).toBeInTheDocument();
  });

  it('renders a dark overlay when overlay is "dark"', () => {
    const { container } = render(
      <HeroBackground background={{ overlay: 'dark', type: 'faultyTerminal' }} />
    );
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('bg-black/50');
  });

  it('renders a darker overlay when overlay is "darker"', () => {
    const { container } = render(
      <HeroBackground background={{ overlay: 'darker', type: 'faultyTerminal' }} />
    );
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('bg-black/80');
  });

  it('does not render overlay when overlay is "none"', () => {
    const { container } = render(
      <HeroBackground background={{ overlay: 'none', type: 'faultyTerminal' }} />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('renders MediaRenderer for image type with an image asset', () => {
    const { getByTestId } = render(
      <HeroBackground
        background={{
          type: 'image',
          image: { asset: { _ref: 'image-abc-123' } },
        }}
      />
    );
    const renderer = getByTestId('media-renderer');
    expect(renderer).toBeInTheDocument();
    expect(renderer).toHaveAttribute('data-media-type', 'image');
  });

  it('renders MediaRenderer for video type with a videoUrl', () => {
    const { getByTestId } = render(
      <HeroBackground
        background={{
          type: 'video',
          videoUrl: 'https://example.com/bg.mp4',
        }}
      />
    );
    const renderer = getByTestId('media-renderer');
    expect(renderer).toBeInTheDocument();
    expect(renderer).toHaveAttribute('data-media-type', 'video');
  });

  it('returns null when image type has no image asset', () => {
    const { container } = render(
      <HeroBackground background={{ type: 'image' }} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null when video type has no videoUrl', () => {
    const { container } = render(
      <HeroBackground background={{ type: 'video' }} />
    );
    expect(container.firstChild).toBeNull();
  });
});
