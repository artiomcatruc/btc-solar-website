import type { PayloadRequest } from 'payload'
import { APIError } from 'payload'

const HONEYPOT_HEADER = 'x-honeypot'
const TURNSTILE_HEADER = 'x-turnstile-token'

type RateBucket = 'orders' | 'leads'

const RATE_LIMITS: Record<RateBucket, { limit: number; windowMs: number }> = {
  orders: { limit: 5, windowMs: 15 * 60 * 1000 },
  leads: { limit: 8, windowMs: 15 * 60 * 1000 },
}

const hits = new Map<string, number[]>()

export const getClientIp = (req: PayloadRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }

  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

const assertRateLimit = (key: string, limit: number, windowMs: number): void => {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((ts) => now - ts < windowMs)

  if (recent.length >= limit) {
    throw new APIError('Too many requests. Please try again later.', 429)
  }

  recent.push(now)
  hits.set(key, recent)

  // Opportunistic cleanup so the map does not grow forever in long-lived processes.
  if (hits.size > 5_000) {
    for (const [entryKey, timestamps] of hits) {
      const alive = timestamps.filter((ts) => now - ts < windowMs)
      if (alive.length === 0) hits.delete(entryKey)
      else hits.set(entryKey, alive)
    }
  }
}

const verifyTurnstile = async (token: string | null, ip: string): Promise<void> => {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return

  if (!token) {
    throw new APIError('Captcha required.', 400)
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })
  if (ip && ip !== 'unknown') body.set('remoteip', ip)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  })

  const result = (await response.json()) as { success?: boolean }
  if (!result.success) {
    throw new APIError('Captcha verification failed.', 400)
  }
}

/**
 * Shared bot/spam gates for public create endpoints (orders + form-submissions).
 * Clients send `x-honeypot` (must be empty) and optionally `x-turnstile-token`.
 */
export const assertPublicMutationAllowed = async (
  req: PayloadRequest,
  bucket: RateBucket,
): Promise<void> => {
  const ip = getClientIp(req)
  const { limit, windowMs } = RATE_LIMITS[bucket]
  assertRateLimit(`${bucket}:${ip}`, limit, windowMs)

  const honeypot = req.headers.get(HONEYPOT_HEADER) ?? ''
  if (honeypot.trim()) {
    // Generic message — do not tip off bots.
    throw new APIError('Unable to submit form.', 400)
  }

  await verifyTurnstile(req.headers.get(TURNSTILE_HEADER), ip)
}
