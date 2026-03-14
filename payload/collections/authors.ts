import { CollectionConfig } from 'payload/types';

/**
 * Authors represent journalists, editors and other contributors.  Each
 * author has a name, slug, optional photo and bio.  Articles can
 * reference one or more authors via a relationship field.
 */
const Authors: CollectionConfig = {
  slug: 'authors',
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook URL',
    },
    {
      name: 'twitter',
      type: 'text',
      label: 'Twitter URL',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram URL',
    },
  ],
};

export default Authors;