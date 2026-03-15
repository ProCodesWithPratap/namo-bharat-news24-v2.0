import { NextResponse } from 'next/server'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT
} from '@payloadcms/next/routes'
import { runtimeEnv } from '@/lib/env'

const config = import('../../../../../payload.config').then((module) => module.default)

const unavailable = async () => {
  return NextResponse.json(
    {
      error: 'Payload API is unavailable because DATABASE_URL is not configured.'
    },
    { status: 503 }
  )
}

export const GET = runtimeEnv.hasDatabase ? REST_GET(config) : unavailable
export const POST = runtimeEnv.hasDatabase ? REST_POST(config) : unavailable
export const DELETE = runtimeEnv.hasDatabase ? REST_DELETE(config) : unavailable
export const PATCH = runtimeEnv.hasDatabase ? REST_PATCH(config) : unavailable
export const PUT = runtimeEnv.hasDatabase ? REST_PUT(config) : unavailable
export const OPTIONS = runtimeEnv.hasDatabase ? REST_OPTIONS(config) : unavailable
