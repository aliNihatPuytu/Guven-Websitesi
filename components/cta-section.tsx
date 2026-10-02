'use client';
<<<<<<< HEAD

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';
=======
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';
import { scrollToPageSection } from '@/lib/section-navigation';
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332

export function CTASection() {
  const { t } = useLanguage();

<<<<<<< HEAD
  return (
    <section className="relative section-y bg-brand text-white overflow-hidden">
      <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-white/10 blur-3xl drift pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full bg-ink/30 blur-3xl drift-slow pointer-events-none" aria-hidden />
      <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />

      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-white/70 mb-3">{t('cta.badge')}</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">{t('cta.title')}</h2>
          <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl">{t('cta.desc')}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex flex-col xs:flex-row gap-3">
  <Link
    href="/iletisim#teklif"
    className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-white text-brand font-semibold hover:bg-ink hover:text-white transition-colors"
  >
    {t('cta.quote')}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Link>

  {siteConfig.phones.map((phone) => (
    <a
      key={phone.href}
      href={phone.href}
      className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md border border-white/40 text-white font-medium hover:bg-white/10 hover:border-white transition-colors tabular-nums"
    >
      <Phone className="w-4 h-4" />
      {phone.label}
    </a>
  ))}
</Reveal>
      </div>
    </section>
=======
  const handleQuoteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (scrollToPageSection('teklif')) {
      event.preventDefault();
    }
  };

  return (
    <SectionWrapper className="py-24 lg:py-32 bg-[#1E5AA8] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block text-xs font-semibold text-white/70 tracking-widest uppercase mb-4">
            {t('cta.badge')}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            {t('cta.title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/85 mb-10 max-w-2xl mx-auto">
            {t('cta.desc')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#1E5AA8] hover:bg-white/92 px-8 py-6 text-base font-semibold group shadow-xl">
              <Link href="/#teklif" onClick={handleQuoteClick} className="flex items-center gap-2">{t('cta.quote')}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-base font-medium bg-transparent group">
              <a href="tel:+902163141294" className="flex items-center gap-2"><Phone className="w-4 h-4" />{t('cta.call')}</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  );
}
