'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

export function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const stats = [
    { value: '45+', labelKey: 'hero.stat.experience' },
    { value: '500+', labelKey: 'hero.stat.projects' },
    { value: '100+', labelKey: 'hero.stat.fleet' },
  ];

  const scrollToNext = () => {
    document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video + fallback */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero-construction.jpg')` }}
        />
        <video
          ref={videoRef}
          src="/videos/tanitim.mp4"
          poster="/images/hero-construction.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545]/88 via-[#1E5AA8]/60 to-[#0B2545]/82" />
      </div>

      {/* Mute button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={toggleMute}
        className="absolute top-24 right-6 z-20 p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/85 hover:text-white hover:bg-white/20 transition-all"
        title={isMuted ? 'Sesi aç' : 'Sesi kapat'}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </motion.button>

      {/* Decorative rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-white/4 animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full border border-white/4 animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 text-center w-full pt-24 pb-36"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block text-xs font-semibold text-white/75 tracking-widest uppercase mb-6 px-4 py-2 border border-white/20 rounded-full backdrop-blur-sm"
        >
          {t('hero.badge')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-white text-[#1E5AA8] hover:bg-white/92 px-8 py-6 text-base font-semibold shadow-2xl"
          >
            <Link href="/#makinalar">{t('hero.cta.machines')}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white/12 hover:border-white/70 px-8 py-6 text-base font-medium bg-transparent backdrop-blur-sm"
          >
            <Link href="/#teklif">{t('hero.cta.quote')}</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Bar — 3 items only (Uzman Kadro kaldırıldı) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 bg-[#0B2545]/96 backdrop-blur-sm z-10 border-t border-white/8"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.labelKey}
                className={`py-5 sm:py-6 px-4 text-center ${i < stats.length - 1 ? 'border-r border-white/10' : ''}`}
              >
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        onClick={scrollToNext}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer z-20"
        aria-label="Aşağı kaydır"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
