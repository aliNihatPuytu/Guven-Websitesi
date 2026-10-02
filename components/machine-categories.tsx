'use client';

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
        <Image
          src={machine.image}
          alt={title}
          fill
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
  );
}
