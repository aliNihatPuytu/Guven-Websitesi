import type { Metadata, Viewport } from 'next';
<<<<<<< HEAD
import { Analytics } from '@vercel/analytics/next';
import { LanguageProvider } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';
import { machines } from '@/lib/machine-data';
import './globals.css';

const TITLE = 'Güven İş ve İstif Makineleri | İş Makinesi Kiralama, Satış ve Servis – İstanbul';
const DESCRIPTION =
  "1978'den bu yana İstanbul Ümraniye'de ekskavatör, mini ekskavatör, forklift, yükleyici, greyder ve silindir kiralama, satış, yedek parça ve teknik servis hizmetleri. 45+ yıllık tecrübe.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: TITLE,
    template: '%s | Güven İş ve İstif Makineleri',
  },
  description: DESCRIPTION,
  keywords: [
    'iş makinesi kiralama',
    'iş makinesi kiralama istanbul',
    'ekskavatör kiralama',
    'mini ekskavatör kiralama',
    'forklift kiralama istanbul',
    'lastikli yükleyici kiralama',
    'greyder kiralama',
    'toprak silindiri kiralama',
    'istif makinesi kiralama',
    'iş makinesi satış',
    'iş makinesi yedek parça',
    'ümraniye iş makineleri',
    'güven iş makineleri',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'business',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
=======
import { Josefin_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { LanguageProvider } from '@/contexts/language-context';
import './globals.css';

// ─── Kurumsal Fontlar — Türkçe Karakter Destekli ──────────────────────────────
//
// BAŞLIK FONTU: Josefin Sans
//   → Tenor Sans'ın görsel estetiğine (geometrik, zarif, ince) en yakın font
//   → Tüm Türkçe karakterleri destekler: ı ğ ü ş ç ö İ Ğ Ü Ş Ç Ö
//   → latin-ext subsetiyle yükleniyor
//
// GÖVDE FONTU: Plus Jakarta Sans
//   → Century Gothic benzeri modern geometric sans-serif
//   → Tüm Türkçe karakterleri destekler
//   → latin-ext subsetiyle yükleniyor, çoklu ağırlık desteği
//
const josefinSans = Josefin_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const siteUrl = 'https://www.guvenismakine.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Güven İş ve İstif Makineleri | Forklift & Ekskavatör Kiralama İstanbul',
    template: '%s | Güven İş ve İstif Makineleri',
  },
  description:
    "1978'den bu yana İstanbul Ümraniye'de forklift, ekskavatör, mini ekskavatör ve istif makinesi kiralama, satış ve servis hizmetleri. 45+ yıllık tecrübe, geniş makine filosu, hızlı teslimat.",
  keywords: [
    'forklift kiralama istanbul',
    'ekskavatör kiralama istanbul',
    'iş makinesi kiralama',
    'istif makinesi kiralama',
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
  authors: [{ name: 'Güven İş ve İstif Makineleri', url: siteUrl }],
  creator: 'Güven İş ve İstif Makineleri',
  publisher: 'Güven İş ve İstif Makineleri',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Güven İş ve İstif Makineleri | Forklift & Ekskavatör Kiralama İstanbul',
    description: "İstanbul'da forklift, ekskavatör ve istif makinesi kiralama, satış ve teknik servis. 1978'den bu yana 45+ yıllık tecrübeyle güvenilir çözüm ortağınız.",
    url: siteUrl,
    siteName: 'Güven İş ve İstif Makineleri',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Güven İş ve İstif Makineleri  — Forklift & Ekskavatör Kiralama',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Güven İş ve İstif Makineleri',
    description: "İstanbul'da forklift, ekskavatör ve istif makinesi kiralama ve satış.",
    images: ['/images/og-image.jpg'],
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
<<<<<<< HEAD
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
=======
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo-blue.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
    shortcut: '/favicon.ico',
  },
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
<<<<<<< HEAD
  viewportFit: 'cover',
  themeColor: '#1E5AA8',
};

// ─── Yapısal veri (schema.org) ──────────────────────────────────────────────
// Google'da kurumsal görünüm (sitelinks, bilgi kartı, logo) için.
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  alternateName: ['Güven İş Makineleri', 'Güven İş Makinaları', 'Güven Makina'],
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/guven-blue.png`,
  image: `${siteConfig.url}/og-image.jpg`,
  description: DESCRIPTION,
  foundingDate: String(siteConfig.foundingYear),
  telephone: siteConfig.phones[0].e164,
  email: siteConfig.email,
  priceRange: '₺₺',
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.district,
    addressRegion: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.address.geo.lat,
    longitude: siteConfig.address.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  contactPoint: siteConfig.phones.map((p) => ({
    '@type': 'ContactPoint',
    telephone: p.e164,
    contactType: 'customer service',
    areaServed: 'TR',
    availableLanguage: ['Turkish', 'English'],
  })),
  sameAs: Object.values(siteConfig.social),
  areaServed: { '@type': 'Country', name: 'Türkiye' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Makine Grupları',
    url: `${siteConfig.url}/katalog`,
    itemListElement: machines.map((m) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: m.title,
        description: m.shortDesc,
        image: `${siteConfig.url}${m.image}`,
        url: `${siteConfig.url}/makineler/${m.id}`,
      },
    })),
  },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  inLanguage: 'tr-TR',
  publisher: { '@id': `${siteConfig.url}/#organization` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        {/* Yerel fontlar: Google Fonts'a bağımlılık yok; ilk boyama için ön yükleme */}
        <link rel="preload" href="/fonts/archivo-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/plus-jakarta-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
=======
  themeColor: '#1E5AA8',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${josefinSans.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Güven İş ve İstif Makineleri',
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
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
        <Analytics />
      </body>
    </html>
  );
}
