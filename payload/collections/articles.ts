import { CollectionConfig } from 'payload/types';
import richText from '@payloadcms/richtext-lexical';

/**
 * Articles are the primary content type for the site.  Each article
 * belongs to one category, can have multiple authors and includes
 * rich‑text content, an optional hero image and metadata for SEO.
 */
const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'A short summary used on article listings and meta description.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      required: true,
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'authors',
      hasMany: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: richText({
        admin: {
          elements: ['h2', 'h3', 'h4', 'p', 'blockquote', 'ul', 'ol', 'link', 'upload'],
        },
      }),
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        description: 'Articles scheduled in the future will not be visible until this date.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
};

export default Articles;