import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { article } from './schemas/article'
import { author } from './schemas/author'
import { category } from './schemas/category'
import { teamMember } from './schemas/teamMember'
import { testimonial } from './schemas/testimonial'
import { event } from './schemas/event'
import { successStory } from './schemas/successStory'
import { service } from './schemas/service'

export default defineConfig({
  name: 'healths-ng',
  title: 'Healths.ng CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: {
    types: [article, author, category, teamMember, testimonial, event, successStory, service],
  },
})
