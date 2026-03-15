const fallbackSiteUrl = 'http://localhost:3000'

const normalizeSiteUrl = (value?: string) => {
  if (!value) {
    return fallbackSiteUrl
  }

  try {
    return new URL(value).origin
  } catch {
    return fallbackSiteUrl
  }
}

const parseDataMode = () => {
  const mode = (process.env.NEWS_DATA_MODE || 'auto').toLowerCase()

  if (mode === 'payload' || mode === 'mock' || mode === 'auto') {
    return mode
  }

  return 'auto'
}

const hasDatabase = Boolean(process.env.DATABASE_URL)
const resolvedMode = parseDataMode()
const shouldUseMockData = resolvedMode === 'mock' || (resolvedMode === 'auto' && !hasDatabase)

export const runtimeEnv = {
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  hasDatabase,
  dataMode: resolvedMode,
  shouldUseMockData,
  isPreviewLike: !hasDatabase || process.env.VERCEL_ENV === 'preview'
} as const
