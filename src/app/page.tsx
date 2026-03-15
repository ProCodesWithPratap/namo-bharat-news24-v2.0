import Link from 'next/link'
import { getHomepageData } from '@/lib/data'

const dateFormatter = new Intl.DateTimeFormat('hi-IN', {
  dateStyle: 'medium',
  timeStyle: 'short'
})

const HomePage = async () => {
  const data = await getHomepageData()

  return (
    <section className="space-y-6">
      <div className="rounded-md bg-yellow-100 px-4 py-2 text-sm font-semibold">{data.breaking}</div>

      <article className="rounded-lg border border-gray-200 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-red-600">{data.featured.category.name}</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
          <Link href={`/article/${data.featured.slug}`}>{data.featured.title}</Link>
        </h1>
        <p className="mt-3 text-gray-700">{data.featured.excerpt}</p>
        <p className="mt-3 text-sm text-gray-500">
          {data.featured.authors[0]?.name} · {dateFormatter.format(new Date(data.featured.publishedAt))}
        </p>
      </article>

      <div>
        <h2 className="mb-3 text-xl font-bold">ताज़ा खबरें</h2>
        <ul className="space-y-3">
          {data.latest.map((story) => (
            <li key={story.id} className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs font-semibold uppercase text-red-600">{story.category.name}</p>
              <Link href={`/article/${story.slug}`} className="mt-1 block text-lg font-medium leading-snug">
                {story.title}
              </Link>
              <p className="mt-1 text-sm text-gray-600">{story.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomePage
