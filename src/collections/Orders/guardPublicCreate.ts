import type { CollectionBeforeValidateHook } from 'payload'

import { assertPublicMutationAllowed } from '@/utilities/spamProtection'

/** Rate limit + honeypot + optional Turnstile for public checkout creates. */
export const guardPublicCreate: CollectionBeforeValidateHook = async ({
  operation,
  req,
}) => {
  if (operation !== 'create') return
  // Staff creating orders from admin skip the public bot gates.
  if (req.user) return

  await assertPublicMutationAllowed(req, 'orders')
}
