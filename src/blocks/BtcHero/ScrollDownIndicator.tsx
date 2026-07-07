'use client'

import React from 'react'

export const ScrollDownIndicator: React.FC = () => {
  const handleClick = () => {
    const hero = document.querySelector('[data-btc-hero]')
    const next = hero?.nextElementSibling

    if (next instanceof HTMLElement) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce cursor-pointer text-white transition-opacity hover:opacity-80"
      aria-label="Scroll to next section"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  )
}
