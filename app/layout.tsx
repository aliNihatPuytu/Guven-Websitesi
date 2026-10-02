import type { Metadata, Viewport } from 'next';
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
        <Analytics />
      </body>
    </html>
  );
}
