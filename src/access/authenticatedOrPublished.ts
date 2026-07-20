import type { Access } from 'payload'

import { isAdminOrEditor } from './roles'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (isAdminOrEditor(user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
