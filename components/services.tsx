'use client';

import { motion } from 'framer-motion';
import { Truck, ShoppingCart, Wrench, Users } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

const serviceIcons = [Truck, ShoppingCart, Wrench, Users];
const serviceKeys = ['rental', 'sales', 'parts', 'support'] as const;
const serviceColors = [
  'from-blue-500/10 to-blue-600/5',
  'from-indigo-500/10 to-indigo-600/5',
  'from-cyan-500/10 to-cyan-600/5',
  'from-sky-500/10 to-sky-600/5',
];

export function Services() {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="hizmetler" className="py-24 lg:py-32 bg-[#F6F8FB]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-semibold text-[#1E5AA8] tracking-widest uppercase">{t('services.label')}</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">{t('services.title')}</h2>
          <p className="mt-4 text-lg text-[#0B1929]/60 max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceKeys.map((key, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white p-8 rounded-2xl border border-[#E8ECF0] hover:border-[#1E5AA8]/30 hover:shadow-2xl hover:shadow-[#1E5AA8]/8 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${serviceColors[index]} border border-[#1E5AA8]/10 flex items-center justify-center mb-6 group-hover:bg-[#1E5AA8] group-hover:border-transparent transition-all duration-300`}>
                  <Icon className="w-6 h-6 text-[#1E5AA8] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl text-[#0B1929] mb-3">{t(`services.${key}.title`)}</h3>
                <p className="text-[#0B1929]/60 leading-relaxed text-sm">{t(`services.${key}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
