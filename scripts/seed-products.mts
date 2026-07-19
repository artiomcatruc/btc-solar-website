import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import { sampleProducts } from '../src/endpoints/seed/products.ts'

async function main() {
  const payload = await getPayload({ config })
  const existing = await payload.count({ collection: 'products' })

  if (existing.totalDocs > 0) {
    console.log('Products already exist:', existing.totalDocs)
  } else {
    const media = await payload.find({ collection: 'media', limit: 3, sort: 'createdAt' })
    if (media.docs.length < 1) {
      throw new Error('No media found — create at least one media item first')
    }

    const [a, b, c] = [
      media.docs[0]!,
      media.docs[1] ?? media.docs[0]!,
      media.docs[2] ?? media.docs[0]!,
    ]

    for (const product of sampleProducts({ image1: a, image2: b, image3: c })) {
      const { locales, ...base } = product
      const created = await payload.create({
        collection: 'products',
        data: { ...base, ...locales.en },
        locale: 'en',
        depth: 0,
      })

      for (const locale of ['ru', 'ro'] as const) {
        await payload.update({
          collection: 'products',
          id: created.id,
          locale,
          data: locales[locale],
          depth: 0,
        })
      }

      console.log('Created product', created.id, created.slug)
    }
  }

  const header = await payload.findGlobal({ slug: 'header', depth: 0, locale: 'en' })
  const nav = header.navItems || []
  const hasProducts = nav.some((item) => item?.link?.url === '/products')

  if (!hasProducts) {
    await payload.updateGlobal({
      slug: 'header',
      locale: 'en',
      data: {
        navItems: [
          ...nav,
          { link: { type: 'custom', label: 'Products', url: '/products' } },
        ],
      },
      context: { disableRevalidate: true },
    })
    console.log('Added Products to header nav')
  } else {
    console.log('Header already has Products link')
  }

  // Localize existing Products nav label + product copy when present
  const products = await payload.find({ collection: 'products', limit: 100, pagination: false })
  const seeds = sampleProducts({
    image1: { id: 0 } as never,
    image2: { id: 0 } as never,
    image3: { id: 0 } as never,
  })

  for (const doc of products.docs) {
    const seed = seeds.find((item) => item.slug === doc.slug)
    if (!seed) continue

    for (const locale of ['ru', 'ro'] as const) {
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale,
        data: seed.locales[locale],
        depth: 0,
      })
    }
  }

  for (const [locale, label] of [
    ['ru', 'Продукты'],
    ['ro', 'Produse'],
  ] as const) {
    const localizedHeader = await payload.findGlobal({ slug: 'header', depth: 0, locale })
    const items = localizedHeader.navItems || []
    if (!items.some((item) => item?.link?.url === '/products')) continue

    await payload.updateGlobal({
      slug: 'header',
      locale,
      data: {
        navItems: items.map((item) =>
          item?.link?.url === '/products'
            ? { ...item, link: { ...item.link, label } }
            : item,
        ),
      },
      context: { disableRevalidate: true },
    })
  }

  console.log('Localized product copy and nav labels')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
