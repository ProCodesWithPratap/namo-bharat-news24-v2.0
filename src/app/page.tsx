import Link from 'next/link'
import { StoryCard } from '@/components/StoryCard'
import { SectionTitle } from '@/components/SectionTitle'
import { featuredStory, latestStories, trendingTopics } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata('Namo Bharat News 24', 'Production-ready homepage for a modern news platform.', '/')

export default function HomePage() {
  return (
    <div className="container-shell py-8">
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <article className="card overflow-hidden">
          <div className="h-72 bg-gradient-to-br from-brand-red to-black" />
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">{featuredStory.category}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight text-brand-ink">
              <Link href={`/article/${featuredStory.slug}`}>{featuredStory.headline}</Link>
            </h1>
            <p className="mt-4 max-w-3xl text-base text-black/70">{featuredStory.deck}</p>
            <p className="mt-4 text-sm text-black/60">By {featuredStory.author} · {featuredStory.publishedAt}</p>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="card p-5">
            <SectionTitle title="Trending" kicker="Now" />
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <span key={topic} className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold">
                  #{topic}
                </span>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <SectionTitle title="Most Read" kicker="Audience" />
            <div className="space-y-4">
              {latestStories.slice(0, 4).map((story) => (
                <div key={story.id} className="border-b border-black/10 pb-3 last:border-0 last:pb-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-red">{story.category}</p>
                  <Link href={`/article/${story.slug}`} className="mt-1 block font-semibold leading-snug">
                    {story.headline}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <SectionTitle title="Latest News" kicker="Live Desk" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {latestStories.map((story) => (
            <StoryCard key={story.id} headline={story.headline} category={story.category} time={story.time} slug={story.slug} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {['Politics', 'Business', 'Sports'].map((section) => (
          <div key={section} className="card p-5">
            <SectionTitle title={section} kicker="Section" />
            <div className="space-y-3">
              {latestStories.slice(0, 3).map((story) => (
                <Link key={`${section}-${story.id}`} href={`/article/${story.slug}`} className="block rounded-xl border border-black/10 p-3 font-medium leading-snug hover:bg-brand-soft">
                  {story.headline}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
