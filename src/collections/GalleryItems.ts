import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const GALLERY_CATEGORIES = ['residential', 'commercial', 'other'] as const

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
      admin: { description: 'Project title shown in the overlay. Falls back to caption when empty.' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Legacy title field and lightbox subtitle support.' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'residential',
      options: GALLERY_CATEGORIES.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),
    },
    {
      name: 'badgeLabel',
      type: 'text',
      admin: {
        description: 'Optional pill label override, e.g. Detail or Behind the Scenes.',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Town or label shown in overlays.',
      },
    },
    {
      name: 'systemSize',
      type: 'text',
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
