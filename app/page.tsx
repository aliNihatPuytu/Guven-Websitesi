'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/loading-screen';
import { VideoIntro } from '@/components/video-intro';
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

const VIDEO_SHOWN_KEY = 'guven_video_shown';

export default function Home() {
  const [phase, setPhase] = useState<'loading' | 'video' | 'site'>('loading');

  const handleLoadingComplete = () => {
    // Check if user has already seen the video this session
    const alreadySeen = sessionStorage.getItem(VIDEO_SHOWN_KEY);
    if (alreadySeen) {
      setPhase('site');
    } else {
      setPhase('video');
    }
  };

  const handleVideoClose = () => {
    sessionStorage.setItem(VIDEO_SHOWN_KEY, '1');
    setPhase('site');
  };

  return (
    <>
      {/* 1. Loading Screen (logo only) */}
      {phase === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* 2. Video Intro (shown once per session) */}
      <AnimatePresence>
        {phase === 'video' && (
          <VideoIntro onClose={handleVideoClose} />
        )}
      </AnimatePresence>

      {/* 3. Main Site */}
      {phase === 'site' && (
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
