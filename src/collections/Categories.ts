import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

const badgeToneOptions = [
  { label: 'Solar amber', value: 'solar' },
  { label: 'Eco green', value: 'eco' },
  { label: 'Graphite neutral', value: 'graphite' },
] as const

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'badgeTone', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'badgeTone',
      type: 'select',
      defaultValue: 'eco',
      options: [...badgeToneOptions],
      admin: {
        description: 'Accent color for gallery category pills.',
        position: 'sidebar',
      },
    },
  ],
}
