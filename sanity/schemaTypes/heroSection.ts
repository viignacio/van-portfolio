export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Fullscreen (Home)', value: 'fullscreen' },
          { title: 'Compact (Archive/Subpages)', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'fullscreen',
    },
    {
      name: 'topline',
      title: 'Topline (Small Label)',
      type: 'string',
      description: 'Small text appearing above the main headline'
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string'
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string'
    },
    {
      name: 'bodyText',
      title: 'Body Text',
      type: 'string'
    },
    {
      name: 'cta1',
      title: 'CTA 1',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Download Resume'
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url'
        },
        {
          name: 'isExternal',
          title: 'External Link',
          description: 'Check if this opens in a new tab',
          type: 'boolean',
          initialValue: true
        }
      ],
      preview: {
        select: {
          title: 'text',
          url: 'url'
        },
        prepare({ title, url }: any) {
          return {
            title: title || 'Download Resume',
            subtitle: url || 'No URL set'
          };
        }
      }
    },
    {
      name: 'cta2',
      title: 'CTA 2',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get in Touch'
        },
        {
          name: 'email',
          title: 'Contact Email',
          description: 'Email address for the contact button (opens default email app)',
          type: 'string',
          validation: (Rule: any) => Rule.email('Please enter a valid email address')
        }
      ],
      preview: {
        select: {
          title: 'text',
          email: 'email'
        },
        prepare({ title, email }: any) {
          return {
            title: title || 'Contact',
            subtitle: email || 'No email set'
          };
        }
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'background',
      title: 'Hero Background',
      description: 'Choose what appears behind the hero content',
      type: 'object',
      fields: [
        {
          name: 'overlay',
          title: 'Overlay',
          description: 'Darkens the background to improve text readability',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Dark (50%)', value: 'dark' },
              { title: 'Darker (80%)', value: 'darker' },
            ],
            layout: 'radio',
          },
          initialValue: 'none',
        },
        {
          name: 'type',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'Faulty Terminal (WebGL animation)', value: 'faultyTerminal' },
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
            ],
            layout: 'radio',
          },
          initialValue: 'faultyTerminal',
        },
        {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }: any) => parent?.type !== 'image',
        },
        {
          name: 'video',
          title: 'Background Video',
          type: 'file',
          options: { accept: 'video/*' },
          hidden: ({ parent }: any) => parent?.type !== 'video',
        },
      ],
    }
  ],
  preview: {
    select: {
      headline: 'headline',
      subheading: 'subheading'
    },
    prepare({ headline, subheading }: any) {
      return {
        title: headline || 'No headline',
        subtitle: subheading || 'No subheading'
      };
    }
  }
};
