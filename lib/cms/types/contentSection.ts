export interface ContentSection {
  contentItems: ContentItem[];
}

export type ContentItem = 
  | ContentBlockItem 
  | QuoteSectionItem
  | TechSelectionSectionItem
  | MediaItem 
  | GalleryItem 
  | CTAItem;

export interface ContentBlockItem {
  _type: 'contentBlock';
  heading?: string;
  body: any;
}

export interface QuoteSectionItem {
  _type: 'quoteSection';
  text: string;
  author?: string;
  role?: string;
  variant?: 'centered' | 'left';
}

export interface TechSelectionSectionItem {
  _type: 'techSelectionSection';
  title?: string;
  items: Array<{
    tool: string;
    reasoning: string;
    icon?: string;
  }>;
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
