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

const users = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role']
  },
  access: {
    read: ({ req }: { req: { user?: unknown } }) => Boolean(req.user)
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
      connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/namo_bharat_news24'
    }
  }),
  admin: {
    user: users.slug
  },
  collections: [users as any, media, categories, authors, articles, breakingNews],
  plugins: [
    seoPlugin({
      collections: ['articles', 'categories', 'authors'],
      uploadsCollection: 'media'
    })
  ]
})
