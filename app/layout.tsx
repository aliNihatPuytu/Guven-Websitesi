import type { Metadata, Viewport } from 'next';
import { Tenor_Sans, Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const tenorSans = Tenor_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tenor-sans',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Güven İş ve İstif Makinaları | 1978\'den Beri Güvenilir Çözümler',
    template: '%s | Güven İş ve İstif Makinaları',
  },
  description: '1978\'den bu yana İstanbul\'da iş ve istif makineleri satış, kiralama, yedek parça ve teknik destek hizmetleri. Ekskavatör, forklift, istif makinesi ve daha fazlası. Ümraniye / İstanbul.',
  keywords: [
    'iş makinası kiralama',
    'istif makinası kiralama',
    'forklift kiralama',
    'ekskavatör kiralama',
    'yedek parça iş makinaları',
    'teknik destek iş makinaları',
    'güven iş makinaları',
    'güven istif makinaları',
    'ümraniye makina kiralama',
    'istanbul iş makinaları',
    'makina satışı istanbul',
    'iş makinası satışı',
    'reach truck kiralama',
    'mini ekskavatör kiralama',
    '1978 makina firması',
  ],
  authors: [{ name: 'Güven İş ve İstif Makinaları', url: 'https://guvenismakina.com' }],
  creator: 'Güven İş ve İstif Makinaları',
  publisher: 'Güven İş ve İstif Makinaları',
  metadataBase: new URL('https://guvenismakina.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Güven İş ve İstif Makinaları | 1978\'den Beri Güvenilir Çözümler',
    description: '1978\'den bu yana iş ve istif makineleri satış, kiralama, yedek parça ve teknik destek. İstanbul Ümraniye.',
    url: 'https://guvenismakina.com',
    siteName: 'Güven İş ve İstif Makinaları',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Güven İş ve İstif Makinaları - 1978\'den Beri Güvenilir Çözümler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Güven İş ve İstif Makinaları',
    description: '1978\'den beri iş ve istif makineleri satış, kiralama, yedek parça ve teknik destek.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo-blue.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E5AA8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${tenorSans.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
