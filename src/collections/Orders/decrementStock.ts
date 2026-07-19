import type { CollectionAfterChangeHook } from 'payload'

import type { Product } from '@/payload-types'

type OrderItem = {
  product?: number | Product | null
  quantity?: number | null
}

export const decrementStock: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
  context,
}) => {
  if (operation !== 'create' || context?.skipStockDecrement) return doc

  const items = (Array.isArray(doc.items) ? doc.items : []) as OrderItem[]

  for (const item of items) {
    const productId =
      typeof item.product === 'number'
        ? item.product
        : typeof item.product === 'object' && item.product
          ? item.product.id
          : null
    const orderedQty = Math.floor(Number(item.quantity))

    if (!productId || !Number.isFinite(orderedQty) || orderedQty < 1) continue

    const product = await req.payload.findByID({
      collection: 'products',
      id: productId,
      depth: 0,
      req,
    })

    const nextQty = Math.max(0, product.quantity - orderedQty)

    await req.payload.update({
      collection: 'products',
      id: productId,
      data: {
        quantity: nextQty,
        ...(nextQty <= 0 ? { soldOut: true } : {}),
      },
      req,
      context: { skipHooks: false },
    })
  }

  return doc
}
