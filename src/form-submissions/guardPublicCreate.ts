import type { CollectionBeforeValidateHook } from 'payload'

import { assertPublicMutationAllowed } from '@/utilities/spamProtection'

/** Rate limit + honeypot + optional Turnstile for public lead creates. */
export const guardPublicCreate: CollectionBeforeValidateHook = async ({
  operation,
  req,
}) => {
  if (operation !== 'create') return
  if (req.user) return

  await assertPublicMutationAllowed(req, 'leads')
}
