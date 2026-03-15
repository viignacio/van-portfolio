export default {
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Navbar Title',
      description: 'Give this navbar a descriptive name (e.g., "Main Navigation", "Homepage Nav")',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/png,image/svg+xml'
      },
      description: 'Optional logo image for the navbar (PNG or SVG)'
    },
    {
      name: 'links',
      title: 'Navigation Links',
      description: 'Add navigation menu items. Each link should have a label and href.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'Use /#section for smooth scrolling to sections, or full URLs for external links',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'isExternal',
              title: 'External Link',
              type: 'boolean',
              description: 'Check if this link opens in a new tab',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'label',
              href: 'href',
              isExternal: 'isExternal'
            },
            prepare({ title, href, isExternal }: any) {
              return {
                title: title,
                subtitle: `${href}${isExternal ? ' (external)' : ''}`
              };
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.max(10) // No minimum required
    }
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links'
    },
    prepare({ title, links }: any) {
      return {
        title: title || 'Untitled Navbar',
        subtitle: `${links?.length || 0} links`
      };
    }
  }
}; 