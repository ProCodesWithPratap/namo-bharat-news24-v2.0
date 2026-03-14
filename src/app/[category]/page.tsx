import { StoryCard } from '@/components/StoryCard'
import { SectionTitle } from '@/components/SectionTitle'
import { latestStories } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const label = category.replace(/-/g, ' ')
  return buildMetadata(`${label} News`, `Archive page for ${label} coverage.`, `/${category}`)
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const label = category.replace(/-/g, ' ')

  return (
    <div className="container-shell py-8">
      <SectionTitle title={label.toUpperCase()} kicker="Category Archive" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {latestStories.map((story) => (
          <StoryCard key={story.id} headline={story.headline} category={label} time={story.time} slug={story.slug} />
        ))}
      </div>
    </div>
  )
}
