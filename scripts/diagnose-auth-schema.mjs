#!/usr/bin/env node
import process from 'node:process'
import { inspectAuthSchema } from './auth-schema.mjs'

const run = async () => {
  const { DATABASE_URL } = process.env

  if (!DATABASE_URL) {
    console.log('[diagnose-auth-schema] DATABASE_URL is missing. Cannot inspect auth schema.')
    process.exit(1)
  }

  const authSchema = await inspectAuthSchema(DATABASE_URL)

  console.log('[diagnose-auth-schema] Result:')
  console.log(JSON.stringify(authSchema, null, 2))

  if (authSchema.status !== 'ok') {
    process.exit(2)
  }
}

run().catch((error) => {
  console.error('[diagnose-auth-schema] Failed:', error)
  process.exit(1)
})
