import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

/**
 * Category archive pages display a list of articles belonging to a
 * category.  This component receives the category slug via route
 * parameters and would fetch the category and its articles from
 * Payload CMS.  For now it renders a placeholder based on the slug.
 */
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = params;
  // TODO: Fetch category and its articles from CMS using slug
  // Example: const res = await fetch(`/api/categories/${slug}`);
  // const category = await res.json();
  if (!slug) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">श्रेणी: {slug}</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/article/sample-news-story" className="text-lg font-medium">
            इस श्रेणी का पहला उदाहरण लेख
          </Link>
        </li>
        <li>
          <Link href="/article/second-story" className="text-lg font-medium">
            इस श्रेणी का दूसरा उदाहरण लेख
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryPage;