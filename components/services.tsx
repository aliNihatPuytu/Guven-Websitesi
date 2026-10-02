'use client';

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
  );
}
