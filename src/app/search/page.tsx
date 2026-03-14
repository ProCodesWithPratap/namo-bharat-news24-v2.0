import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Search page allows users to search for articles across the site.
 * When a query is present in the URL (`?q=`), the page would
 * perform a search against the Payload CMS.  Here we display
 * placeholder results and a basic search form.
 */
const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  // TODO: Perform search against CMS using the query
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">खोज</h1>
      <form className="mb-4" action="/search" method="get">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="खोजें..."
          className="border px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1">
          खोजें
        </button>
      </form>
      {query && (
        <div>
          <p className="mb-2">परिणाम: '{query}'</p>
          <ul className="space-y-2">
            <li>
              <a href="/article/sample-news-story" className="text-lg font-medium">
                खोज परिणाम उदाहरण 1
              </a>
            </li>
            <li>
              <a href="/article/second-story" className="text-lg font-medium">
                खोज परिणाम उदाहरण 2
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;