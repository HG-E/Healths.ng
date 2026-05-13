import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: { owner: 'HG-E', name: 'Healths.ng' },
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Healths.ng CMS' },
  },

  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'content/articles/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        publishedAt: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        author: fields.text({ label: 'Author Name' }),
        authorRole: fields.text({ label: 'Author Role (e.g. MBBS, FMCP, MPH)' }),
        authorBio: fields.text({ label: 'Author Bio', multiline: true }),
        authorAvatar: fields.image({
          label: 'Author Photo',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Health Tips', value: 'health-tips' },
            { label: 'Professional Growth', value: 'professional-growth' },
            { label: 'Digital Skills', value: 'digital-skills' },
            { label: 'Research', value: 'research' },
            { label: 'Community Health', value: 'community-health' },
          ],
          defaultValue: 'health-tips',
        }),
        featured: fields.checkbox({ label: 'Feature on Homepage' }),
        seoTitle: fields.text({ label: 'SEO Title (leave blank to use article title)' }),
        seoDescription: fields.text({ label: 'SEO Description (leave blank to use excerpt)' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (props) => props.fields.value.value ?? 'Tag' }
        ),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
})
