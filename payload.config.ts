import { buildConfig } from 'payload/config';
import path from 'path';

// Import collection definitions.  Each collection resides in the
// `payload/collections` directory.  Separating collections into
// individual files keeps this configuration concise and easy to
// maintain.
import categories from './payload/collections/categories';
import authors from './payload/collections/authors';
import media from './payload/collections/media';
import articles from './payload/collections/articles';
import breakingNews from './payload/collections/breakingNews';

export default buildConfig({
  // The serverURL is used to generate fully‑qualified URLs for media
  // uploads and to construct canonical links in the SEO plugin.  It
  // should match the publicly accessible URL of your site.
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,

  admin: {
    user: 'users',
    // You can customize the appearance of the Payload admin panel here.
    // See https://payloadcms.com/docs/admin/overview for details.
  },

  // Define the built‑in authentication collection.  When `auth: true`
  // is set, Payload automatically creates login, registration and
  // password reset endpoints.  The `users` collection is used for
  // administrators and content editors.
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        defaultColumns: ['email', 'roles'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'roles',
          type: 'array',
          required: true,
          admin: {
            components: {
              // Render roles as a multi‑select in the admin UI
              Field: (props) => {
                return (
                  <select {...props} multiple>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="author">Author</option>
                    <option value="seo">SEO</option>
                  </select>
                );
              },
            },
          },
        },
      ],
    },
    media,
    categories,
    authors,
    articles,
    breakingNews,
  ],

  // Plugins can extend Payload with additional functionality.  The
  // SEO plugin automatically adds fields for title, description,
  // canonical URLs and open graph images to each collection.  See
  // https://payloadcms.com/docs/plugins/seo for configuration details.
  plugins: [
    require('@payloadcms/plugin-seo').default({
      collections: ['articles', 'categories', 'authors', 'breakingNews'],
    }),
  ],

  // Define TypeScript aliases so that imports like `@/payload/...` work
  // correctly when compiling the admin panel.
  typescript: {
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  },
});