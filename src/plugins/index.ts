import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { adminOrEditor, isAdminOrEditor } from '@/access/roles'
import { formSubmissionOverrides } from '@/form-submissions/overrides'
import { Page, Post, Product } from '@/payload-types'
import { parseLocale } from '@/utilities/locale'
import { absoluteUrl, collectionInternalPath, SITE_BRAND, withBrandTitle } from '@/utilities/seo'

const generateTitle: GenerateTitle<Post | Page | Product> = ({ doc }) => {
  return withBrandTitle(doc?.title) || SITE_BRAND
}

const generateURL: GenerateURL<Post | Page | Product> = ({ doc, locale, collectionSlug }) => {
  const loc = parseLocale(locale)
  const slug = typeof doc?.slug === 'string' ? doc.slug : null

  const collection =
    collectionSlug === 'posts'
      ? 'posts'
      : collectionSlug === 'products'
        ? 'products'
        : 'pages'

  const path = collectionInternalPath(collection, slug)
  return absoluteUrl(`/${loc}${path === '/' ? '' : path}`)
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      access: {
        // Public read still needed so storefront can render form fields.
        // Sensitive notification config is stripped via field access below.
        read: () => true,
        create: adminOrEditor,
        update: adminOrEditor,
        delete: adminOrEditor,
      },
      // @ts-expect-error - mapped field admin overrides don't narrow cleanly
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'emails') {
            return {
              ...field,
              access: {
                read: ({ req: { user } }) => isAdminOrEditor(user),
              },
              admin: {
                ...field.admin,
                hidden: true,
                description:
                  'Email notifications are disabled. Check Leads in the admin dashboard instead.',
              },
            }
          }
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides,
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
