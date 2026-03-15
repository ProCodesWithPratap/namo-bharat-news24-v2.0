#!/usr/bin/env node
import process from 'node:process'
import { getPayload } from 'payload'
import configPromise from '../payload.config.ts'
import { inspectAuthSchema } from './auth-schema.mjs'

const run = async () => {
  const { DATABASE_URL } = process.env

  if (!DATABASE_URL) {
    console.log('[bootstrap-db] DATABASE_URL is missing. Skipping schema bootstrap (preview/mock-safe).')
    return
  }

  process.env.PAYLOAD_SCHEMA_PUSH_ON_INIT = 'true'

  const payload = await getPayload({ config: await configPromise })

  try {
    const authSchema = await inspectAuthSchema(DATABASE_URL)

    if (authSchema.status !== 'ok') {
      const details = JSON.stringify(authSchema, null, 2)
      throw new Error(`Auth schema is incomplete after bootstrap:\n${details}`)
    }

    console.log('[bootstrap-db] Schema bootstrap completed and auth tables verified: users, users_sessions.')
  } finally {
    await payload.destroy()
  }
}

run().catch((error) => {
  console.error('[bootstrap-db] Failed:', error)
  process.exit(1)
})
