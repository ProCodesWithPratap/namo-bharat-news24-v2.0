import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: 'हिंदी-फर्स्ट तेज़ और भरोसेमंद समाचार प्लेटफ़ॉर्म।',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'hi_IN'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4 py-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
