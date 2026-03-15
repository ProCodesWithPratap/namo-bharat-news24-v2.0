import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import articles from './payload/collections/articles.ts'
import authors from './payload/collections/authors.ts'
import categories from './payload/collections/categories.ts'
import media from './payload/collections/media.ts'
import breakingNews from './payload/collections/breakingNews.ts'

const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const databaseUrl = process.env.DATABASE_URL

const users = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role']
  },
  access: {
    read: ({ req }: { req: { user?: { role?: string } } }) => Boolean(req.user),
    create: () => true,
    update: ({ req }: { req: { user?: { role?: string } } }) => req.user?.role === 'admin',
    delete: ({ req }: { req: { user?: { role?: string } } }) => req.user?.role === 'admin'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' }
      ]
    }
  ]
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'local-dev-secret',
  serverURL,
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl || 'postgres://invalid:invalid@localhost:5432/payload_not_configured'
    }
  }),
  admin: {
    user: users.slug,
    meta: {
      titleSuffix: ' • Namo Bharat News 24 CMS'
    }
  },
  collections: [users as any, media, categories, authors, articles, breakingNews],
  plugins: [
    seoPlugin({
      collections: ['articles', 'categories', 'authors'],
      uploadsCollection: 'media'
    })
  ]
})
