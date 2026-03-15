import type { MetadataRoute } from 'next'
import { getAllPublicRoutes } from '@/lib/data'
import { siteConfig } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const routes = await getAllPublicRoutes()

  return [
    {
      url: siteConfig.baseUrl,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 1
    },
    ...routes.articleSlugs.map((slug) => ({
      url: `${siteConfig.baseUrl}/article/${slug}`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.8
    })),
    ...routes.categorySlugs.map((slug) => ({
      url: `${siteConfig.baseUrl}/category/${slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.6
    })),
    ...routes.authorSlugs.map((slug) => ({
      url: `${siteConfig.baseUrl}/author/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5
    }))
  ]
}
