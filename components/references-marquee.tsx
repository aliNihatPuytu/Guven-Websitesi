'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { references } from '@/lib/references-data';

/** Ana sayfa: referans logoları — sonsuz şerit */
export function ReferencesMarquee() {
  const { t } = useLanguage();
  const items = [...references, ...references];

  return (
    <section id="referanslar" className="section-y bg-mist overflow-hidden scroll-mt-20">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeading kicker={t('references.label')} title={t('references.title')} description={t('references.subtitle')} />
          <Link href="/referanslar" className="group inline-flex items-center gap-2 text-brand font-semibold text-sm shrink-0">
            {t('references.viewAll')}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <Reveal>
        <div
          className="relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%)',
          }}
        >
          <div className="marquee-track py-4">
            {items.map((ref, idx) => (
              <div
                key={`${ref.id}-${idx}`}
                className="shrink-0 px-3 sm:px-4"
                aria-hidden={idx >= references.length ? true : undefined}
              >
                <div className="flex items-center justify-center w-44 h-24 sm:w-56 sm:h-28 rounded-xl bg-white border border-line">
                  <div className="relative w-[80%] h-[70%] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <Image src={ref.image} alt={ref.name} fill sizes="224px" className="object-contain" unoptimized />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
