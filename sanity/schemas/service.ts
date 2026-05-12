import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'icon', type: 'string', title: 'Icon Name (Lucide)' }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Features/Includes' }),
    defineField({ name: 'targetAudience', type: 'array', of: [{ type: 'string' }], title: 'Target Audience' }),
    defineField({ name: 'pricing', type: 'string', title: 'Pricing Info' }),
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
