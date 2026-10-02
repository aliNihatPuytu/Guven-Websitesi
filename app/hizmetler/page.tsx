import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { ServicesDetail } from '@/components/services-detail';
import { WhyChooseUs } from '@/components/why-choose-us';
import { CTASection } from '@/components/cta-section';

export const metadata: Metadata = {
  title: 'Hizmetler – İş Makinesi Kiralama, Satış, Yedek Parça ve Servis',
  description:
    'İstanbul’da iş ve istif makinesi kiralama, sıfır ve ikinci el makine satışı, yedek parça tedariki ve teknik servis. 1978’den bu yana Güven İş ve İstif Makineleri.',
  alternates: { canonical: '/hizmetler' },
};

export default function ServicesPage() {
  return (
    <>
      <Header solid />
      <main>
        <PageHero
          title="Kapsamlı Makine Çözümleri"
          description="Kiralama, satış, yedek parça ve teknik destek: 45 yılı aşkın tecrübemizle iş ve istif makineleri alanında ihtiyacınız olan her hizmeti tek çatı altında sunuyoruz."
          crumbs={[{ label: 'Hizmetler' }]}
          image="/images/machines/toprak-silindiri.jpg"
        />
        <ServicesDetail />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
