# Deployment Checklist

## Before first deploy
- Fill `.env` from `.env.example`
- Add database
- Set `PAYLOAD_SECRET`
- Connect GitHub repo to Vercel
- Confirm preview deployments work

## Before public launch
- Put domain behind Cloudflare
- Turn on WAF and rate limiting
- Install Sentry and verify events arrive
- Set sitemap and robots
- Verify metadata and social previews
- Test mobile navigation and article pages
- Add legal pages
- Check image optimization
- Test admin roles and publish workflow
