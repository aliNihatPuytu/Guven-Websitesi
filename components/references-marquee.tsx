'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';
import { references } from '@/lib/references-data';

// ─── Ana Sayfa: Referans Logoları – Sonsuz Şerit ──────────────────────────────

export function ReferencesMarquee() {
  const { t, locale } = useLanguage();


  const items = [...references, ...references];

  return (
    <SectionWrapper id="referanslar" className="py-24 lg:py-32 bg-[#F6F8FB]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="text-sm font-semibold text-[#1E5AA8] tracking-widest uppercase">
            {t('references.label')}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">
            {t('references.title')}
          </h2>
          <p className="mt-4 text-lg text-[#0B1929]/60 max-w-2xl mx-auto">
            {t('references.subtitle')}
          </p>
        </FadeIn>
      </div>

      {/* Sonsuz şerit – tam-genişlik */}
      <div
        className="relative overflow-hidden"
        style={{
          // Kenarlarda yumuşak fade (mask)
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        <div className="referanslar-track py-6">
          {items.map((ref, idx) => (
            <div
              key={`${ref.id}-${idx}`}
              className="flex items-center justify-center px-8 md:px-12 shrink-0"
              aria-hidden={idx >= references.length ? true : undefined}
            >
              <div className="relative h-16 md:h-20 w-44 md:w-56 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={ref.image}
                  alt={ref.name}
                  fill
                  sizes="(max-width: 768px) 176px, 224px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tüm referansları gör butonu — ortada */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12 flex justify-center">
        <Button
          asChild
          variant="outline"
          className="border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white group"
        >
          <Link href="/referanslar" className="flex items-center gap-2">
            {t('references.viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
