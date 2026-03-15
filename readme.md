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
1. Run one-time schema bootstrap (required before first admin login):
   - `DATABASE_URL=<postgres-url> PAYLOAD_SECRET=<secret> npm run db:bootstrap`
2. Deploy (or run locally) with the same env vars.
3. Visit `/admin`.
4. Payload will prompt to create the first user if none exists.
5. Create your first admin account (use role `admin`).
6. Log in and start creating categories, authors, and articles.

### Why this is required
If DB connection works but `/admin/login` fails while querying `users` and `users_sessions`, the auth schema was not initialized yet. The bootstrap step initializes/verifies auth schema up front instead of waiting for runtime failures.

To inspect exact failure mode before/after bootstrap:
- `DATABASE_URL=<postgres-url> npm run db:diagnose:auth`
- returns `missing_tables`, `missing_columns`, or `ok`

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

## Migration/bootstrap commands
- `npm run db:bootstrap` → one-time schema init + auth schema verification (Vercel-safe, skips when DB missing)
- `npm run db:diagnose:auth` → explicit auth schema diagnosis (`missing_tables` / `missing_columns` / `ok`)
- `npm run payload:migrate` → run committed migrations (for migration-first workflow)
- `npm run payload:migrate:status` → inspect migration status
