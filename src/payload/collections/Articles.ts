export const Articles = {
  slug: 'articles',
  admin: {
    useAsTitle: 'headline'
  },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'shortHeadline', type: 'text' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'deck', type: 'textarea' },
    { name: 'body', type: 'richText' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'author', type: 'relationship', relationTo: 'authors' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'location', type: 'text' },
    { name: 'isBreaking', type: 'checkbox', defaultValue: false },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
    { name: 'publishedAt', type: 'date' },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' }
  ]
}
