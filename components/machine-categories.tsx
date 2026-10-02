'use client';

<<<<<<< HEAD
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Weight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { machines, type Machine } from '@/lib/machine-data';

export function MachineCategories({ showHeading = true }: { showHeading?: boolean }) {
  const { t, locale } = useLanguage();

  return (
    <section id="makinalar" className="section-y bg-white scroll-mt-20">
      <div className="container-x">
        {showHeading && (
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <SectionHeading kicker={t('machines.label')} title={t('machines.title')} description={t('machines.subtitle')} />
            <Link href="/makineler" className="group inline-flex items-center gap-2 text-brand font-semibold text-sm shrink-0">
              {t('machines.viewAll')}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {machines.map((m) => (
            <StaggerItem key={m.id} className="h-full">
              <MachineCard machine={m} locale={locale} cta={t('machines.cta')} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function MachineCard({ machine, locale, cta }: { machine: Machine; locale: string; cta: string }) {
  const tr = locale === 'tr';
  const title = tr ? machine.title : machine.titleEn;
  const desc = tr ? machine.shortDesc : machine.shortDescEn;

  return (
    <Link
      href={`/makineler/${machine.id}`}
      className="group flex flex-col h-full rounded-xl overflow-hidden bg-white border border-line hover:border-brand/30 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,25,41,.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
=======
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
        <Image
          src={machine.image}
          alt={title}
          fill
<<<<<<< HEAD
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" aria-hidden />
        {machine.tonnage && (
          <span className="tag-tonnage absolute left-4 bottom-4 shadow-lg">
            <Weight className="w-3.5 h-3.5" />
            {machine.tonnage}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading font-bold text-xl text-ink group-hover:text-brand transition-colors">{title}</h3>
        <p className="mt-2 text-sm text-steel leading-relaxed flex-1">{desc}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
=======
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  );
}
