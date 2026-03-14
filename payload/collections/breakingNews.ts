import { CollectionConfig } from 'payload/types';

/**
 * Breaking news items are displayed prominently on the site for a
 * limited time.  Each item has a title and an optional link to an
 * article.  The `start` and `end` fields control the visibility
 * window; outside of this window, the item will not appear.
 */
const BreakingNews: CollectionConfig = {
  slug: 'breakingNews',
  labels: {
    singular: 'Breaking News',
    plural: 'Breaking News'
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'start', 'end'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      required: false,
    },
    {
      name: 'start',
      type: 'date',
      admin: {
        description: 'When this item should begin appearing.',
      },
    },
    {
      name: 'end',
      type: 'date',
      admin: {
        description: 'When this item should stop appearing.',
      },
    },
  ],
};

export default BreakingNews;