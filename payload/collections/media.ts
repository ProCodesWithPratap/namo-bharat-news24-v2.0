import { CollectionConfig } from 'payload/types';

/**
 * Media stores uploaded images and videos.  Payload automatically
 * generates thumbnail sizes for images and stores metadata about each
 * file.  Other collections can reference media via an `upload` field.
 */
const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    staticURL: '/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover',
      },
      {
        name: 'hero',
        width: 1200,
        height: 600,
        fit: 'cover',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
};

export default Media;