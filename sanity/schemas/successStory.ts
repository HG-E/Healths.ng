import { defineField, defineType } from 'sanity'

export const successStory = defineType({
  name: 'successStory',
  title: 'Success Story',
  type: 'document',
  fields: [
    defineField({ name: 'clientType', type: 'string', title: 'Client Type', validation: (R) => R.required() }),
    defineField({ name: 'clientName', type: 'string', title: 'Client Name (optional)' }),
    defineField({ name: 'challenge', type: 'text', title: 'Challenge', rows: 3, validation: (R) => R.required() }),
    defineField({ name: 'solution', type: 'text', title: 'Solution', rows: 3, validation: (R) => R.required() }),
    defineField({ name: 'result', type: 'text', title: 'Result', rows: 3, validation: (R) => R.required() }),
    defineField({ name: 'testimonial', type: 'text', title: 'Testimonial Quote', rows: 3 }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured', initialValue: false }),
  ],
  preview: {
    select: { title: 'clientType', subtitle: 'clientName' },
  },
})
