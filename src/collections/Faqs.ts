import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const FAQ_SCOPES = ['any', 'home', 'about', 'gallery', 'contact'] as const

export const Faqs: CollectionConfig<'faqs'> = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['question', 'pageScope', 'sort'],
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'pageScope',
      type: 'select',
      required: true,
      defaultValue: 'any',
      options: FAQ_SCOPES.map((value) => ({
        label:
          value === 'any'
            ? 'Any page (show when relation or filter allows)'
            : value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),
      admin: {
        description:
          'Filter in the FAQ block admin when building pages; docs with "any" are always eligible.',
      },
    },
    {
      name: 'sort',
      type: 'number',
      admin: { position: 'sidebar' },
      defaultValue: 0,
    },
  ],
}
