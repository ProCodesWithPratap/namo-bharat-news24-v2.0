import type { CollectionConfig } from 'payload'

const BreakingNews: CollectionConfig = {
  slug: 'breakingNews',
  labels: {
    singular: 'Breaking News',
    plural: 'Breaking News'
  },
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'start', 'end']
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles'
    },
    {
      name: 'start',
      type: 'date'
    },
    {
      name: 'end',
      type: 'date'
    }
  ]
}

export default BreakingNews
