import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticleBySlug } from '@/lib/data'
import { siteConfig } from '@/lib/site'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'लेख नहीं मिला | Namo Bharat News 24'
    }
  }

  return {
    title: `${article.title} | Namo Bharat News 24`,
    description: article.excerpt,
    alternates: {
      canonical: `${siteConfig.baseUrl}/article/${article.slug}`
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `${siteConfig.baseUrl}/article/${article.slug}`,
      publishedTime: article.publishedAt,
      authors: article.authors.map((author) => author.name)
    }
  }
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: article.authors.map((author) => ({
      '@type': 'Person',
      name: author.name,
      url: `${siteConfig.baseUrl}/author/${author.slug}`
    })),
    mainEntityOfPage: `${siteConfig.baseUrl}/article/${article.slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name
    }
  }

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <p className="text-sm font-semibold uppercase text-red-600">{article.category.name}</p>
      <h1 className="text-2xl font-bold leading-tight md:text-4xl">{article.title}</h1>
      <p className="text-sm text-gray-500">
        {article.authors.map((author) => author.name).join(', ')} ·{' '}
        {new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(
          new Date(article.publishedAt)
        )}
      </p>
      <p className="text-lg leading-8 text-gray-800">{article.content || article.excerpt}</p>
    </article>
  )
}

export default ArticlePage
