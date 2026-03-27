'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '45+', label: 'Yıl Deneyim' },
  { value: '500+', label: 'Tamamlanan Proje' },
  { value: '100+', label: 'Makine Filosu' },
  { value: '50+', label: 'Uzman Kadro' },
];

export function Hero() {
  const scrollToNext = () => {
    document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero-construction.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545]/90 via-[#1E5AA8]/75 to-[#0B2545]/85" />
      </div>

      {/* Floating accent shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-white/5 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full border border-white/5 animate-pulse" style={{ animationDuration: '6s' }} />
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
          className="inline-block text-xs font-semibold text-white/60 tracking-widest uppercase mb-6 px-4 py-2 border border-white/15 rounded-full backdrop-blur-sm"
        >
          1978'den Beri İstanbul'da
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6 text-balance"
        >
          Güvenilir İş ve İstif<br className="hidden md:block" /> Makinaları
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Satış, kiralama, yedek parça ve teknik destek hizmetlerinde İstanbul'un güvenilir çözüm ortağı.
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
            className="bg-[#1E5AA8] hover:bg-[#164a8a] text-white px-8 py-6 text-base font-medium shadow-2xl shadow-[#1E5AA8]/40"
          >
            <Link href="/#makinalar">Makinaları İncele</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-base font-medium bg-transparent backdrop-blur-sm"
          >
            <Link href="/#teklif">Teklif Al</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 bg-[#0B2545]/95 backdrop-blur-sm z-10 border-t border-white/8"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-5 sm:py-6 px-4 text-center ${i < stats.length - 1 ? 'border-r border-white/10' : ''}`}
              >
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        onClick={scrollToNext}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer z-20"
        aria-label="Aşağı kaydır"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
