import { sql } from '@payloadcms/db-postgres'
import type { CollectionBeforeChangeHook } from 'payload'

import type { Product } from '@/payload-types'

type OrderItem = {
  product?: number | Product | null
  quantity?: number | null
}

/**
 * When an order transitions to `cancelled`, put reserved qty back.
 * Idempotent via originalDoc.status check (only runs on the transition).
 */
export const restoreStock: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
  context,
}) => {
  if (operation !== 'update' || context?.skipStockRestore) return data
  if (data?.status !== 'cancelled') return data
  if (originalDoc?.status === 'cancelled') return data

  const items = (Array.isArray(originalDoc?.items) ? originalDoc.items : []) as OrderItem[]

  for (const item of items) {
    const productId =
      typeof item.product === 'number'
        ? item.product
        : typeof item.product === 'object' && item.product
          ? item.product.id
          : null
    const orderedQty = Math.floor(Number(item.quantity))

    if (!productId || !Number.isFinite(orderedQty) || orderedQty < 1) continue

    await req.payload.db.drizzle.execute(sql`
      UPDATE products
      SET
        quantity = quantity + ${orderedQty},
        sold_out = CASE WHEN quantity + ${orderedQty} > 0 THEN false ELSE sold_out END,
        updated_at = now()
      WHERE id = ${productId}
    `)
  }

  return data
}
