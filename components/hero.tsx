'use client';

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
          style={{ backgroundImage: `url('/images/hero-construction.jpg')` }}
        />
        <video
          ref={videoRef}
          src={siteConfig.video.heroBackground}
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
    </section>
  );
}
