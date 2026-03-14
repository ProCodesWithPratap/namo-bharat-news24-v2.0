import { notFound } from 'next/navigation';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

/**
 * Author pages display information about a single contributor as well
 * as a list of their articles.  The slug is used to fetch the author
 * from Payload CMS.  In this placeholder we show static data.
 */
const AuthorPage = async ({ params }: AuthorPageProps) => {
  const { slug } = params;
  if (!slug) {
    notFound();
  }
  // TODO: Fetch author data and their articles from CMS using slug
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">लेखक: {slug}</h1>
      <p className="mb-4">लेखक का विवरण यहाँ दिखाई देगा।</p>
      <h2 className="text-xl font-bold mb-2">लेखक के लेख</h2>
      <ul className="space-y-2">
        <li>
          <a href="/article/sample-news-story" className="text-lg font-medium">
            उदाहरण लेख 1
          </a>
        </li>
        <li>
          <a href="/article/second-story" className="text-lg font-medium">
            उदाहरण लेख 2
          </a>
        </li>
      </ul>
    </section>
  );
};

export default AuthorPage;