'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Download, FileText } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';

export function CatalogSection() {
  const { t, locale } = useLanguage();
  const tr = locale === 'tr';

  return (
    <section id="katalog" className="relative section-y bg-ink text-white overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-brand/25 blur-3xl drift pointer-events-none" aria-hidden />

      <div className="container-x relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5">
          <SectionHeading dark kicker={t('catalog.label')} title={t('catalog.title')} description={t('catalog.subtitle')} />
          <Reveal delay={0.15} className="mt-8 flex flex-col xs:flex-row gap-3">
            <Link
              href="/katalog"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-white text-ink font-semibold hover:bg-brand-light hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              {t('catalog.view')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={siteConfig.catalogPdf}
              download
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md border border-white/25 text-white font-medium hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('catalog.download')}
            </a>
          </Reveal>
        </div>

        {/* Basılı katalog — yelpaze şeklinde sayfalar */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <Link href="/katalog" className="group relative block h-[320px] sm:h-[400px] lg:h-[460px]" aria-label={t('catalog.view')}>
            {[
              { page: 6, cls: 'left-[6%] sm:left-[10%] rotate-[-9deg] group-hover:rotate-[-13deg] group-hover:-translate-x-4', z: 1 },
              { page: 4, cls: 'left-[50%] -translate-x-1/2 rotate-[1deg] group-hover:-translate-y-3', z: 2 },
              { page: 1, cls: 'right-[6%] sm:right-[10%] rotate-[9deg] group-hover:rotate-[13deg] group-hover:translate-x-4', z: 3 },
            ].map((p) => (
              <span
                key={p.page}
                className={`absolute top-1/2 -translate-y-1/2 block w-[46%] sm:w-[40%] max-w-[260px] aspect-[1241/1755] rounded-md overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)] ring-1 ring-white/10 transition-transform duration-500 ease-out ${p.cls}`}
                style={{ zIndex: p.z }}
              >
                <Image
                  src={`/katalog/pages/page-${String(p.page).padStart(2, '0')}.jpg`}
                  alt={`Katalog sayfa ${p.page}`}
                  fill
                  sizes="(max-width: 640px) 45vw, 260px"
                  className="object-cover"
                />
              </span>
            ))}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 inline-flex items-center gap-2 h-10 px-4 rounded-md bg-white text-ink text-sm font-semibold shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <BookOpen className="w-4 h-4 text-brand" />
              {tr ? '16 sayfa · Sayfaları çevirerek inceleyin' : '16 pages · Flip through online'}
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
