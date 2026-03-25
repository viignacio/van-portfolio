export default {
  name: 'layoutBlock',
  title: 'Layout Block',
  type: 'object',
  fields: [
    {
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'About Section', value: 'about' },
          { title: 'Skills Section', value: 'skills' },
          { title: 'Projects Section', value: 'projects' },
          { title: 'Certifications Section', value: 'certifications' },
          { title: 'Commendations Section', value: 'commendations' },
          { title: 'Contact Section', value: 'contact' },
          { title: 'Content Section', value: 'content' }
        ]
      }
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'heroSection',
      title: 'Hero Section Content',
      type: 'heroSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'hero'
    },
    {
      name: 'aboutSection',
      title: 'About Section Content',
      type: 'aboutSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'about'
    },
    {
      name: 'skillsSection',
      title: 'Skills Section Content',
      type: 'skillsSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'skills'
    },
    {
      name: 'projectsSection',
      title: 'Projects Section Content',
      type: 'projectsSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'projects'
    },
    {
      name: 'certificationsSection',
      title: 'Certifications Section Content',
      type: 'certificationsSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'certifications'
    },
    {
      name: 'commendationsSection',
      title: 'Commendations Section Content',
      type: 'commendationsSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'commendations'
    },
    {
      name: 'contactSection',
      title: 'Contact Section Content',
      type: 'contactSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'contact'
    },
    {
      name: 'contentSection',
      title: 'Content Section Content',
      type: 'contentSection',
      hidden: ({ parent }: any) => parent?.blockType !== 'content'
    }
  ],
  preview: {
    select: {
      title: 'blockType'
    },
    prepare({ title }: any) {
      return {
        title: title ? `${title.charAt(0).toUpperCase() + title.slice(1)} Section` : 'Untitled Block'
      };
    }
  }
};
