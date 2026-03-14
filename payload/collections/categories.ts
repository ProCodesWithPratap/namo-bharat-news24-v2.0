import { CollectionConfig } from 'payload/types';

/**
 * Categories represent the high‑level topics for your news content.
 * Each category has a name, a URL‑friendly slug and an optional
 * description.  Categories can be used to group articles on the
 * homepage and to generate archive pages.
 */
const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  fields: [
    {
      name: 'name',
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
      name: 'description',
      type: 'textarea',
    },
  ],
};

export default Categories;