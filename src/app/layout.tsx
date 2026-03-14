import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Namo Bharat News',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Namo Bharat News – your trusted source for Hindi news',
};

/**
 * The root layout defines the overall structure of every page.  It wraps
 * each page with the site header and footer and sets the document
 * language to Hindi (`lang="hi"`).  It also imports global styles via
 * Tailwind CSS.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}