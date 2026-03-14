import Link from 'next/link';

/**
 * The home page displays the latest articles and breaking news.  In a
 * full implementation this component would fetch content from the
 * Payload CMS using `fetch` inside `getServerSideProps` or an
 * API route.  Here we provide a placeholder layout and sample
 * structure.
 */
const HomePage = async () => {
  // TODO: Fetch the latest articles, categories and breaking news from
  // Payload CMS.  Example (server‑side):
  // const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?limit=5`);
  // const { docs: articles } = await res.json();
  return (
    <section className="space-y-8">
      {/* Breaking News Ticker */}
      <div className="bg-yellow-200 py-2 px-4 font-semibold overflow-hidden whitespace-nowrap">
        ब्रेकिंग न्यूज़: साइट निर्माण जारी है…
      </div>

      {/* Latest Articles */}
      <div>
        <h2 className="text-xl font-bold mb-4">ताज़ा खबरें</h2>
        <ul className="space-y-4">
          {/* Sample static articles; replace with dynamic content */}
          <li className="border-b pb-2">
            <Link href="/article/sample-news-story" className="text-lg font-medium">
              यह एक नमूना समाचार लेख है
            </Link>
            <p className="text-sm text-gray-600">एक उदाहरण परिचय…</p>
          </li>
          <li className="border-b pb-2">
            <Link href="/article/second-story" className="text-lg font-medium">
              दूसरा समाचार शीर्षक यहाँ
            </Link>
            <p className="text-sm text-gray-600">दूसरे लेख का परिचय…</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomePage;