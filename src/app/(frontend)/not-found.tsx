import Link from 'next/link'
import React from 'react'

const ButtonArrow = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)

export default function NotFound() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-graphite-900 px-4 py-24 text-center sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-solar-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-eco-500/10 blur-3xl" />
        <div className="hero-gradient absolute inset-0 opacity-40" />
      </div>

      <div className="fade-in-visible relative z-10 mx-auto max-w-2xl">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-eco-400" />
          Page not found
        </span>

        <p
          aria-hidden
          className="mb-6 text-[clamp(5rem,18vw,9rem)] font-bold leading-none tracking-tighter"
        >
          <span className="text-white">4</span>
          <span className="gradient-text">0</span>
          <span className="text-white">4</span>
        </p>

        <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          This page isn&apos;t collecting any sunlight
        </h1>
        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-graphite-300">
          The link may be broken, or the page may have been removed. Head back home or get in touch
          — we&apos;re happy to help.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/en"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-solar-400 px-8 py-4 font-semibold text-graphite-900 transition-colors hover:bg-solar-300 sm:w-auto"
          >
            Back to home
            <ButtonArrow />
          </Link>
          <Link
            href="/en/contact"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
