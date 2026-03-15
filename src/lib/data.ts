import { runtimeEnv } from '@/lib/env'
import { getPayloadClient } from '@/lib/payload'

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
}

export type Author = {
  id: string
  name: string
  slug: string
  bio?: string
}

export type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  category: Category
  authors: Author[]
  publishedAt: string
  updatedAt?: string
}

const mockCategories: Category[] = [
  { id: 'c1', name: 'राष्ट्रीय', slug: 'national', description: 'देश भर की अहम खबरें' },
  { id: 'c2', name: 'राजनीति', slug: 'politics', description: 'नीति, सत्ता और चुनाव' },
  { id: 'c3', name: 'खेल', slug: 'sports', description: 'मैच, विश्लेषण और अपडेट' },
  { id: 'c4', name: 'तकनीक', slug: 'technology', description: 'टेक, स्टार्टअप और नवाचार' }
]

const mockAuthors: Author[] = [
  { id: 'a1', name: 'एडिटोरियल डेस्क', slug: 'editorial-desk', bio: 'Namo Bharat News 24 की केंद्रीय संपादकीय टीम।' },
  { id: 'a2', name: 'राहुल वर्मा', slug: 'rahul-verma', bio: 'राजनीति और नीति मामलों के वरिष्ठ संवाददाता।' },
  { id: 'a3', name: 'नेहा श्रीवास्तव', slug: 'neha-srivastava', bio: 'डिजिटल और टेक्नोलॉजी बीट रिपोर्टर।' }
]

const makeMockArticle = (id: number, category: Category, author: Author): Article => ({
  id: String(id),
  title: `नमूना समाचार शीर्षक ${id}`,
  slug: `sample-news-${id}`,
  excerpt: `यह एक डेमो सारांश है जो बताता है कि ${category.name} की खबर का मुख्य बिंदु क्या है।`,
  content: `यह ${id} नंबर का डेमो लेख है।`,
  category,
  authors: [author],
  publishedAt: new Date(Date.now() - id * 36e5).toISOString(),
  updatedAt: new Date(Date.now() - id * 18e5).toISOString()
})

const mockArticles: Article[] = [
  makeMockArticle(1, mockCategories[0], mockAuthors[0]),
  makeMockArticle(2, mockCategories[1], mockAuthors[1]),
  makeMockArticle(3, mockCategories[2], mockAuthors[0]),
  makeMockArticle(4, mockCategories[3], mockAuthors[2]),
  makeMockArticle(5, mockCategories[0], mockAuthors[1]),
  makeMockArticle(6, mockCategories[1], mockAuthors[0])
]

type PayloadCategory = {
  id: string
  name: string
  slug: string
  description?: string
}

type PayloadAuthor = {
  id: string
  name: string
  slug: string
  bio?: string
}

type PayloadArticle = {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: unknown
  category?: PayloadCategory | string
  authors?: (PayloadAuthor | string)[]
  publishedAt?: string
  updatedAt?: string
  createdAt: string
}

const shouldUseMockData = runtimeEnv.shouldUseMockData

const normalizeCategory = (category?: PayloadCategory | string): Category => {
  if (typeof category === 'object' && category?.slug) {
    return {
      id: String(category.id),
      name: category.name,
      slug: category.slug,
      description: category.description
    }
  }

  return mockCategories[0]
}

const normalizeAuthors = (authors?: (PayloadAuthor | string)[]): Author[] => {
  const authorDocs = Array.isArray(authors)
    ? authors.filter((author): author is PayloadAuthor => typeof author === 'object' && Boolean(author?.slug))
    : []

  if (!authorDocs.length) {
    return [mockAuthors[0]]
  }

  return authorDocs.map((author) => ({
    id: String(author.id),
    name: author.name,
    slug: author.slug,
    bio: author.bio
  }))
}

const toArticle = (doc: PayloadArticle): Article => ({
  id: String(doc.id),
  title: doc.title,
  slug: doc.slug,
  excerpt: doc.excerpt || 'इस लेख के लिए सारांश उपलब्ध नहीं है।',
  content: typeof doc.content === 'string' ? doc.content : undefined,
  category: normalizeCategory(doc.category),
  authors: normalizeAuthors(doc.authors),
  publishedAt: doc.publishedAt || doc.createdAt,
  updatedAt: doc.updatedAt
})

const getPayloadArticles = async (query: Record<string, unknown>) => {
  if (shouldUseMockData) {
    return null
  }

  try {
    const payload = await getPayloadClient()

    if (!payload) {
      return null
    }

    const response = await payload.find({
      collection: 'articles',
      depth: 2,
      ...query
    })

    if (!response.docs.length) {
      return []
    }

    return response.docs.map((doc) => toArticle(doc as PayloadArticle))
  } catch {
    return null
  }
}

const getPayloadCategories = async () => {
  if (shouldUseMockData) {
    return null
  }

  try {
    const payload = await getPayloadClient()

    if (!payload) {
      return null
    }

    const response = await payload.find({
      collection: 'categories',
      sort: 'name',
      limit: 50
    })

    return response.docs.map((doc) => ({
      id: String(doc.id),
      name: doc.name,
      slug: doc.slug,
      description: doc.description || undefined
    }))
  } catch {
    return null
  }
}

