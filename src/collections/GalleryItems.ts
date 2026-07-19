import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const GalleryItems: CollectionConfig<'gallery-items'> = {
  slug: 'gallery-items',
  labels: {
    singular: 'Gallery Item',
    plural: 'Gallery Items',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'location', 'sort', 'updatedAt'],
    useAsTitle: 'caption',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: { description: 'Project title shown in the overlay. Falls back to caption when empty.' },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      admin: { description: 'Legacy title field and lightbox subtitle support.' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'Used for gallery filtering and category pills.',
      },
    },
    {
      name: 'badgeLabel',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional pill label override. Defaults to the category title.',
      },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      admin: {
        description: 'Town or label shown in overlays.',
      },
    },
    {
      name: 'systemSize',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional stat line, e.g. 15 kW System.',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Large (2x2)', value: 'large' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Large tiles span two columns on desktop.',
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
