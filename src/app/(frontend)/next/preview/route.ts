import type { PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'
import { isSafePreviewPath } from '@/utilities/isSafePreviewPath'
import { verifyPreviewSignature } from '@/utilities/previewSignature'

export type PreviewSearchParams = {
  path: string
  exp: string
  sig: string
}

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const exp = searchParams.get('exp')
  const sig = searchParams.get('sig')

  if (!path || !exp || !sig) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (!isSafePreviewPath(path)) {
    return new Response('This endpoint can only be used for relative previews', { status: 400 })
  }

  if (!verifyPreviewSignature(path, exp, sig)) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()

  redirect(path)
}
