const HONEYPOT_HEADER = 'x-honeypot'
const TURNSTILE_HEADER = 'x-turnstile-token'

/** Browser-safe headers for public POST /api/orders and /api/form-submissions. */
export const publicSubmitHeaders = (opts: {
  honeypot: string
  turnstileToken?: string | null
}): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    [HONEYPOT_HEADER]: opts.honeypot,
  }

  if (opts.turnstileToken) {
    headers[TURNSTILE_HEADER] = opts.turnstileToken
  }

  return headers
}
