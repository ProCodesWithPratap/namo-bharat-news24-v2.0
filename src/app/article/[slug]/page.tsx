import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

/**
 * Article detail pages display the full content of a single article.
 * The slug is used to fetch the article from Payload CMS.  This
 * placeholder implementation shows a static article based on the slug.
 */
const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { slug } = params;
  if (!slug) {
    notFound();
  }
  // TODO: Fetch article data from CMS using slug
  return (
    <article className="prose max-w-none">
      <h1>उदाहरण लेख: {slug}</h1>
      <p>यह पृष्ठ Payload CMS से लेख सामग्री लोड करेगा।</p>
      <p>
        यह पैराग्राफ हिंदी में है, क्योंकि यह साइट हिंदी पाठकों के लिए है।
      </p>
    </article>
  );
};

export default ArticlePage;