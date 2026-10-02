import type { Metadata } from 'next';
import { LoadingScreen } from '@/components/loading-screen';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { MachineCategories } from '@/components/machine-categories';
import { CatalogSection } from '@/components/catalog-section';
import { QuoteCalculator } from '@/components/quote-calculator';
import { WhyChooseUs } from '@/components/why-choose-us';
import { ReferencesMarquee } from '@/components/references-marquee';
import { AboutCompany } from '@/components/about-company';
import { CTASection } from '@/components/cta-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { HashScrollHandler } from '@/components/hash-scroll-handler';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <HashScrollHandler />
        <Hero />
        <Services />
        <MachineCategories />
        <CatalogSection />
        <ReferencesMarquee />
        <QuoteCalculator />
        <AboutCompany />
        <WhyChooseUs />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
