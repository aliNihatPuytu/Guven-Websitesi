'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '45+', label: 'Yıl Deneyim' },
  { value: '500+', label: 'Tamamlanan Proje' },
  { value: '100+', label: 'Makine Filosu' },
  { value: '50+', label: 'Uzman Operatör' },
];

export function Hero() {
  const scrollToNext = () => {
    const el = document.getElementById('hizmetler');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-construction.jpg')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E5AA8]/80 via-[#1E3A6E]/70 to-[#2B2B2B]/80" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 text-center w-full pt-20 pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-white/70 text-sm font-medium tracking-widest uppercase mb-6">
            1978'den Beri Güvenilir Çözümler
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6 text-balance">
            Güvenilir İş ve İstif Makinaları
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
        >
          İstanbul'da iş ve istif makineleri satış, kiralama ve yedek parça hizmetlerinde güvenilir çözüm ortağınız.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#1E5AA8] hover:bg-[#164a8a] text-white px-8 py-6 text-base font-medium"
          >
            <Link href="/#makinalar">Makinaları İncele</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-[#1E5AA8] px-8 py-6 text-base font-medium bg-transparent"
          >
            <Link href="/#teklif">Teklif Al</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 bg-[#2B2B2B]/95 backdrop-blur-sm z-10"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-5 sm:py-6 px-4 ${i < stats.length - 1 ? 'border-r border-white/10' : ''}`}
              >
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer z-20"
        aria-label="Aşağı kaydır"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
