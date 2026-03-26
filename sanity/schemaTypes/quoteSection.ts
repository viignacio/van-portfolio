import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Author Role/Company',
      type: 'string',
    }),
    defineField({
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Centered Impact', value: 'centered' },
          { title: 'Editorial Left', value: 'left' },
        ],
      },
      initialValue: 'centered',
    }),
  ],
});
