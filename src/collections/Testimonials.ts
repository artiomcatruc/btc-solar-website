import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { adminOrEditor } from '../access/roles'

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: anyone,
    update: adminOrEditor,
  },
  admin: {
    defaultColumns: ['name', '_order', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. Role, City',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional — initials fallback shown when empty.',
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