const getLiveBreakingNewsTitle = async () => {
  if (shouldUseMockData) {
    return null
  }

  try {
    const payload = await getPayloadClient()

    if (!payload) {
      return null
    }

    const now = new Date().toISOString()

    const response = await payload.find({
      collection: 'breakingNews',
      sort: '-createdAt',
      limit: 5
    })

    const activeNews = response.docs.find((item) => {
      const breakingItem = item as any
      const isStarted = !breakingItem.start || breakingItem.start <= now
      const isNotExpired = !breakingItem.end || breakingItem.end >= now
      return isStarted && isNotExpired
    }) as any

    return activeNews?.title || null
  } catch {
    return null
  }
}

export const getHomepageData = async () => {
  const payloadArticles = await getPayloadArticles({
    limit: 8,
    sort: '-publishedAt'
  })

  const payloadCategories = await getPayloadCategories()
  const breakingNewsTitle = await getLiveBreakingNewsTitle()

  const articles = payloadArticles?.length ? payloadArticles : mockArticles
  const featured = articles[0] || mockArticles[0]

  return {
    breaking:
      breakingNewsTitle ||
      'ब्रेकिंग: हिंदी-फर्स्ट न्यूज़रूम अब Payload CMS के साथ लाइव डेटा के लिए तैयार है।',
    featured,
    latest: articles.slice(1, 7),
    categories: payloadCategories?.length ? payloadCategories : mockCategories
  }
}

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const payloadArticles = await getPayloadArticles({
    where: {
      slug: {
        equals: slug
      }
    },
    limit: 1
  })

  if (payloadArticles?.length) {
    return payloadArticles[0]
  }

  return mockArticles.find((article) => article.slug === slug) || null
}

export const getArticlesByCategory = async (slug: string) => {
  const payloadArticles = await getPayloadArticles({
    where: {
      'category.slug': {
        equals: slug
      }
    },
    sort: '-publishedAt',
    limit: 50
  })

  if (payloadArticles?.length) {
    return payloadArticles
  }

  return mockArticles.filter((article) => article.category.slug === slug)
}

export const getAuthorBySlug = async (slug: string) => {
  if (!shouldUseMockData) {
    try {
      const payload = await getPayloadClient()

      if (payload) {
        const authorResponse = await payload.find({
          collection: 'authors',
          where: {
            slug: {
              equals: slug
            }
          },
          limit: 1
        })

        const authorDoc = authorResponse.docs[0]

        if (authorDoc) {
          const articles = await getPayloadArticles({
            where: {
              'authors.slug': {
                equals: slug
              }
            },
            sort: '-publishedAt',
            limit: 50
          })

          return {
            author: {
              id: String(authorDoc.id),
              name: authorDoc.name,
              slug: authorDoc.slug,
              bio: authorDoc.bio || undefined
            },
            articles: articles || []
          }
        }
      }
    } catch {
      // Fall through to mock fallback.
    }
  }

  const author = mockAuthors.find((item) => item.slug === slug)

  if (!author) {
    return null
  }

  return {
    author,
    articles: mockArticles.filter((article) => article.authors.some((item) => item.slug === slug))
  }
}

export const searchArticles = async (query: string) => {
  const cleanQuery = query.trim()

  if (!cleanQuery) {
    return []
  }

  const payloadArticles = await getPayloadArticles({
    where: {
      title: {
        like: cleanQuery
      }
    },
    sort: '-publishedAt',
    limit: 20
  })

  if (payloadArticles?.length) {
    return payloadArticles
  }

  return mockArticles.filter(
    (article) => article.title.includes(cleanQuery) || article.excerpt.includes(cleanQuery)
  )
}

export const getAllPublicRoutes = async () => {
  const payloadArticles = await getPayloadArticles({
    depth: 0,
    limit: 200
  })

  const payloadCategories = await getPayloadCategories()

  const articleSlugs = payloadArticles?.length
    ? payloadArticles.map((article) => article.slug)
    : mockArticles.map((article) => article.slug)

  const categorySlugs = payloadCategories?.length
    ? payloadCategories.map((category) => category.slug)
    : mockCategories.map((category) => category.slug)

  const authorSlugs = shouldUseMockData
    ? mockAuthors.map((author) => author.slug)
    : (() => {
        return [] as string[]
      })()

  if (!shouldUseMockData) {
    try {
      const payload = await getPayloadClient()
      if (payload) {
        const authors = await payload.find({
          collection: 'authors',
          limit: 200
        })
        return {
          articleSlugs,
          categorySlugs,
          authorSlugs: authors.docs.map((author) => author.slug)
        }
      }
    } catch {
      // Ignore and fallback below.
    }
  }

  return {
    articleSlugs,
    categorySlugs,
    authorSlugs: authorSlugs.length ? authorSlugs : mockAuthors.map((author) => author.slug)
  }
}
