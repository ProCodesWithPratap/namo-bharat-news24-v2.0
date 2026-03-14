export const Authors = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'bio', type: 'textarea' },
    { name: 'designation', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' }
  ]
}
