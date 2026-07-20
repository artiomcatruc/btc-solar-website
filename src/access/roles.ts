import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export type UserRole = 'admin' | 'editor'

export const isAdminUser = (user: User | null | undefined): boolean => {
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminOrEditor = (user: User | null | undefined): boolean => {
  return Boolean(user?.roles?.some((role) => role === 'admin' || role === 'editor'))
}

export const adminOnly: Access = ({ req: { user } }) => isAdminUser(user)

export const adminOrEditor: Access = ({ req: { user } }) => isAdminOrEditor(user)

export const adminOnlyField: FieldAccess = ({ req: { user } }) => isAdminUser(user)
