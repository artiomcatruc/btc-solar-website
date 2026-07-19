import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { sampleProducts } from './products'

const collections: CollectionSlug[] = [
  'gallery-items',
  'services',
  'testimonials',
  'faqs',
  'products',
  'orders',
  'categories',
  'tags',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']
const tags = ['Solar', 'Mining', 'Efficiency', 'ROI', 'Installation']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'site',
      data: {
        siteName: 'BTC Solar',
        socialLinks: [],
      },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'home-stats',
      data: { stats: [] },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'header',
      data: { navItems: [] },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: { columns: [] },
      depth: 0,
      context: { disableRevalidate: true },
    }),
  ])

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [image1Doc, image2Doc, image3Doc, imageHomeDoc, , tagDocs] = await Promise.all([
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    Promise.all(
      categories.map((category) =>
        payload.create({
          collection: 'categories',
          data: {
            title: category,
            slug: category,
          },
        }),
      ),
    ),
    Promise.all(
      tags.map((tag) =>
        payload.create({
          collection: 'tags',
          data: {
            title: tag,
            slug: tag.toLowerCase(),
          },
        }),
      ),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: {
      ...post1({ heroImage: image1Doc, blockImage: image2Doc }),
      tags: [tagDocs[0]!.id, tagDocs[1]!.id],
    },
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: {
      ...post2({ heroImage: image2Doc, blockImage: image3Doc }),
      tags: [tagDocs[2]!.id, tagDocs[3]!.id],
    },
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: {
      ...post3({ heroImage: image3Doc, blockImage: image1Doc }),
      tags: [tagDocs[0]!.id, tagDocs[4]!.id],
    },
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding products...`)

  for (const product of sampleProducts({
    image1: image1Doc,
    image2: image2Doc,
    image3: image3Doc,
  })) {
    const { locales, ...base } = product
    const created = await payload.create({
      collection: 'products',
      depth: 0,
      locale: 'en',
      context: { disableRevalidate: true },
      data: {
        ...base,
        ...locales.en,
      },
    })

    for (const locale of ['ru', 'ro'] as const) {
      await payload.update({
        collection: 'products',
        id: created.id,
        depth: 0,
        locale,
        context: { disableRevalidate: true },
        data: locales[locale],
      })
    }
  }

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'site',
      data: {
        siteName: 'BTC Solar Energy',
        defaultTitle: 'BTC Solar Energy | Premium Solar Solutions in Moldova',
        defaultDescription:
          'Premium solar panel installation across Moldova. Residential and commercial renewable energy solutions.',
        phone: '+373 22 000 000',
        whatsappPhone: '+373 60 000 000',
        email: 'info@btcsolar.md',
        phones: [{ number: '+373 22 000 000' }, { number: '+373 60 000 000' }],
        emails: [{ address: 'info@btcsolar.md' }, { address: 'sales@btcsolar.md' }],
        address: 'Str. Stefan cel Mare 123\nChisinau, MD-2001\nRepublic of Moldova',
        workingHours:
          'Monday - Friday: 9:00 - 18:00\nSaturday: 10:00 - 14:00\nSunday: Closed',
        defaultLocale: 'en',
        socialLinks: [
          {
            label: 'Facebook',
            url: '#',
          },
          {
            label: 'Pinterest',
            url: '#',
          },
          {
            label: 'Instagram',
            url: '#',
          },
          {
            label: 'LinkedIn',
            url: '#',
          },
          {
            label: 'Twitter',
            url: '#',
          },
        ],
      },
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'home-stats',
      data: {
        stats: [
          { value: '500+', label: 'Projects Completed' },
          { value: '10MW', label: 'Installed Capacity' },
          { value: '98%', label: 'Client Satisfaction' },
          { value: '8+', label: 'Years Experience' },
        ],
      },
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Home',
              url: '/',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'About',
              url: '/about',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Gallery',
              url: '/gallery',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Products',
              url: '/products',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/posts',
            },
          },
        ],
        ctaEnabled: true,
        cta: {
          type: 'reference',
          label: 'Get Consultation',
          reference: {
            relationTo: 'pages',
            value: contactPage.id,
          },
        },
      },
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        brandDescription:
          'Premium solar energy solutions for homes and businesses across Moldova. Your trusted partner in renewable energy.',
        copyrightText: `© ${new Date().getFullYear()} BTC Solar. All rights reserved.`,
        showContactFromSite: true,
        showSocialFromSite: true,
        columns: [
          {
            heading: 'Quick Links',
            links: [
              {
                link: {
                  type: 'custom',
                  label: 'Home',
                  url: '/',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'About Us',
                  url: '/about',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Gallery',
                  url: '/gallery',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Products',
                  url: '/products',
                },
              },
              {
                link: {
                  type: 'reference',
                  label: 'Contact',
                  reference: {
                    relationTo: 'pages',
                    value: contactPage.id,
                  },
                },
              },
            ],
          },
          {
            heading: 'Services',
            links: [
              {
                link: {
                  type: 'reference',
                  label: 'Residential Solar',
                  reference: {
                    relationTo: 'pages',
                    value: contactPage.id,
                  },
                },
              },
              {
                link: {
                  type: 'reference',
                  label: 'Commercial Solar',
                  reference: {
                    relationTo: 'pages',
                    value: contactPage.id,
                  },
                },
              },
              {
                link: {
                  type: 'reference',
                  label: 'Energy Consultation',
                  reference: {
                    relationTo: 'pages',
                    value: contactPage.id,
                  },
                },
              },
              {
                link: {
                  type: 'reference',
                  label: 'Maintenance',
                  reference: {
                    relationTo: 'pages',
                    value: contactPage.id,
                  },
                },
              },
            ],
          },
        ],
      },
      context: { disableRevalidate: true },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
