export default {
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    {
      name: 'contentItems',
      title: 'Content Items',
      type: 'array',
      of: [
        {
          name: 'richText',
          title: 'Rich Text',
          type: 'object',
          fields: [
            { name: 'content', title: 'Content', type: 'blockContent' }
          ]
        },
        {
          name: 'mediaBlock',
          title: 'Media Block',
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'videoUrl', title: 'Video URL', type: 'url', description: 'URL for YouTube/Vimeo or direct video link' },
            { name: 'caption', title: 'Caption', type: 'string' }
          ]
        },
        {
          name: 'galleryBlock',
          title: 'Gallery Block',
          type: 'object',
          fields: [
            {
              name: 'items',
              title: 'Gallery Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                    { name: 'caption', title: 'Caption', type: 'string' }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'ctaBlock',
          title: 'CTA Block',
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            { name: 'url', title: 'Button URL', type: 'string' }
          ]
        }
      ]
    }
  ]
};
