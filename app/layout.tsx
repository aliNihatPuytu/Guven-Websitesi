import type { Metadata, Viewport } from 'next'
import { Tenor_Sans, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const tenorSans = Tenor_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tenor-sans',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Güven İş ve İstif Makinaları | 1978\'den Beri Güvenilir Çözümler',
    template: '%s | Güven İş ve İstif Makinaları',
  },
  description: 'Güven İş ve İstif Makinaları - 1978\'den beri iş ve istif makineleri satış, kiralama, yedek parça ve teknik destek hizmetleri. İstanbul Ümraniye.',
  keywords: [
    'iş makinası kiralama',
    'istif makinası',
    'forklift kiralama',
    'ekskavatör kiralama',
    'yedek parça',
    'teknik destek',
    'güven iş makinaları',
    'ümraniye makina',
    'istanbul iş makinaları',
    'makina satışı',
  ],
  authors: [{ name: 'Güven İş ve İstif Makinaları', url: 'https://guvenismakina.com' }],
  creator: 'Güven İş ve İstif Makinaları',
  publisher: 'Güven İş ve İstif Makinaları',
  metadataBase: new URL('https://guvenismakina.com'),
  openGraph: {
    title: 'Güven İş ve İstif Makinaları | 1978\'den Beri Güvenilir Çözümler',
    description: 'Güven İş ve İstif Makinaları - Satış, kiralama, yedek parça ve teknik destek.',
    url: 'https://guvenismakina.com',
    siteName: 'Güven İş ve İstif Makinaları',
    type: 'website',
    locale: 'tr_TR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E5AA8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${tenorSans.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
