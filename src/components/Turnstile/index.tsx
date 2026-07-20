'use client'

import React, { useEffect, useId, useRef } from 'react'

type Props = {
  onToken: (token: string | null) => void
  className?: string
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        },
      ) => string
      remove: (widgetId: string) => void
    }
    __turnstileScriptPromise?: Promise<void>
  }
}

const loadTurnstileScript = (): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (window.__turnstileScriptPromise) return window.__turnstileScriptPromise

  window.__turnstileScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Turnstile'))
    document.head.appendChild(script)
  })

  return window.__turnstileScriptPromise
}

/**
 * Renders Cloudflare Turnstile only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 * Server verification runs only when TURNSTILE_SECRET_KEY is also set.
 */
export const Turnstile: React.FC<Props> = ({ onToken, className }) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const reactId = useId()

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    let cancelled = false

    const mount = async () => {
      try {
        await loadTurnstileScript()
        if (cancelled || !containerRef.current || !window.turnstile) return

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => onToken(token),
          'expired-callback': () => onToken(null),
          'error-callback': () => onToken(null),
        })
      } catch {
        onToken(null)
      }
    }

    void mount()

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey, onToken, reactId])

  if (!siteKey) return null

  return <div className={className} ref={containerRef} />
}
