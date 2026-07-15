'use client'

import { buildPostsHref } from '@/utilities/postsQuery'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

export type FilterOption = {
  label: string
  value: string
}

type Props = {
  categories: FilterOption[]
  tags: FilterOption[]
  activeCategory?: string
  activeTag?: string
  activeQuery?: string
}

const FieldLabel: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({
  htmlFor,
  children,
}) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-graphite-500"
  >
    {children}
  </label>
)

const selectClassName = cn(
  'form-input w-full appearance-none rounded-xl border border-graphite-200 bg-white px-4 py-3 pr-10',
  'text-sm font-medium text-graphite-900 outline-none transition-shadow',
  'bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat',
  "bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%23666666%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')]",
)

export const PostsFilterBar: React.FC<Props> = ({
  categories,
  tags,
  activeCategory,
  activeTag,
  activeQuery = '',
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState(activeQuery)

  useEffect(() => {
    setQuery(activeQuery)
  }, [activeQuery])

  const navigate = (next: { category?: string; tag?: string; q?: string }) => {
    startTransition(() => {
      router.push(
        buildPostsHref({
          category: next.category,
          tag: next.tag,
          q: next.q,
        }),
      )
    })
  }

  useEffect(() => {
    const trimmed = query.trim()
    const active = (activeQuery || '').trim()
    if (trimmed === active) return

    const timer = window.setTimeout(() => {
      navigate({
        category: activeCategory,
        tag: activeTag,
        q: trimmed || undefined,
      })
    }, 350)

    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce only on query text
  }, [query])

  return (
    <div
      className={cn(
        'fade-in-visible rounded-3xl border border-graphite-100 bg-white p-6 shadow-sm sm:p-8',
        isPending && 'opacity-80',
      )}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <FieldLabel htmlFor="posts-search">Search</FieldLabel>
          <input
            id="posts-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title…"
            className="form-input w-full rounded-xl border border-graphite-200 bg-white px-4 py-3 text-sm text-graphite-900 outline-none"
          />
        </div>

        <div>
          <FieldLabel htmlFor="posts-category">Category</FieldLabel>
          <select
            id="posts-category"
            className={selectClassName}
            value={activeCategory || ''}
            onChange={(event) =>
              navigate({
                category: event.target.value || undefined,
                tag: activeTag,
                q: query.trim() || undefined,
              })
            }
          >
            <option value="">All categories</option>
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel htmlFor="posts-tag">Tag</FieldLabel>
          <select
            id="posts-tag"
            className={selectClassName}
            value={activeTag || ''}
            onChange={(event) =>
              navigate({
                category: activeCategory,
                tag: event.target.value || undefined,
                q: query.trim() || undefined,
              })
            }
          >
            <option value="">All tags</option>
            {tags.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
