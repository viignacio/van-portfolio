import { describe, it, expect, vi } from 'vitest';
import { urlFor } from '../image';
import { createImageUrlBuilder } from '@sanity/image-url';

// Mock @sanity/image-url
vi.mock('@sanity/image-url', () => ({
  createImageUrlBuilder: vi.fn(),
}));

// Mock sanityClient
vi.mock('../client', () => ({
  sanityClient: {
    projectId: 'test-project',
    dataset: 'test-dataset',
  },
}));

describe('urlFor', () => {
  it('calls createImageUrlBuilder with sanityClient', () => {
    const mockBuilder = {
      image: vi.fn().mockReturnThis(),
      url: vi.fn().mockReturnValue('https://cdn.sanity.io/images/test-project/test-dataset/image.jpg'),
    };
    (createImageUrlBuilder as any).mockReturnValue(mockBuilder);

    const source = { _type: 'image', asset: { _ref: 'image-123' } };
    const result = urlFor(source);

    expect(createImageUrlBuilder).toHaveBeenCalled();
    expect(mockBuilder.image).toHaveBeenCalledWith(source);
    expect(result).toBe(mockBuilder);
  });
});
