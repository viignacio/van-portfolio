import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'technologyStack',
  title: 'Technology Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title for the technology stack section (e.g., "Tech Stack", "Technologies", "Skills")',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Technology Name',
              type: 'string',
              description: 'Name of the technology (e.g., "React", "Node.js", "TypeScript")',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              description: 'Category to group technologies (e.g., "Frontend", "Backend", "Database", "DevOps")',
              options: {
                list: [
                  { title: 'Frontend', value: 'frontend' },
                  { title: 'Backend', value: 'backend' },
                  { title: 'Database', value: 'database' },
                  { title: 'DevOps', value: 'devops' },
                  { title: 'Testing', value: 'testing' },
                  { title: 'Tools', value: 'tools' },
                  { title: 'Other', value: 'other' },
                ],
              },
            }),
            defineField({
              name: 'proficiency',
              title: 'Proficiency Level',
              type: 'string',
              description: 'Your proficiency level with this technology',
              options: {
                list: [
                  { title: 'Beginner', value: 'beginner' },
                  { title: 'Intermediate', value: 'intermediate' },
                  { title: 'Advanced', value: 'advanced' },
                  { title: 'Expert', value: 'expert' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category',
              media: 'name',
            },
            prepare(selection) {
              const { title, subtitle, media } = selection;
              return {
                title: title,
                subtitle: `${subtitle} • ${media}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).custom((technologies) => {
        if (!Array.isArray(technologies)) return true;
        const names = (technologies as { name?: string }[]).map((t) => t.name?.toLowerCase().trim()).filter(Boolean);
        const duplicates = names.filter((name, i) => names.indexOf(name) !== i);
        if (duplicates.length > 0) {
          return `Duplicate technologies found: ${[...new Set(duplicates)].join(', ')}`;
        }
        return true;
      }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'technologies',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      const techCount = subtitle?.length || 0;
      return {
        title: title,
        subtitle: `${techCount} ${techCount === 1 ? 'technology' : 'technologies'}`,
      };
    },
  },
});
