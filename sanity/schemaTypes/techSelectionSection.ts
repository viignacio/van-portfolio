import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'techSelectionSection',
  title: 'Tech Selection Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Tech Stack & Rationale',
    }),
    defineField({
      name: 'items',
      title: 'Tools & Reasonings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'tool', title: 'Tool Name', type: 'string' },
            { name: 'reasoning', title: 'Why this tool?', type: 'text', rows: 2 },
            { name: 'icon', title: 'Icon (Optional)', type: 'string', description: 'Lucide icon name or local asset ref' },
          ],
        },
      ],
    }),
  ],
});
