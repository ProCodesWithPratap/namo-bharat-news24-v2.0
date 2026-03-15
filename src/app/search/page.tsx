import Link from 'next/link'
import { searchArticles } from '@/lib/data'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams
  const query = q || ''
  const results = await searchArticles(query)

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">खोज</h1>
      <form className="mb-4" action="/search" method="get">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="खोजें..."
          className="mr-2 rounded border px-2 py-1"
        />
        <button type="submit" className="rounded bg-blue-600 px-4 py-1 text-white">
          खोजें
        </button>
      </form>

      {query ? (
        <div>
          <p className="mb-2">परिणाम: '{query}'</p>
          <ul className="space-y-2">
            {results.map((result) => (
              <li key={result.id} className="rounded-lg border border-gray-200 p-3">
                <Link href={`/article/${result.slug}`} className="text-lg font-medium">
                  {result.title}
                </Link>
                <p className="text-sm text-gray-600">{result.excerpt}</p>
              </li>
            ))}
            {!results.length && <li className="text-sm text-gray-500">कोई परिणाम नहीं मिला।</li>}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default SearchPage
