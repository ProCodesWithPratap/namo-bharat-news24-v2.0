#!/usr/bin/env node
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { Client } from 'pg'

const REQUIRED_AUTH_TABLES = ['users', 'users_sessions']

const assertAuthTables = async (connectionString) => {
  const client = new Client({ connectionString })
  await client.connect()

  try {
    const { rows } = await client.query(
      `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = ANY($1::text[])
      `,
      [REQUIRED_AUTH_TABLES]
    )

    const existing = new Set(rows.map((row) => row.table_name))
    const missing = REQUIRED_AUTH_TABLES.filter((tableName) => !existing.has(tableName))

    if (missing.length > 0) {
      throw new Error(`Missing auth tables after bootstrap: ${missing.join(', ')}`)
    }
  } finally {
    await client.end()
  }
}

const run = async () => {
  const { DATABASE_URL } = process.env

  if (!DATABASE_URL) {
    console.log('[bootstrap-db] DATABASE_URL is missing. Skipping schema bootstrap (preview/mock-safe).')
    return
  }

  execFileSync('node', ['node_modules/payload/dist/bin/index.js', 'migrate:status'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PAYLOAD_SCHEMA_PUSH_ON_INIT: 'true'
    }
  })

  await assertAuthTables(DATABASE_URL)
  console.log('[bootstrap-db] Schema bootstrap completed and auth tables verified: users, users_sessions.')
}

run().catch((error) => {
  console.error('[bootstrap-db] Failed:', error)
  process.exit(1)
})
