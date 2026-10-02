import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { MachineCategories } from '@/components/machine-categories';
import { CatalogSection } from '@/components/catalog-section';
import { CTASection } from '@/components/cta-section';

export const metadata: Metadata = {
  title: 'Makineler – Ekskavatör, Mini Ekskavatör, Forklift, Yükleyici, Greyder, Silindir',
  description:
    'Güven İş ve İstif Makineleri makine grupları: 10–70 ton ekskavatör, 1,5–6 ton mini ekskavatör, 18–28 ton lastikli yükleyici, 13–20 ton toprak silindiri, greyder ve forklift. Kiralama ve satış için inceleyin.',
  alternates: { canonical: '/makineler' },
};

export default function MachinesPage() {
  return (
    <>
      <Header solid />
      <main>
        <PageHero
          title="Makine Gruplarımız"
          description="Her türlü inşaat, altyapı ve lojistik projeniz için doğru ekipmanı sunuyoruz. Grubu seçin, kapasite ve teknik özellikleri inceleyin, teklif alın."
          crumbs={[{ label: 'Makineler' }]}
          image="/images/machines/ekskavator.jpg"
        />
        <MachineCategories showHeading={false} />
        <CatalogSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
