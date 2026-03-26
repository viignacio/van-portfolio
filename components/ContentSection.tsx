'use client';

import { PortableText } from 'next-sanity';
import MediaRenderer from '@/components/MediaRenderer';
import QuoteSection from '@/components/QuoteSection';
import TechSelectionSection from '@/components/TechSelectionSection';
import type { ContentSection as ContentSectionType, ContentItem } from '@/lib/cms/types/contentSection';

interface ContentSectionProps {
  data: ContentSectionType;
}

const components = {
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-bold text-text-primary mt-12 mb-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-text-primary mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-text-secondary leading-relaxed mb-6 text-lg">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 my-8 italic text-text-primary text-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-6 space-y-2 text-text-secondary text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-6 space-y-2 text-text-secondary text-lg">{children}</ol>,
  },
};

export default function ContentSection({ data }: ContentSectionProps) {
  if (!data?.contentItems) return null;

  return (
    <div className="flex flex-col gap-0 max-w-4xl mx-auto px-4">
      {data.contentItems.map((item, index) => {
        switch (item._type) {
          case 'contentBlock':
            return (
              <div key={index} className="prose prose-invert max-w-none py-12">
                {item.heading && (
                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">{item.heading}</h2>
                )}
                <PortableText value={item.body} components={components} />
              </div>
            );
          
          case 'mediaBlock':
            return (
              <figure key={index} className="py-8">
                <div className="relative rounded-2xl overflow-hidden bg-base-800 aspect-video group">
                  {item.image ? (
                    <MediaRenderer
                      media={{ mediaType: 'image', image: item.image }}
                      alt={item.caption || 'Project illustration'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : item.videoUrl ? (
                    <div className="aspect-video w-full h-full">
                       {/* Basic Video Placeholder / Iframe for now */}
                       <iframe 
                        src={item.videoUrl} 
                        className="w-full h-full" 
                        allowFullScreen 
                       />
                    </div>
                  ) : null}
                </div>
                {item.caption && (
                  <figcaption className="mt-4 text-center text-sm text-text-muted font-medium italic">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'galleryBlock':
            return (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                {item.items?.map((galleryItem, gIndex) => (
                  <div key={gIndex} className="relative rounded-xl overflow-hidden bg-base-800 aspect-square group">
                    {galleryItem.image && (
                      <MediaRenderer
                        media={{ mediaType: 'image', image: galleryItem.image }}
                        alt={galleryItem.caption || `Gallery item ${gIndex}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                ))}
              </div>
            );

          case 'ctaBlock':
            return (
              <div key={index} className="flex justify-center py-8">
                <a
                  href={item.url}
                  className="px-8 py-4 bg-accent text-base-950 rounded-xl font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] transition-all duration-300"
                >
                  {item.text}
                </a>
              </div>
            );

          case 'quoteSection':
            return (
              <QuoteSection key={index} data={item} />
            );

          case 'techSelectionSection':
            return (
              <TechSelectionSection key={index} data={item} />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
