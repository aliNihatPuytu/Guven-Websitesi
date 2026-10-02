import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { AboutCompany } from '@/components/about-company';
import { WhyChooseUs } from '@/components/why-choose-us';
import { ReferencesMarquee } from '@/components/references-marquee';
import { CTASection } from '@/components/cta-section';

export const metadata: Metadata = {
  title: 'Hakkımızda – 1978’den Bu Yana Güvenle Hizmet',
  description:
    'Güven İş ve İstif Makineleri 1978’den bu yana İstanbul’da iş ve istif makineleri satış, kiralama, yedek parça ve servis hizmetleri sunmaktadır. Misyonumuz, vizyonumuz ve tanıtım filmimiz.',
  alternates: { canonical: '/hakkimizda' },
};

export default function AboutPage() {
  return (
    <>
      <Header solid />
      <main>
        <PageHero
          title="1978’den Bu Yana Güvenle Hizmet"
          description="Kurulduğumuz günden bu yana edindiğimiz tecrübe ve güven anlayışıyla müşterilerimize kaliteli, hızlı ve sürdürülebilir çözümler sunuyoruz."
          crumbs={[{ label: 'Hakkımızda' }]}
          image="/images/about-company.jpg"
        />
        <AboutCompany full />
        <WhyChooseUs />
        <ReferencesMarquee />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
