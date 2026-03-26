export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Footer Title',
      description: 'Give this footer a descriptive name (e.g., "Main Footer", "Homepage Footer")',
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
      description: 'Optional logo displayed in the footer brand area (PNG or SVG)'
    },
    {
      name: 'contentText',
      title: 'Brand Content Text',
      type: 'text',
      rows: 4,
      description: 'Short description or tagline shown below the logo in the footer'
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { 
          name: 'email', 
          title: 'Email Address', 
          type: 'string',
          validation: (Rule: any) => Rule.email()
        },
        { 
          name: 'phone', 
          title: 'Phone Number', 
          type: 'string' 
        },
        { 
          name: 'location', 
          title: 'Location', 
          type: 'string' 
        }
      ]
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' }
      ]
    },
    { 
      name: 'copyright', 
      title: 'Copyright Information', 
      type: 'string',
      description: 'e.g., "© 2025 Van Ian Ignacio. All rights reserved."'
    }
  ],
  preview: {
    select: {
      title: 'title',
      email: 'contactInfo.email'
    },
    prepare({ title, email }: any) {
      return {
        title: title || 'Untitled Footer',
        subtitle: `Contact: ${email || 'No email'}`
      };
    }
  }
}; 