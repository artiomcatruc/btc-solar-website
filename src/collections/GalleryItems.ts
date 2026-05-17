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
    defaultColumns: ['caption', 'category', 'location', 'updatedAt'],
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
      name: 'caption',
      type: 'text',
      required: true,
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
      name: 'location',
      type: 'text',
      admin: {
        description: 'Town or label shown in overlays',
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
