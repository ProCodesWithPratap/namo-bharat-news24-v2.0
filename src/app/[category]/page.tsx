import { StoryCard } from '@/components/StoryCard'
import { SectionTitle } from '@/components/SectionTitle'
import { getArticlesByCategory } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const label = category.replace(/-/g, ' ')
  return buildMetadata(`${label} News`, `Archive page for ${label} coverage.`, `/${category}`)
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const label = category.replace(/-/g, ' ')
  const stories = await getArticlesByCategory(category)

  return (
    <div className="container-shell py-8">
      <SectionTitle title={label.toUpperCase()} kicker="Category Archive" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            headline={story.title}
            category={story.category.name}
            slug={story.slug}
            time={new Intl.DateTimeFormat('hi-IN', { dateStyle: 'short', timeStyle: 'short' }).format(
              new Date(story.publishedAt)
            )}
          />
        ))}
      </div>
    </div>
  )
}
