import type { Metadata, Viewport } from 'next'
import { Tenor_Sans, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const tenorSans = Tenor_Sans({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-tenor-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GÜVEN İş ve İstif Makinaları | 1978\'den Beri Güvenilir Çözümler',
  description: 'GÜVEN İş ve İstif Makinaları - 1978\'den beri iş makinası kiralama, satış ve hafriyat hizmetleri. Ekskavatör, forklift, yükleyici kiralama ve satış.',
  keywords: ['iş makinası kiralama', 'ekskavatör kiralama', 'forklift kiralama', 'hafriyat hizmetleri', 'inşaat makinaları', 'makina satışı'],
  authors: [{ name: 'GÜVEN İş ve İstif Makinaları' }],
  creator: 'GÜVEN İş ve İstif Makinaları',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://guvenmakinaları.com',
    siteName: 'GÜVEN İş ve İstif Makinaları',
    title: 'GÜVEN İş ve İstif Makinaları | 1978\'den Beri Güvenilir Çözümler',
    description: 'GÜVEN İş ve İstif Makinaları - 1978\'den beri iş makinası kiralama, satış ve hafriyat hizmetleri.',
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
    <html lang="tr" className={`${tenorSans.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
