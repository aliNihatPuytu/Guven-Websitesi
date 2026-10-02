'use client';

<<<<<<< HEAD
import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';
import { Counter } from '@/components/ui/reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t, locale } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const stats = [
    { value: 45, suffix: '+', label: t('hero.stat.experience') },
    { value: 500, suffix: '+', label: t('hero.stat.projects') },
    { value: 30, suffix: '+', label: t('hero.stat.fleet') },
  ];

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col bg-ink text-white overflow-hidden">
      {/* Arka plan: video + fallback görsel + kademeli karartma */}
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center"
=======
import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { scrollToPageSection } from '@/lib/section-navigation';

export function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const stats = [
    { value: '45+', labelKey: 'hero.stat.experience' },
    { value: '500+', labelKey: 'hero.stat.projects' },
    { value: '30+', labelKey: 'hero.stat.fleet' },
  ];

  const scrollToNext = () => {
    document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuoteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (scrollToPageSection('teklif')) {
      event.preventDefault();
    }
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
          style={{ backgroundImage: `url('/images/hero-construction.jpg')` }}
        />
        <video
          ref={videoRef}
<<<<<<< HEAD
          src={siteConfig.video.file}
          poster="/images/hero-construction.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div className="absolute inset-0 grid-texture opacity-70" />
      </div>

      {/* Ses kontrolü */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={toggleMute}
        className="absolute right-4 sm:right-6 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/85 hover:bg-white/20 transition-colors"
        style={{ top: 'calc(var(--header-h) + 1rem + env(safe-area-inset-top, 0px))' }}
        aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </motion.button>

      {/* İçerik */}
      <div className="relative z-10 flex-1 flex items-center container-x" style={{ paddingTop: 'calc(var(--header-h) + 2rem)' }}>
        <div className="max-w-3xl py-10 sm:py-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="inline-flex items-center gap-3 text-sm sm:text-[0.9375rem] font-medium text-white/75"
          >
            <span className="inline-block w-8 h-px bg-brand-light" />
            {t('hero.badge')}
          </motion.p>

          <h1 className="mt-5 font-heading font-bold leading-[0.98] text-[2.75rem] xs:text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            {['Güven', locale === 'tr' ? 'İş ve İstif' : 'Material Handling', locale === 'tr' ? 'Makineleri' : 'Equipment'].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: EASE }}
                  className={`block ${i === 0 ? 'text-white' : 'text-white/90'}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <span className="draw-line block mt-5 h-[3px] w-24 rounded-full bg-brand-light" aria-hidden />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed max-w-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="mt-8 flex flex-col xs:flex-row gap-3"
          >
            <Link
              href="/makineler"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-white text-ink font-semibold hover:bg-brand-light hover:text-white transition-colors"
            >
              {t('hero.cta.machines')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/iletisim#teklif"
              className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 text-white font-medium hover:bg-white/10 hover:border-white/60 transition-colors backdrop-blur-sm"
            >
              {t('hero.cta.quote')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* İstatistikler — akış içinde, içerikle çakışmaz */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        className="relative z-10 container-x pb-8 sm:pb-10"
        style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="grid grid-cols-3 border-t border-white/15 pt-6 sm:pt-8 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-none tabular-nums">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-white/60 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Kaydırma ipucu — yalnızca geniş ekranda */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="hidden lg:flex absolute bottom-10 right-8 z-10 flex-col items-center gap-2 text-white/50"
        aria-hidden
      >
        <span className="text-[0.6875rem] tracking-widest uppercase rotate-90 origin-center translate-y-3">scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="mt-6">
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </motion.div>
=======
          src="/videos/guven_video.MP4"
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
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed whitespace-pre-line"
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
            <Link href="/#teklif" onClick={handleQuoteClick}>{t('hero.cta.quote')}</Link>
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
    </section>
  );
}
