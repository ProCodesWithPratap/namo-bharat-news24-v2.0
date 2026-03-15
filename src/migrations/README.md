# Payload migrations

This directory is reserved for Payload/Postgres migration files.

## Production-safe flow
1. Generate/review migrations in development.
2. Commit migrations to this folder.
3. Run `npm run payload:migrate` in production before deploy cutover.

## Initial bootstrap
For fresh environments, run:

```bash
DATABASE_URL=<postgres-url> PAYLOAD_SECRET=<secret> npm run db:bootstrap
```

That command performs a one-time schema push, verifies auth tables (`users`, `users_sessions`), and validates essential auth/session columns.

For explicit diagnostics:

```bash
DATABASE_URL=<postgres-url> npm run db:diagnose:auth
```
