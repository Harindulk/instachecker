import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InstaChecker - Find Who Doesn\'t Follow You Back',
  description: 'A privacy-focused tool to find Instagram accounts that don\'t follow you back. All processing happens locally in your browser.',
  keywords: 'Instagram, followers, following, unfollowers, social media, Instagram analytics',
  openGraph: {
    title: 'InstaChecker - Find Who Doesn\'t Follow You Back',
    description: 'Free tool to check who doesn\'t follow you back on Instagram. Privacy-focused, works locally in your browser.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaChecker - Find Who Doesn\'t Follow You Back',
    description: 'Free tool to check who doesn\'t follow you back on Instagram. Privacy-focused, works locally in your browser.',
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}
