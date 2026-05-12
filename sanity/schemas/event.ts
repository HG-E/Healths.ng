import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 4 }),
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true } }),
    defineField({ name: 'date', type: 'datetime', title: 'Start Date & Time', validation: (R) => R.required() }),
    defineField({ name: 'endDate', type: 'datetime', title: 'End Date & Time' }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'isOnline', type: 'boolean', title: 'Online Event', initialValue: false }),
    defineField({ name: 'registrationUrl', type: 'url', title: 'Registration URL' }),
    defineField({ name: 'price', type: 'number', title: 'Price (₦)' }),
    defineField({ name: 'capacity', type: 'number', title: 'Capacity' }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: { list: ['upcoming', 'ongoing', 'completed', 'cancelled'] },
      initialValue: 'upcoming',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'coverImage' },
  },
})
