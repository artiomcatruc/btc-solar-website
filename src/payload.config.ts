import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { defaultLexical } from '@/fields/defaultLexical'
import { Categories } from './collections/Categories'
import { Faqs } from './collections/Faqs'
import { GalleryItems } from './collections/GalleryItems'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Orders } from './collections/Orders'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Services } from './collections/Services'
import { Tags } from './collections/Tags'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { HomeStats } from './HomeStats/config'
import { migrations } from './migrations'
import { plugins } from './plugins'
import { Site } from './Site/config'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = getServerSideURL()

export default buildConfig({
  serverURL,
  csrf: [serverURL].filter(Boolean),
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Never auto-push — localization moves columns into *_locales; push would drop data.
    // Apply schema via `pnpm payload migrate` only.
    push: false,
    prodMigrations: migrations,
  }),
  localization: {
    locales: ['en', 'ru', 'ro'],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [
    Pages,
    Posts,
    Products,
    Orders,
    Media,
    Categories,
    Tags,
    Services,
    Testimonials,
    Faqs,
    GalleryItems,
    Users,
  ],
  cors: [serverURL].filter(Boolean),
  globals: [Site, HomeStats, Header, Footer],
  plugins: [
    ...plugins,
    // Cloudflare R2 storage — only active when R2 env vars are present (i.e. in production)
    ...(process.env.R2_BUCKET && process.env.R2_ENDPOINT && process.env.R2_PUBLIC_URL
      ? [
          s3Storage({
            collections: {
              media: {
                // Serve files directly from the public R2 domain (not via Payload proxy)
                disablePayloadAccessControl: true,
                generateFileURL: ({ filename, prefix }) => {
                  const base = process.env.R2_PUBLIC_URL!.replace(/\/$/, '')
                  const key = [prefix, filename].filter(Boolean).join('/')
                  return `${base}/${key}`
                },
              },
            },
            bucket: process.env.R2_BUCKET,
            config: {
              endpoint: process.env.R2_ENDPOINT,
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
              },
              region: 'auto',
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        const roles = req.user?.roles
        if (Array.isArray(roles) && roles.some((role) => role === 'admin' || role === 'editor')) {
          return true
        }

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
