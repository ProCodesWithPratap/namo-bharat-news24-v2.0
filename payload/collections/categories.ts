import type { CollectionConfig } from 'payload'

const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug']
  },
  fields: [
    {
      name: 'name',
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
      name: 'description',
      type: 'textarea'
    }
  ]
}

export default Categories
