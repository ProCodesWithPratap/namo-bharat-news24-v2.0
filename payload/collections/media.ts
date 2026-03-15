import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover'
      },
      {
        name: 'hero',
        width: 1200,
        height: 600,
        fit: 'cover'
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*']
  },
  fields: [
    {
      name: 'alt',
      type: 'text'
    }
  ]
}

export default Media
