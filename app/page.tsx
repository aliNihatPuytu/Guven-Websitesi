<<<<<<< HEAD
import type { Metadata } from 'next';
=======
'use client';

import { useState } from 'react';
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
import { LoadingScreen } from '@/components/loading-screen';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { MachineCategories } from '@/components/machine-categories';
<<<<<<< HEAD
import { CatalogSection } from '@/components/catalog-section';
=======
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
import { QuoteCalculator } from '@/components/quote-calculator';
import { WhyChooseUs } from '@/components/why-choose-us';
import { ReferencesMarquee } from '@/components/references-marquee';
import { AboutCompany } from '@/components/about-company';
import { CTASection } from '@/components/cta-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { HashScrollHandler } from '@/components/hash-scroll-handler';

<<<<<<< HEAD
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
=======
export default function Home() {
  const [siteVisible, setSiteVisible] = useState(false);

  return (
    <>
      {!siteVisible && <LoadingScreen onComplete={() => setSiteVisible(true)} />}
      {siteVisible && (
        <main className="min-h-screen">
          <HashScrollHandler />
          <Header />
          <Hero />
          <Services />
          <MachineCategories />
          <QuoteCalculator />
          <WhyChooseUs />
          <ReferencesMarquee />
          <AboutCompany />
          <CTASection />
          <ContactSection />
          <Footer />
        </main>
      )}
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
    </>
  );
}
