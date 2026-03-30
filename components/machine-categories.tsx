'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

const machines = [
  {
    id: 'ekskavatorler',
    titleTr: 'Ekskavatörler',
    titleEn: 'Excavators',
    descTr: 'Kazı ve hafriyat işleri için güçlü ekskavatörler. 20–80 ton arası çeşitli kapasiteler.',
    descEn: 'Powerful excavators for excavation and earthwork. Various capacities from 20–80 tons.',
    image: '/images/machines/excavator.jpg',
    badge: '20–80 ton',
  },
  {
    id: 'forkliftler',
    titleTr: 'Forkliftler',
    titleEn: 'Forklifts',
    descTr: 'Depo ve şantiye için yük taşıma çözümleri. Elektrikli ve dizel seçenekler mevcut.',
    descEn: 'Load handling solutions for warehouse and construction. Electric and diesel options available.',
    image: '/images/machines/forklift.jpg',
    badge: '1.5–16 ton',
  },
  {
    id: 'istif-makineleri',
    titleTr: 'İstif Makineleri',
    titleEn: 'Stackers',
    descTr: 'Dar alanlarda yüksek verimlilikle çalışan istif makineleri ve reach truck\'lar.',
    descEn: 'Stackers and reach trucks that operate with high efficiency in narrow spaces.',
    image: '/images/machines/loader.jpg',
    badge: 'Reach Truck',
  },
  {
    id: 'yukleyiciler',
    titleTr: 'Yükleyiciler',
    titleEn: 'Loaders',
    descTr: 'Malzeme taşıma ve yükleme işleri için güvenilir yükleyiciler. Her ölçeğe uygun.',
    descEn: 'Reliable loaders for material handling and loading. Suitable for every scale.',
    image: '/images/machines/loader.jpg',
    badge: '8–25 ton',
  },
  {
    id: 'mini-ekskavatorler',
    titleTr: 'Mini Ekskavatörler',
    titleEn: 'Mini Excavators',
    descTr: 'Dar alanlarda kazı işleri için kompakt ve manevra kabiliyeti yüksek modeller.',
    descEn: 'Compact and highly maneuverable models for excavation in tight spaces.',
    image: '/images/machines/mini-excavator.jpg',
    badge: '1–8 ton',
  },
];

export function MachineCategories() {
  const { t, locale } = useLanguage();

  return (
    <SectionWrapper id="makinalar" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-semibold text-[#1E5AA8] tracking-widest uppercase">
            {t('machines.label')}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">
            {t('machines.title')}
          </h2>
          <p className="mt-4 text-lg text-[#0B1929]/60 max-w-2xl mx-auto">
            {t('machines.subtitle')}
          </p>
        </FadeIn>

        {/* 3 + 2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {machines.slice(0, 3).map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} locale={locale} cta={t('machines.cta')} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 lg:max-w-[66.666%] lg:mx-auto">
          {machines.slice(3).map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index + 3} locale={locale} cta={t('machines.cta')} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function MachineCard({ machine, index, locale, cta }: {
  machine: typeof machines[0]; index: number; locale: string; cta: string;
}) {
  const title = locale === 'tr' ? machine.titleTr : machine.titleEn;
  const desc = locale === 'tr' ? machine.descTr : machine.descEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-[#E8ECF0] bg-white hover:shadow-2xl hover:shadow-[#1E5AA8]/8 hover:border-[#1E5AA8]/20 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={machine.image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Capacity badge */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold text-white bg-[#1E5AA8] px-2.5 py-1 rounded-lg shadow-lg">
            {machine.badge}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl text-[#0B1929] mb-2 group-hover:text-[#1E5AA8] transition-colors">
          {title}
        </h3>
        <p className="text-[#0B1929]/60 text-sm leading-relaxed mb-5">
          {desc}
        </p>
        <Button
          asChild
          variant="outline"
          className="w-full min-h-[44px] border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white group/btn transition-all duration-200"
        >
          <Link href={`/makinalar/${machine.id}`} className="flex items-center justify-center gap-2">
            {cta}
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
