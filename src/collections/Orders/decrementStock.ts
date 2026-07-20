import { sql } from '@payloadcms/db-postgres'
import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

import type { Product } from '@/payload-types'

type OrderItem = {
  product?: number | Product | null
  quantity?: number | null
  title?: string | null
}

type AtomicReserveRow = {
  id: number
  quantity: string | number
  title?: string | null
}

/**
 * Atomically reserve stock before the order row is inserted (same DB transaction).
 * `UPDATE … WHERE quantity >= $qty RETURNING` closes the TOCTOU race between
 * prepareOrder's soft check and two concurrent checkouts.
 */
export const reserveStock: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
  context,
}) => {
  if (operation !== 'create' || context?.skipStockDecrement) return data

  const items = (Array.isArray(data.items) ? data.items : []) as OrderItem[]

  for (const item of items) {
    const productId =
      typeof item.product === 'number'
        ? item.product
        : typeof item.product === 'object' && item.product
          ? item.product.id
          : null
    const orderedQty = Math.floor(Number(item.quantity))

    if (!productId || !Number.isFinite(orderedQty) || orderedQty < 1) {
      throw new APIError('Invalid order item for stock reservation.', 400)
    }

    const result = await req.payload.db.drizzle.execute(sql`
      UPDATE products
      SET
        quantity = quantity - ${orderedQty},
        sold_out = CASE WHEN quantity - ${orderedQty} <= 0 THEN true ELSE sold_out END,
        updated_at = now()
      WHERE id = ${productId}
        AND COALESCE(sold_out, false) = false
        AND quantity >= ${orderedQty}
      RETURNING id, quantity
    `)

    const rows = (result as unknown as { rows?: AtomicReserveRow[] }).rows ?? []

    if (rows.length === 0) {
      const label = item.title?.trim() || `product #${productId}`
      throw new APIError(`Not enough stock for “${label}”.`, 409)
    }
  }

  return data
}
