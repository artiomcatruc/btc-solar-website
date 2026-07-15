import type { Where } from 'payload'

export type PostsFilterParams = {
  category?: string
  tag?: string
  q?: string
  page?: number
}

export const POSTS_PER_PAGE = 12

export const buildPostsWhere = ({ category, tag, q }: PostsFilterParams): Where | undefined => {
  const and: Where[] = []

  if (category) {
    and.push({
      'categories.slug': {
        equals: category,
      },
    })
  }

  if (tag) {
    and.push({
      'tags.slug': {
        equals: tag,
      },
    })
  }

  if (q?.trim()) {
    and.push({
      title: {
        contains: q.trim(),
      },
    })
  }

  if (and.length === 0) return undefined
  return { and }
}

export const buildPostsHref = ({ category, tag, q, page }: PostsFilterParams): string => {
  const params = new URLSearchParams()

  if (category) params.set('category', category)
  if (tag) params.set('tag', tag)
  if (q?.trim()) params.set('q', q.trim())
  if (page && page > 1) params.set('page', String(page))

  const query = params.toString()
  return query ? `/posts?${query}` : '/posts'
}
