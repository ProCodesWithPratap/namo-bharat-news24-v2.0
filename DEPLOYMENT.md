# DEPLOYMENT (Vercel Preview + Real Payload/Postgres)

## 1) Preview mode (safe without database)
Use this for browser-only review and UI validation.

1. Push this branch to GitHub.
2. Import the repo in Vercel.
3. In **Project Settings → Environment Variables**, set:
   - `NEWS_DATA_MODE=mock` (or keep `auto` and do not set DB vars)
   - `NEXT_PUBLIC_SITE_URL=https://<your-preview-domain>`
4. Do **not** set `DATABASE_URL` in preview.
5. Deploy and verify:
   - home page
   - article page
   - category page
   - author page
   - search page
   - `/admin` shows setup guidance page (expected in no-DB mode)

## 2) Production mode (real Payload + PostgreSQL)

### A. Provision Postgres
- Create a PostgreSQL database (Neon/Supabase/RDS/etc.)
- Copy a connection string in this format:
  - `postgres://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require`

### B. Set environment variables
In Vercel **Production** env vars set:
- `DATABASE_URL=<postgres-connection-string>`
- `PAYLOAD_SECRET=<strong-random-secret>`
- `NEXT_PUBLIC_SITE_URL=https://<production-domain>`
- `NEWS_DATA_MODE=auto` (recommended)

### C. Initialize database schema once (required)
Before using `/admin/login` in production, run a one-time bootstrap against the production database:

```bash
DATABASE_URL=<railway-postgres-url> PAYLOAD_SECRET=<same-secret> npm run db:bootstrap
```

What this does:
- enables one-time `push` (`PAYLOAD_SCHEMA_PUSH_ON_INIT=true`) to create/update Payload tables
- verifies auth tables exist (`users`, `users_sessions`)
- exits with failure if auth schema is still incomplete

> Do **not** rely on first runtime `/admin/login` requests to create DB tables.

### D. Deploy
- Trigger a production deploy **after** the schema bootstrap step succeeds.
- Visit `/admin`.
- Create first admin user if prompted.

### E. Verify real data mode
- Add at least one category, author, and article in admin.
- Confirm homepage/article/category/author/search pages render your CMS content.

## 3) Admin/auth endpoints
- Admin UI: `/admin`
- Payload REST/auth: `/api/payload/*`
  - Example login endpoint: `/api/payload/users/login`

## 4) Fallback/safety rules
- If `DATABASE_URL` is missing, app content uses mock data.
- Preview builds remain deploy-safe with no database.
- Admin route remains available but shows a setup message until DB credentials are configured.


## 5) Auth schema failure diagnosis
From the runtime evidence (DB connection succeeds, failure occurs when querying `users` + `users_sessions`), the failure is an **uninitialized auth schema** issue.

Most likely root cause:
- missing `users` table and/or missing `users_sessions` table

Less likely but possible:
- missing columns from one or both auth tables due to partial/incomplete schema init
- mismatched auth schema version between code and DB

Use bootstrap verification to catch this deterministically before serving production traffic.
