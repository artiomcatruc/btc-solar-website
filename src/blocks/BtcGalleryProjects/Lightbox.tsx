'use client'

import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useCallback, useEffect } from 'react'

type LightboxState = {
  imageUrl: string
  imageAlt: string
  title: string
  location?: string | null
} | null

type Props = {
  state: LightboxState
  onClose: () => void
}

export const GalleryLightbox: React.FC<Props> = ({ state, onClose }) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!state) return undefined

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [state, handleKeyDown])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-graphite-950/95 p-4 transition-opacity',
        state ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-white transition-colors hover:text-solar-400"
        aria-label="Close lightbox"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {state ? (
        <div
          className="max-h-[90vh] w-full max-w-5xl text-center"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative mx-auto mb-4 aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl">
            <Image
              alt={state.imageAlt}
              className="object-contain"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              src={state.imageUrl}
              unoptimized
            />
          </div>
          <h3 className="mb-1 text-xl font-bold text-white">{state.title}</h3>
          {state.location ? <p className="text-graphite-400">{state.location}</p> : null}
        </div>
      ) : null}
    </div>
  )
}

export type { LightboxState }
