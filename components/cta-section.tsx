'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

export function CTASection() {
  const { t } = useLanguage();
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
              <Link href="/#teklif" className="flex items-center gap-2">{t('cta.quote')}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-base font-medium bg-transparent group">
              <a href="tel:+902163141294" className="flex items-center gap-2"><Phone className="w-4 h-4" />{t('cta.call')}</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
