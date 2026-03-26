'use client';

import { useState } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { MachineCategories } from '@/components/machine-categories';
import { QuoteCalculator } from '@/components/quote-calculator';
import { WhyChooseUs } from '@/components/why-choose-us';
import { ProjectGallery } from '@/components/project-gallery';
import { AboutCompany } from '@/components/about-company';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setContentVisible(true)} />
      {contentVisible && (
        <main className="min-h-screen">
          <Header />
          <Hero />
          <Services />
          <MachineCategories />
          <QuoteCalculator />
          <WhyChooseUs />
          <ProjectGallery />
          <AboutCompany />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  );
}
