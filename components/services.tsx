'use client';

<<<<<<< HEAD
import Link from 'next/link';
import { Truck, ShoppingCart, Wrench, Headset, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';

export const serviceItems = [
  { key: 'rental', anchor: 'kiralama', Icon: Truck },
  { key: 'sales', anchor: 'satis', Icon: ShoppingCart },
  { key: 'parts', anchor: 'yedek-parca', Icon: Wrench },
  { key: 'support', anchor: 'servis', Icon: Headset },
] as const;

export function Services({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <section id="hizmetler" className="section-y bg-mist scroll-mt-20">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <SectionHeading kicker={t('services.label')} title={t('services.title')} description={t('services.subtitle')} />
          {!compact && (
            <Link href="/hizmetler" className="group inline-flex items-center gap-2 text-brand font-semibold text-sm shrink-0">
              {t('nav.services')}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {serviceItems.map(({ key, anchor, Icon }) => (
            <StaggerItem key={key} className="h-full">
              <Link
                href={`/hizmetler#${anchor}`}
                className="group relative flex flex-col h-full bg-white rounded-xl p-7 lg:p-8 border border-line hover:border-brand/30 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(30,90,168,.45)] overflow-hidden"
              >
                <span className="absolute inset-x-0 top-0 h-[3px] bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" aria-hidden />
                <div className="w-12 h-12 rounded-lg bg-mist text-brand flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-ink leading-snug">{t(`services.${key}.title`)}</h3>
                <p className="mt-3 text-steel text-sm leading-relaxed flex-1">{t(`services.${key}.desc`)}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {t('machines.cta')}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
=======
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  );
}
