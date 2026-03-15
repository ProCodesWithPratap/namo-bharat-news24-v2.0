import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { runtimeEnv } from '@/lib/env'

const config = import('../../../../payload.config').then((module) => module.default)

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}): Promise<Metadata> {
  if (!runtimeEnv.hasDatabase) {
    return {
      title: 'Payload Admin Unavailable'
    }
  }

  return generatePageMetadata({
    config,
    params,
    searchParams
  })
}

const AdminPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) => {
  if (!runtimeEnv.hasDatabase) {
    return (
      <main className="mx-auto max-w-2xl space-y-4 px-4 py-10">
        <h1 className="text-2xl font-bold">Payload Admin is not enabled</h1>
        <p className="text-gray-700">
          Set <code className="rounded bg-gray-100 px-1 py-0.5">DATABASE_URL</code>,{' '}
          <code className="rounded bg-gray-100 px-1 py-0.5">PAYLOAD_SECRET</code>, and redeploy to enable
          admin login.
        </p>
      </main>
    )
  }

  return RootPage({
    config,
    importMap: {},
    params,
    searchParams
  })
}

export default AdminPage
