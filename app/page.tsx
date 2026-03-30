'use client';

import { useState } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { MachineCategories } from '@/components/machine-categories';
import { SahibindenListings } from '@/components/sahibinden-listings';
import { QuoteCalculator } from '@/components/quote-calculator';
import { WhyChooseUs } from '@/components/why-choose-us';
import { ProjectGallery } from '@/components/project-gallery';
import { AboutCompany } from '@/components/about-company';
import { CTASection } from '@/components/cta-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const [siteVisible, setSiteVisible] = useState(false);

  return (
    <>
      {!siteVisible && <LoadingScreen onComplete={() => setSiteVisible(true)} />}
      {siteVisible && (
        <main className="min-h-screen">
          <Header />
          <Hero />
          <Services />
          <MachineCategories />
          <SahibindenListings />
          <QuoteCalculator />
          <WhyChooseUs />
          <ProjectGallery />
          <AboutCompany />
          <CTASection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  );
}
