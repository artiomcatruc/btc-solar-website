import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const SERVICE_ICONS = [
  'home',
  'building',
  'shield',
  'bolt',
  'cog',
  'chart',
] as const

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'sort', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'home',
      options: SERVICE_ICONS.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),
    },
    {
      name: 'sort',
      type: 'number',
      admin: {
        description: 'Lower sorts first.',
        position: 'sidebar',
      },
      defaultValue: 0,
    },
  ],
}
