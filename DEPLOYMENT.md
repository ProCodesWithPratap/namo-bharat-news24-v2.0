# DEPLOYMENT (Browser-Only Preview + Production)

## 1) Preview mode (no database required)
Use this mode for Vercel-style cloud previews where you only need UI review.

1. Push this branch to GitHub.
2. Import the repo in Vercel.
3. In **Project Settings → Environment Variables**, set:
   - `NEWS_DATA_MODE=mock`
   - `NEXT_PUBLIC_SITE_URL=https://<your-preview-domain>`
4. Do **not** set `DATABASE_URL` for preview mode.
5. Trigger a deploy from the Vercel UI.
6. Open the deployed preview in your browser and verify:
   - home page
   - article page
   - category page
   - author page
   - search page

Notes:
- In preview/no-DB mode, the app uses built-in mock news data.
- Preview responses are marked no-index (`robots` disallow + metadata robots noindex).

## 2) Production mode (real Payload + Postgres)
Use this mode when real CMS data is required.

1. Provision Postgres and copy the connection string.
2. In Vercel production env vars, set:
   - `DATABASE_URL=<postgres-connection-string>`
   - `PAYLOAD_SECRET=<strong-random-secret>`
   - `NEWS_DATA_MODE=payload` (or keep `auto`)
   - `NEXT_PUBLIC_SITE_URL=https://<production-domain>`
3. Deploy to production.
4. Validate Payload/admin/data wiring separately before launch.

## 3) Mode rules
- `NEWS_DATA_MODE=auto` (default):
  - uses Payload only when `DATABASE_URL` is present
  - otherwise uses mock fallback
- `NEWS_DATA_MODE=mock`: force mock data always
- `NEWS_DATA_MODE=payload`: force Payload/API fetch mode
