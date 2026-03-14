export const Categories = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'parent', type: 'relationship', relationTo: 'categories' },
    { name: 'navOrder', type: 'number' }
  ]
}
