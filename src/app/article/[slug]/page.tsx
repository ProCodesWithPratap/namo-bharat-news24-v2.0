import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = slug.replace(/-/g, ' ')
  return buildMetadata(title, `Article page for ${title}.`, `/article/${slug}`)
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = slug.replace(/-/g, ' ')

  return (
    <article className="container-shell py-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">National · Kolkata</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-brand-ink">{title}</h1>
        <p className="mt-4 text-lg text-black/70">
          This is the article template. Replace this with rich text from Payload, related stories blocks, structured data, and sponsored labels where required.
        </p>
        <div className="mt-6 h-80 rounded-3xl bg-gradient-to-br from-brand-red to-black" />
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-black/60">
          <span>By Editorial Desk</span>
          <span>Updated March 14, 2026</span>
          <span>5 min read</span>
        </div>
        <div className="prose prose-lg mt-8 max-w-none prose-headings:font-black prose-p:text-black/80">
          <p>
            A production article page should support long-form reporting, inline media, related links, FAQ blocks, live update modules, fact boxes, and clean share metadata.
          </p>
          <p>
            Keep the layout strict. News pages win on readability, speed, and discipline — not chaos.
          </p>
          <h2>Why this template matters</h2>
          <p>
            It gives you the structure needed for SEO, editorial clarity, and future CMS integration without waiting for the full backend.
          </p>
        </div>
      </div>
    </article>
  )
}
