import { runtimeEnv } from '@/lib/env'

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

type PayloadListResponse<T> = { docs: T[] }

const baseUrl = runtimeEnv.siteUrl
const shouldUseMockData = runtimeEnv.shouldUseMockData

type PayloadArticle = {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: unknown
  category?: Category | string
  authors?: (Author | string)[]
  publishedAt?: string
  updatedAt?: string
  createdAt: string
}

const withTimeout = async <T>(promise: Promise<T>, timeoutMs = 2500): Promise<T> => {
  let timer: NodeJS.Timeout

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Payload request timed out')), timeoutMs)
  })

  try {
    return await Promise.race([promise, timeout])
  } finally {
    clearTimeout(timer!)
  }
}

const safeFetch = async <T>(path: string): Promise<T | null> => {
  if (shouldUseMockData) {
    return null
  }

  try {
    const res = await withTimeout(
      fetch(`${baseUrl}${path}`, {
        next: { revalidate: 60 }
      })
    )

    if (!res.ok) {
      return null
    }

    return (await res.json()) as T
  } catch {
    return null
  }
}

const toArticle = (doc: PayloadArticle): Article => {
  const category = typeof doc.category === 'object' && doc.category ? doc.category : mockCategories[0]
  const authorDocs = Array.isArray(doc.authors)
    ? doc.authors.filter((author): author is Author => typeof author === 'object' && !!author)
    : []

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt || 'इस लेख के लिए सारांश उपलब्ध नहीं है।',
    content: typeof doc.content === 'string' ? doc.content : undefined,
    category,
    authors: authorDocs.length ? authorDocs : [mockAuthors[0]],
    publishedAt: doc.publishedAt || doc.createdAt,
    updatedAt: doc.updatedAt
  }
}

export const getHomepageData = async () => {
  const payloadData = await safeFetch<PayloadListResponse<PayloadArticle>>('/api/articles?limit=8&sort=-publishedAt&depth=2')
  const articles = payloadData?.docs?.length ? payloadData.docs.map(toArticle) : mockArticles

  const featured = articles[0] || mockArticles[0]

  return {
    breaking: 'ब्रेकिंग: हिंदी-फर्स्ट न्यूज़रूम अब Payload CMS के साथ लाइव डेटा के लिए तैयार है।',
    featured,
    latest: articles.slice(1, 7),
    categories: mockCategories
  }
}

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const payloadData = await safeFetch<PayloadListResponse<PayloadArticle>>(
    `/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`
  )

  if (payloadData?.docs?.length) {
    return toArticle(payloadData.docs[0])
  }

  return mockArticles.find((article) => article.slug === slug) || null
}

export const getArticlesByCategory = async (slug: string) => {
  const payloadData = await safeFetch<PayloadListResponse<PayloadArticle>>(
    `/api/articles?where[category.slug][equals]=${encodeURIComponent(slug)}&sort=-publishedAt&depth=2`
  )

  if (payloadData?.docs?.length) {
    return payloadData.docs.map(toArticle)
  }

  return mockArticles.filter((article) => article.category.slug === slug)
}

export const getAuthorBySlug = async (slug: string) => {
  const payloadAuthor = await safeFetch<PayloadListResponse<Author>>(
    `/api/authors?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
  )

  const author = payloadAuthor?.docs?.[0] || mockAuthors.find((item) => item.slug === slug)

  if (!author) {
    return null
  }

  const payloadArticles = await safeFetch<PayloadListResponse<PayloadArticle>>(
    `/api/articles?where[authors.slug][equals]=${encodeURIComponent(slug)}&sort=-publishedAt&depth=2`
  )

  return {
    author,
    articles: payloadArticles?.docs?.length
      ? payloadArticles.docs.map(toArticle)
      : mockArticles.filter((article) => article.authors.some((item) => item.slug === slug))
  }
}

export const searchArticles = async (query: string) => {
  const cleanQuery = query.trim()

  if (!cleanQuery) {
    return []
  }

  const payloadData = await safeFetch<PayloadListResponse<PayloadArticle>>(
    `/api/articles?where[title][like]=${encodeURIComponent(cleanQuery)}&sort=-publishedAt&depth=2`
  )

  if (payloadData?.docs?.length) {
    return payloadData.docs.map(toArticle)
  }

  return mockArticles.filter(
    (article) => article.title.includes(cleanQuery) || article.excerpt.includes(cleanQuery)
  )
}

export const getAllPublicRoutes = async () => {
  const payloadData = await safeFetch<PayloadListResponse<PayloadArticle>>('/api/articles?limit=200&depth=0')

  const articleSlugs = payloadData?.docs?.length
    ? payloadData.docs.map((article) => article.slug)
    : mockArticles.map((article) => article.slug)

  return {
    articleSlugs,
    categorySlugs: mockCategories.map((category) => category.slug),
    authorSlugs: mockAuthors.map((author) => author.slug)
  }
}
