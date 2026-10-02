import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { CatalogFlipbook } from '@/components/catalog-flipbook';
import { CatalogView, catalogSections } from '@/components/catalog-view';
import { CTASection } from '@/components/cta-section';
import { machines } from '@/lib/machine-data';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Makine Kataloğu – Güven İş ve İstif Makineleri (PDF)',
  description:
    'Güven İş ve İstif Makineleri 2026 makine kataloğu: ekskavatör, mini ekskavatör, toprak silindiri, lastikli yükleyici, greyder, forklift ve istif grupları, projelerimiz ve iletişim bilgilerimiz. Sayfa sayfa inceleyin veya PDF indirin.',
  alternates: { canonical: '/katalog' },
  openGraph: { images: [{ url: '/katalog/pages/page-01.jpg', width: 1241, height: 1755 }] },
};

export default function CatalogPage() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Güven Makine Kataloğu',
    url: `${siteConfig.url}/katalog`,
    numberOfItems: machines.length,
    itemListElement: machines.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.title,
      url: `${siteConfig.url}/makineler/${m.id}`,
      image: `${siteConfig.url}${m.image}`,
    })),
  };
  const docLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: 'Güven İş ve İstif Makineleri – Makine Kataloğu',
    url: `${siteConfig.url}${siteConfig.catalogPdf}`,
    encodingFormat: 'application/pdf',
    inLanguage: 'tr-TR',
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(docLd) }} />
      <Header solid />
      <main>
        <PageHero
          title="Makine Kataloğu"
          description="Basılı kataloğumuzu sayfa sayfa çevirerek inceleyin. Bölümler arasında geçiş yapabilir, tam ekranda görüntüleyebilir ve PDF olarak indirebilirsiniz."
          crumbs={[{ label: 'Katalog' }]}
          image="/images/machines/lastikli-yukleyici.jpg"
        />

        {/* Katalog görüntüleyici — hero ile aynı koyu zeminde devam eder */}
        <section id="katalog-goruntuleyici" className="bg-ink pb-16 lg:pb-24 scroll-mt-20">
          <div className="container-x -mt-6 sm:-mt-8 relative z-10">
            <CatalogFlipbook sections={catalogSections} />
          </div>
        </section>

        <CatalogView />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
