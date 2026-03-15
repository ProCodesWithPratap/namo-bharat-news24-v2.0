import type { MetadataRoute } from 'next'
import { runtimeEnv } from '@/lib/env'
import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (runtimeEnv.isPreviewLike) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      },
      sitemap: `${siteConfig.baseUrl}/sitemap.xml`
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`
  }
}
