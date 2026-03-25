export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'navbar',
      title: 'Navigation Bar',
      type: 'reference',
      to: [{ type: 'navbar' }]
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      to: [{ type: 'footer' }]
    },
    {
      name: 'archiveHeader',
      title: 'Archive Header',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'highlightedTitle', title: 'Highlighted Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 }
      ]
    },
    {
      name: 'archiveFooter',
      title: 'Archive Footer Text',
      type: 'string',
      description: 'Text shown at the bottom of the archive (e.g., "DESIGNED & BUILT WITH PASSION")'
    },
    {
      name: 'emptyStateText',
      title: 'Empty State Text',
      type: 'string',
      description: 'Text shown when no projects are found'
    },
    {
      name: 'layoutBlocks',
      title: 'Layout Blocks',
      type: 'array',
      of: [{ type: 'layoutBlock' }],
      options: {
        layout: 'list',
        sortable: true,
        reorderable: true
      }
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image'
        }
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      blocks: 'layoutBlocks'
    },
    prepare({ title, slug, blocks }: any) {
      return {
        title: title,
        subtitle: `/${slug} • ${blocks?.length || 0} sections`
      };
    }
  }
};
