import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticlesByCategory } from '@/lib/data'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `${slug} समाचार | Namo Bharat News 24`,
    description: `${slug} श्रेणी की ताज़ा खबरें और विश्लेषण।`
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params
  const stories = await getArticlesByCategory(slug)

  if (!stories.length) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">श्रेणी: {stories[0].category.name}</h1>
      <ul className="space-y-3">
        {stories.map((story) => (
          <li key={story.id} className="rounded-lg border border-gray-200 p-3">
            <Link href={`/article/${story.slug}`} className="text-lg font-semibold">
              {story.title}
            </Link>
            <p className="mt-1 text-sm text-gray-600">{story.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryPage
