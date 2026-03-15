import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAuthorBySlug } from '@/lib/data'

interface AuthorPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  return {
    title: `लेखक: ${(await params).slug} | Namo Bharat News 24`
  }
}

const AuthorPage = async ({ params }: AuthorPageProps) => {
  const { slug } = await params
  const authorData = await getAuthorBySlug(slug)

  if (!authorData) {
    notFound()
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">लेखक: {authorData.author.name}</h1>
      <p className="mb-4 mt-2 text-gray-700">{authorData.author.bio || 'लेखक की प्रोफाइल उपलब्ध नहीं है।'}</p>
      <h2 className="mb-2 text-xl font-bold">लेखक के लेख</h2>
      <ul className="space-y-2">
        {authorData.articles.map((article) => (
          <li key={article.id} className="rounded-lg border border-gray-200 p-3">
            <Link href={`/article/${article.slug}`} className="text-lg font-medium">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AuthorPage
