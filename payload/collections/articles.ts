import type { CollectionConfig } from 'payload'

const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt']
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'excerpt',
      type: 'textarea'
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'authors',
      hasMany: true
    },
    {
      name: 'content',
      type: 'richText',
      required: true
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString()
    }
  ]
}

export default Articles
