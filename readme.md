# Production News Website Starter

This is a production-oriented starter for a news website built with Next.js App Router and Payload CMS.

## What is included
- Homepage layout
- Category archive page
- Article page
- Reusable UI blocks
- Payload collections for articles, categories, authors, media, and breaking news
- `/admin` Payload CMS route with auth/login
- `/api/payload/*` Payload REST/auth endpoints
- Environment-aware mock/data mode switching
- Deployment checklist for Vercel + Cloudflare + Sentry

## Phase 4 status
✅ Implemented in this branch:
- Real Payload + PostgreSQL data access from app pages when DB is configured
- Admin route and auth wiring
- Safe mock fallback when `DATABASE_URL` is missing
- Preview-safe behavior for Vercel builds without database credentials

## Data mode behavior
- `NEWS_DATA_MODE=auto` (default)
  - uses Payload data if `DATABASE_URL` exists
  - falls back to mock content when DB is missing
- `NEWS_DATA_MODE=mock`
  - always uses mock content
- `NEWS_DATA_MODE=payload`
  - forces Payload usage (requires valid DB credentials)

## Required environment variables
### Preview-only / browser-review builds (no DB)
- `NEWS_DATA_MODE=mock` (or `auto` with no DB)
- `NEXT_PUBLIC_SITE_URL=https://<preview-domain>`

### Real CMS mode (Payload + Postgres)
- `PAYLOAD_SECRET=<strong-random-secret>`
- `DATABASE_URL=<postgres-connection-string>`
- `NEXT_PUBLIC_SITE_URL=https://<domain>`
- `NEWS_DATA_MODE=auto` (recommended) or `payload`

## First admin user setup
After setting `DATABASE_URL` and `PAYLOAD_SECRET`:
1. Run the app locally or deploy with those env vars.
2. Visit `/admin`.
3. Payload will prompt to create the first user if none exists.
4. Create your first admin account (use role `admin`).
5. Log in and start creating categories, authors, and articles.

## What still needs your credentials
You still need to provide these real values in your environment:
- `DATABASE_URL` from your PostgreSQL provider
- `PAYLOAD_SECRET` generated securely (at least 32 random chars)
- production `NEXT_PUBLIC_SITE_URL`

Without those credentials, the app remains in safe mock mode and `/admin` will show a setup message.

## Recommended next build tasks
- Add migrations and seed scripts for initial content
- Add editorial workflows and publish states
- Add search indexing backend
- Add analytics keys and alerting
