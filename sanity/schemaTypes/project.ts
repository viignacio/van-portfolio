export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { 
      name: 'role', 
      title: 'Your Role / Contribution', 
      type: 'string', 
      description: 'E.g., QA Consultant, Full-Stack Lead, Built from Scratch',
      validation: (Rule: any) => Rule.required()
    },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { 
      name: 'description', 
      title: 'Description', 
      type: 'text',
      description: 'Main project description. Max 350 characters recommended to ensure most text is visible in the 3:4 archive cards.',
      validation: (Rule: any) => Rule.max(350).warning('Longer descriptions will be clamped to fit the 3:4 card aspect ratio.')
    },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { 
      name: 'techStack', 
      title: 'Tech Stack', 
      type: 'array', 
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.max(5)
    },
    { name: 'challenges', title: 'Key Challenges', type: 'array', of: [{ type: 'string' }] },
    { name: 'demoUrl', title: 'Demo URL', type: 'url' },
    { name: 'demoCta', title: 'Demo Button Text', type: 'string', description: 'Text for the demo button (e.g. Live Demo, View Site, etc.)' },
    { name: 'repoUrl', title: 'Repository URL', type: 'url' },
    {
      name: 'layoutBlocks',
      title: 'Layout Blocks',
      type: 'array',
      of: [{ type: 'layoutBlock' }],
      description: 'Additional layout sections for the individual project page'
    },
  ]
};