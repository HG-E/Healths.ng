import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'author', type: 'string', title: 'Author Name', validation: (R) => R.required() }),
    defineField({ name: 'role', type: 'string', title: 'Role/Title', validation: (R) => R.required() }),
    defineField({ name: 'organization', type: 'string', title: 'Organization' }),
    defineField({ name: 'content', type: 'text', title: 'Testimonial', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'image', type: 'image', title: 'Author Photo', options: { hotspot: true } }),
    defineField({ name: 'rating', type: 'number', title: 'Rating (1-5)', validation: (R) => R.min(1).max(5) }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'organization', media: 'image' },
  },
})
