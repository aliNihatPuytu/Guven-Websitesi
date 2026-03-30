import type { Metadata, Viewport } from 'next';
import { Tenor_Sans, Open_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { LanguageProvider } from '@/contexts/language-context';
import './globals.css';

// ─── Kurumsal Fontlar (Marka Kılavuzu) ────────────────────────────────────────
// Birincil: Tenor Sans (başlıklar, logo metni)
const tenorSans = Tenor_Sans({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  display: 'swap',
});

// İkincil: Open Sans → Century Gothic'e en yakın Google Font
const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const siteUrl = 'https://www.guvenismakine.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Güven İş ve İstif Makinaları | Forklift & Ekskavatör Kiralama İstanbul',
    template: '%s | Güven İş ve İstif Makinaları',
  },
  description:
    '1978\'den bu yana İstanbul Ümraniye\'de forklift, ekskavatör, mini ekskavatör ve istif makinesi kiralama, satış ve servis hizmetleri. 45+ yıllık tecrübe, geniş makine filosu, hızlı teslimat.',
  keywords: [
    'forklift kiralama istanbul',
    'ekskavatör kiralama istanbul',
    'iş makinası kiralama',
    'istif makinası kiralama',
    'mini ekskavatör kiralama',
    'yükleyici kiralama',
    'yedek parça iş makinaları',
    'güven iş makinaları',
    'ümraniye makina kiralama',
    'istanbul iş makinaları',
    'reach truck kiralama',
    'forklift satış',
    'makina satışı istanbul',
    '1978 makina firması',
  ],
  authors: [{ name: 'Güven İş ve İstif Makinaları', url: siteUrl }],
  creator: 'Güven İş ve İstif Makinaları',
  publisher: 'Güven İş ve İstif Makinaları',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Güven İş ve İstif Makinaları | Forklift & Ekskavatör Kiralama İstanbul',
    description: "İstanbul'da forklift, ekskavatör ve istif makinesi kiralama, satış ve teknik servis. 1978'den bu yana 45+ yıllık tecrübeyle güvenilir çözüm ortağınız.",
    url: siteUrl,
    siteName: 'Güven İş ve İstif Makinaları',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Güven İş ve İstif Makinaları — Forklift & Ekskavatör Kiralama',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Güven İş ve İstif Makinaları',
    description: "İstanbul'da forklift, ekskavatör ve istif makinesi kiralama ve satış.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/logo-blue.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.ico' },
    ],
    apple: '/images/logo-blue.png',
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E5AA8',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${tenorSans.variable} ${openSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Güven İş ve İstif Makinaları',
              description: "İstanbul'da forklift, ekskavatör ve istif makinesi kiralama, satış ve teknik servis. 1978'den bu yana.",
              url: siteUrl,
              telephone: ['+902163141294', '+905322975813'],
              email: 'info@guvenismakine.com',
              foundingDate: '1978',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Esenşehir Mahallesi, Gündeş Sokak No:14',
                addressLocality: 'Ümraniye',
                addressRegion: 'İstanbul',
                postalCode: '34776',
                addressCountry: 'TR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 41.01789,
                longitude: 29.10588,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                  opens: '08:00',
                  closes: '18:00',
                },
              ],
              sameAs: ['https://www.instagram.com/guvenismakine'],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
