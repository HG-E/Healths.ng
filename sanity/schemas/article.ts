import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt', rows: 3, validation: (R) => R.max(300) }),
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (R) => R.required() }],
        },
      ],
    }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured Article', initialValue: false }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title', validation: (R) => R.max(60) }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', rows: 2, validation: (R) => R.max(160) }),
  ],
  orderings: [
    { title: 'Published Date (newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'coverImage' },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : undefined, media }
    },
  },
})
