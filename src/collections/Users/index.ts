import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { adminOnly, adminOnlyField, isAdminOrEditor, isAdminUser } from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => isAdminOrEditor(user),
    create: adminOnly,
    delete: adminOnly,
    read: authenticated,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    cookies: {
      // Force Secure on prod so the auth cookie is never sent over plain HTTP.
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data

        const existing = await req.payload.count({
          collection: 'users',
          req,
        })

        // First account on a fresh DB must be admin (create-first-user bypasses access).
        if (existing.totalDocs === 0) {
          data.roles = ['admin']
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      saveToJWT: true,
      access: {
        // Allow first-user bootstrap (no req.user yet); afterwards only admins assign roles.
        create: ({ req: { user } }) => !user || isAdminUser(user),
        update: adminOnlyField,
      },
      admin: {
        description: 'Admins manage users and seed. Editors manage content.',
      },
    },
  ],
  timestamps: true,
}
