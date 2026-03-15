import type { CollectionConfig } from 'payload'

const Authors: CollectionConfig = {
  slug: 'authors',
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'bio',
      type: 'textarea'
    }
  ]
}

export default Authors
