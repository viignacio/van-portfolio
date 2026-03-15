export default {
  name: 'commendation',
  title: 'Commendation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Internal label only — not displayed on the site (e.g., "John Doe - Acme Corp")',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'author', title: 'Author', type: 'object', fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'role', title: 'Role', type: 'string' },
      { name: 'company', title: 'Company', type: 'string' },
      { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    ] },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: any) {
      return { title: title || 'Untitled Commendation' };
    }
  }
}; 