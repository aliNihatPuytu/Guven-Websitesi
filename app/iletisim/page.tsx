import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { ContactSection } from '@/components/contact-section';
import { QuoteCalculator } from '@/components/quote-calculator';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'İletişim ve Teklif – Ümraniye / İstanbul',
  description: `Güven İş ve İstif Makineleri iletişim: ${siteConfig.address.full}. Tel: ${siteConfig.phones.map((p) => p.label).join(', ')}. Makine kiralama için hızlı teklif alın.`,
  alternates: { canonical: '/iletisim' },
};

export default function ContactPage() {
  return (
    <>
      <Header solid />
      <main>
        <PageHero
          title="Bizimle İletişime Geçin"
          description="Sorularınız için bize ulaşın; uzman ekibimiz en kısa sürede geri dönecektir. Kiralama için aşağıdaki hızlı teklif formunu da kullanabilirsiniz."
          crumbs={[{ label: 'İletişim' }]}
        />
        <ContactSection showHeading={false} />
        <QuoteCalculator />
      </main>
      <Footer />
    </>
  );
}
