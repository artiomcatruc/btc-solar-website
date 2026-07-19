import type { CollectionBeforeValidateHook } from 'payload'
import { APIError } from 'payload'

import type { Product } from '@/payload-types'

type IncomingItem = {
  product?: number | Product | null
  quantity?: number | null
  title?: string | null
  unitPrice?: number | null
  currency?: Product['currency'] | null
  lineTotal?: number | null
  id?: string | null
}

const MAX_ITEMS = 30
const MAX_QTY_PER_ITEM = 99

const productIdOf = (value: IncomingItem['product']): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'object' && value && 'id' in value) return value.id
  return null
}

export const prepareOrder: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (!data) return data

  if (operation === 'create') {
    data.status = 'new'
  }

  // Only rebuild line items on create (public checkout). Admin edits keep snapshots.
  if (operation !== 'create') return data

  const rawItems = Array.isArray(data.items) ? (data.items as IncomingItem[]) : []
  if (rawItems.length === 0) {
    throw new APIError('Cart is empty.', 400)
  }
  if (rawItems.length > MAX_ITEMS) {
    throw new APIError(`Too many line items (max ${MAX_ITEMS}).`, 400)
  }

  const prepared = []
  let total = 0
  let currency: Product['currency'] | null = null

  for (const item of rawItems) {
    const productId = productIdOf(item.product)
    const quantity = Math.floor(Number(item.quantity))

    if (!productId) {
      throw new APIError('Each order item needs a product.', 400)
    }
    if (!Number.isFinite(quantity) || quantity < 1) {
      throw new APIError('Quantity must be at least 1.', 400)
    }
    if (quantity > MAX_QTY_PER_ITEM) {
      throw new APIError(`Quantity cannot exceed ${MAX_QTY_PER_ITEM}.`, 400)
    }

    const product = await req.payload.findByID({
      collection: 'products',
      id: productId,
      depth: 0,
      req,
      overrideAccess: false,
    })

    if (product.soldOut || product.quantity <= 0) {
      throw new APIError(`“${product.title}” is sold out.`, 400)
    }
    if (quantity > product.quantity) {
      throw new APIError(`Only ${product.quantity} left for “${product.title}”.`, 400)
    }

    if (!currency) currency = product.currency
    if (currency !== product.currency) {
      throw new APIError('All products in one order must share the same currency.', 400)
    }

    const lineTotal = product.price * quantity
    total += lineTotal

    prepared.push({
      product: product.id,
      title: product.title,
      unitPrice: product.price,
      currency: product.currency,
      quantity,
      lineTotal,
    })
  }

  data.items = prepared
  data.total = total
  data.currency = currency

  return data
}
