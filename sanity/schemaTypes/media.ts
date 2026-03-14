export default {
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    {
      name: 'mediaType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }: any) => parent?.mediaType !== 'image',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ parent }: any) => parent?.mediaType !== 'video',
    },
  ],
};
