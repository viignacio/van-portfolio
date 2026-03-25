export interface ContentSection {
  contentItems: ContentItem[];
}

export type ContentItem = 
  | RichTextItem 
  | MediaItem 
  | GalleryItem 
  | CTAItem;

export interface RichTextItem {
  _type: 'richText';
  content: any; // Using any for standard block content for now
}

export interface MediaItem {
  _type: 'mediaBlock';
  image?: { asset?: { _ref?: string }; hotspot?: unknown; crop?: unknown };
  videoUrl?: string;
  caption?: string;
}

export interface GalleryItem {
  _type: 'galleryBlock';
  items: Array<{
    image?: { asset?: { _ref?: string }; hotspot?: unknown; crop?: unknown };
    caption?: string;
  }>;
}

export interface CTAItem {
  _type: 'ctaBlock';
  text: string;
  url: string;
}
