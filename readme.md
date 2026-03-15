# Production News Website Starter

This is a production-oriented starter for a news website built with Next.js App Router and a Payload CMS content model layout.

## What is included
- Homepage layout
- Category archive page
- Article page
- Reusable UI blocks
- Content model stubs for articles, categories, authors, and media
- SEO helpers
- Environment-aware mock/data mode switching
- Deployment checklist for Vercel + Cloudflare + Sentry

## What is not finished yet
- Full Payload admin bootstrapping
- Authentication secrets for real production setup
- Ad network integration
- Search backend
- Analytics keys
- Push notifications

## Preview mode without database (recommended for browser-only review)
Use this when you want cloud previews to build safely without Payload/Postgres.

Required env vars:
- `NEWS_DATA_MODE=mock` (or `auto` with no `DATABASE_URL`)
- `NEXT_PUBLIC_SITE_URL=https://<preview-domain>`

Behavior:
- App serves mock Hindi news content.
- Homepage, article, category, author, and search pages stay functional.
- Metadata/sitemap/robots still build successfully.
- Preview output is no-index for safer public exposure.

## Production mode with database
Use this when connecting real Payload + Postgres.

Required env vars:
- `DATABASE_URL=<postgres-connection-string>`
- `PAYLOAD_SECRET=<strong-random-secret>`
- `NEWS_DATA_MODE=payload` (or `auto`)
- `NEXT_PUBLIC_SITE_URL=https://<production-domain>`

Behavior:
- App attempts Payload/API-backed content first.
- Future Payload/Postgres path remains intact.

## Start order
1. Create a GitHub repo and upload these files.
2. Install dependencies with your package manager.
3. Set environment variables for preview or production mode.
4. Connect the repo to Vercel.
5. Promote to production only after database validation.

## Recommended next build tasks
- Finish Payload boot setup
- Add login and role permissions
- Add state/city landing pages
- Add live blog pages
- Add gallery/video pages
- Add News sitemap extensions
- Add structured QA workflow

## Deployment guide
- See `DEPLOYMENT.md` for exact browser-only preview and production steps.
