import { createHmac, timingSafeEqual } from 'crypto'

const PREVIEW_TTL_SECONDS = 60 * 60 // 1 hour

export type SignedPreviewParams = {
  path: string
  exp: string
  sig: string
}

export const signPreviewPath = (path: string): SignedPreviewParams | null => {
  const secret = process.env.PREVIEW_SECRET
  if (!secret) return null

  const exp = String(Math.floor(Date.now() / 1000) + PREVIEW_TTL_SECONDS)
  const sig = createHmac('sha256', secret).update(`${path}:${exp}`).digest('hex')

  return { path, exp, sig }
}

export const verifyPreviewSignature = (path: string, exp: string, sig: string): boolean => {
  const secret = process.env.PREVIEW_SECRET
  if (!secret || !path || !exp || !sig) return false

  const expiresAt = Number(exp)
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false
  }

  const expected = createHmac('sha256', secret).update(`${path}:${exp}`).digest('hex')

  try {
    const expectedBuf = Buffer.from(expected, 'utf8')
    const actualBuf = Buffer.from(sig, 'utf8')
    if (expectedBuf.length !== actualBuf.length) return false
    return timingSafeEqual(expectedBuf, actualBuf)
  } catch {
    return false
  }
}
