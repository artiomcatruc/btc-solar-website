import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function main() {
  const payload = await getPayload({ config })

  for (const locale of ['en', 'ru', 'ro'] as const) {
    const footer = await payload.findGlobal({ slug: 'footer', depth: 0, locale })
    const productsLabel =
      locale === 'ru' ? 'Продукты' : locale === 'ro' ? 'Produse' : 'Products'

    const columns = (footer.columns || []).map((column) => {
      const heading = (column.heading || '').toLowerCase()
      const isQuickLinks = heading.includes('quick') || heading.includes('ссылк') || heading.includes('link')
      const isServices = heading.includes('service') || heading.includes('услуг') || heading.includes('servicii')

      let links = [...(column.links || [])]

      if (isServices) {
        links = links.filter((row) => row?.link?.url !== '/products')
      }

      if (isQuickLinks) {
        // Drop mistaken page-reference "Products" entries
        links = links.filter(
          (row) =>
            !(
              row?.link?.label &&
              /products|продукт|produse/i.test(row.link.label) &&
              row.link.type === 'reference'
            ),
        )

        const hasProducts = links.some((row) => row?.link?.url === '/products')
        if (!hasProducts) {
          const contactIdx = links.findIndex((row) => row?.link?.url === '/contact')
          const productsLink = {
            link: { type: 'custom' as const, label: productsLabel, url: '/products' },
          }
          links =
            contactIdx >= 0
              ? [...links.slice(0, contactIdx), productsLink, ...links.slice(contactIdx)]
              : [...links, productsLink]
        } else {
          links = links.map((row) =>
            row?.link?.url === '/products'
              ? { ...row, link: { ...row.link, type: 'custom' as const, label: productsLabel, url: '/products' } }
              : row,
          )
        }
      }

      return { ...column, links }
    })

    await payload.updateGlobal({
      slug: 'footer',
      locale,
      data: { columns },
      context: { disableRevalidate: true },
    })
    console.log(`Cleaned footer (${locale})`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
