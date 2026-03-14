import Link from 'next/link'

type StoryCardProps = {
  headline: string
  category: string
  time?: string
  slug: string
}

export function StoryCard({ headline, category, time, slug }: StoryCardProps) {
  return (
    <article className="card p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-red">{category}</p>
      <h3 className="mt-2 text-lg font-bold leading-snug text-brand-ink">
        <Link href={`/article/${slug}`}>{headline}</Link>
      </h3>
      {time ? <p className="mt-3 text-sm text-black/60">{time}</p> : null}
    </article>
  )
}
