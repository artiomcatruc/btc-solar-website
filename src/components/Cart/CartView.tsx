'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { formatPrice } from '@/cart/formatPrice'
import { useCart } from '@/cart/CartProvider'
import { HoneypotField } from '@/components/HoneypotField'
import { Media } from '@/components/Media'
import { Turnstile } from '@/components/Turnstile'
import type { Product } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'
import { localizeHref, type Locale } from '@/utilities/locale'
import { publicSubmitHeaders } from '@/utilities/publicSubmitHeaders'
import { t } from '@/utilities/uiMessages'
import { cn } from '@/utilities/ui'

type CheckoutForm = {
  customerName: string
  phone: string
  address: string
  note?: string
}

type Props = {
  locale: Locale
}

export const CartView: React.FC<Props> = ({ locale }) => {
  const { items, ready, setQuantity, removeItem, clear } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  const onTurnstileToken = useCallback((token: string | null) => {
    setTurnstileToken(token)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutForm>()

  const productIds = useMemo(() => items.map((item) => item.productId).sort((a, b) => a - b), [items])
  const productIdsKey = productIds.join(',')

  useEffect(() => {
    if (!ready) return
    if (!productIdsKey) {
      setProducts([])
      return
    }

    let cancelled = false
    const load = async () => {
      setLoadingProducts(true)
      try {
        const params = new URLSearchParams({
          depth: '1',
          limit: '100',
          locale,
        })
        productIds.forEach((id, index) => {
          params.append(`where[id][in][${index}]`, String(id))
        })
        const res = await fetch(`${getClientSideURL()}/api/products?${params.toString()}`)
        const data = (await res.json()) as { docs?: Product[] }
        if (!cancelled) setProducts(data.docs || [])
      } catch {
        if (!cancelled) setProducts([])
      } finally {
        if (!cancelled) setLoadingProducts(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [ready, productIdsKey, locale])

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((doc) => doc.id === item.productId)
        if (!product) return null
        return { item, product }
      })
      .filter((line): line is { item: (typeof items)[number]; product: Product } => Boolean(line))
  }, [items, products])

  const currency = lines[0]?.product.currency
  const mixedCurrency = lines.some((line) => line.product.currency !== currency)
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.item.quantity, 0)

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null)

    if (!lines.length) {
      setSubmitError(t(locale, 'cartEmptyLead'))
      return
    }
    if (mixedCurrency) {
      setSubmitError(t(locale, 'cartMixedCurrency'))
      return
    }
    if (turnstileRequired && !turnstileToken) {
      setSubmitError(t(locale, 'cartCaptchaRequired'))
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${getClientSideURL()}/api/orders`, {
        method: 'POST',
        headers: publicSubmitHeaders({ honeypot, turnstileToken }),
        body: JSON.stringify({
          customerName: values.customerName.trim(),
          phone: values.phone.trim(),
          address: values.address.trim(),
          note: values.note?.trim() || undefined,
          items: lines.map(({ item, product }) => ({
            product: product.id,
            quantity: item.quantity,
          })),
        }),
      })

      const data = (await res.json()) as {
        errors?: Array<{ message?: string }>
        message?: string
      }

      if (!res.ok) {
        setSubmitError(
          data.errors?.[0]?.message || data.message || t(locale, 'cartSubmitError'),
        )
        return
      }

      clear()
      reset()
      setSubmitted(true)
    } catch {
      setSubmitError(t(locale, 'cartSubmitError'))
    } finally {
      setSubmitting(false)
    }
  })

  if (!ready || loadingProducts) {
    return (
      <div className="rounded-3xl border border-graphite-100 bg-white px-8 py-16 text-center text-graphite-600">
        {t(locale, 'cartLoading')}
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="fade-in-visible rounded-3xl border border-graphite-100 bg-white px-8 py-16 text-center">
        <p className="text-2xl font-bold text-graphite-900">{t(locale, 'cartSuccessTitle')}</p>
        <p className="mx-auto mt-3 max-w-lg text-graphite-600">{t(locale, 'cartSuccessLead')}</p>
        <Link
          href={localizeHref('/products', locale)}
          className="mt-8 inline-flex rounded-full bg-graphite-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
        >
          {t(locale, 'cartBackToProducts')}
        </Link>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-graphite-200 bg-white px-8 py-16 text-center">
        <p className="text-lg font-medium text-graphite-900">{t(locale, 'cartEmptyTitle')}</p>
        <p className="mt-2 text-graphite-600">{t(locale, 'cartEmptyLead')}</p>
        <Link
          href={localizeHref('/products', locale)}
          className="mt-8 inline-flex rounded-full bg-graphite-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
        >
          {t(locale, 'cartBackToProducts')}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {lines.map(({ item, product }) => {
          const image = typeof product.image === 'object' ? product.image : null
          const unavailable = product.soldOut || product.quantity <= 0
          const overStock = item.quantity > product.quantity

          return (
            <article
              key={product.id}
              className="fade-in-visible flex gap-4 rounded-3xl border border-graphite-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl bg-graphite-100 sm:h-28 sm:w-32">
                {image ? (
                  <Media
                    fill
                    resource={image}
                    size="120px"
                    pictureClassName="absolute inset-0 block size-full"
                    imgClassName="object-cover"
                    htmlElement={null}
                  />
                ) : null}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-graphite-900">{product.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-solar-600">
                      {formatPrice(product.price, product.currency, locale)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-graphite-500 transition-colors hover:text-red-600"
                    onClick={() => removeItem(product.id)}
                  >
                    {t(locale, 'cartRemove')}
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                  <label className="flex items-center gap-2 text-sm text-graphite-600">
                    <span>{t(locale, 'cartQuantity')}</span>
                    <input
                      type="number"
                      min={1}
                      max={Math.max(1, product.quantity)}
                      value={item.quantity}
                      disabled={unavailable}
                      className="h-10 w-20 rounded-xl border border-graphite-200 bg-white px-3 text-graphite-900"
                      onChange={(event) => setQuantity(product.id, Number(event.target.value))}
                    />
                  </label>
                  <p className="font-semibold text-graphite-900">
                    {formatPrice(product.price * item.quantity, product.currency, locale)}
                  </p>
                </div>

                {unavailable || overStock ? (
                  <p className="mt-2 text-sm text-red-600">
                    {unavailable
                      ? t(locale, 'soldOut')
                      : t(locale, 'cartOverStock').replace('{count}', String(product.quantity))}
                  </p>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>

      <aside className="h-fit rounded-3xl border border-graphite-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
        <h2 className="text-xl font-bold text-graphite-900">{t(locale, 'cartCheckoutTitle')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-graphite-600">
          {t(locale, 'cartCheckoutLead')}
        </p>

        <div className="mt-6 flex items-center justify-between border-b border-graphite-100 pb-4">
          <span className="text-graphite-600">{t(locale, 'cartSubtotal')}</span>
          <span className="text-lg font-bold text-graphite-900">
            {currency && !mixedCurrency
              ? formatPrice(subtotal, currency, locale)
              : '—'}
          </span>
        </div>

        {mixedCurrency ? (
          <p className="mt-4 text-sm text-red-600">{t(locale, 'cartMixedCurrency')}</p>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700" htmlFor="customerName">
              {t(locale, 'cartName')}
            </label>
            <input
              id="customerName"
              className={cn(
                'h-11 w-full rounded-xl border bg-white px-3 text-graphite-900',
                errors.customerName ? 'border-red-400' : 'border-graphite-200',
              )}
              {...register('customerName', { required: true, minLength: 2 })}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700" htmlFor="phone">
              {t(locale, 'cartPhone')}
            </label>
            <input
              id="phone"
              type="tel"
              className={cn(
                'h-11 w-full rounded-xl border bg-white px-3 text-graphite-900',
                errors.phone ? 'border-red-400' : 'border-graphite-200',
              )}
              {...register('phone', { required: true, minLength: 6 })}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700" htmlFor="address">
              {t(locale, 'cartAddress')}
            </label>
            <textarea
              id="address"
              rows={3}
              className={cn(
                'w-full rounded-xl border bg-white px-3 py-2 text-graphite-900',
                errors.address ? 'border-red-400' : 'border-graphite-200',
              )}
              {...register('address', { required: true, minLength: 5 })}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700" htmlFor="note">
              {t(locale, 'cartNote')}
            </label>
            <textarea
              id="note"
              rows={2}
              className="w-full rounded-xl border border-graphite-200 bg-white px-3 py-2 text-graphite-900"
              {...register('note')}
            />
          </div>

          <HoneypotField value={honeypot} onChange={setHoneypot} />
          <Turnstile className="mt-2" onToken={onTurnstileToken} />

          {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}

          <button
            type="submit"
            disabled={submitting || mixedCurrency || (turnstileRequired && !turnstileToken)}
            className="inline-flex w-full items-center justify-center rounded-full bg-solar-500 px-6 py-3 text-sm font-semibold text-graphite-900 transition-colors hover:bg-solar-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t(locale, 'cartSubmitting') : t(locale, 'cartSubmit')}
          </button>
        </form>
      </aside>
    </div>
  )
}
