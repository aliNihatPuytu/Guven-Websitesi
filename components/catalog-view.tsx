'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Weight, Youtube } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { machines } from '@/lib/machine-data';
import { siteConfig } from '@/lib/site-config';
import { MachineGlyph } from '@/components/machine-glyph';

/** Basılı kataloğun bölümleri (sayfa numaralarıyla) */
export const catalogSections = [
  { label: 'Kapak', page: 1 },
  { label: 'Hakkımızda', page: 2 },
  { label: 'Neden Güven?', page: 3 },
  { label: 'Makine Filomuz', page: 4 },
  { label: 'Projeler', page: 5 },
  { label: 'Ekskavatör', page: 6 },
  { label: 'Mini Ekskavatör', page: 7 },
  { label: 'Toprak Silindiri', page: 8 },
  { label: 'Greyder', page: 9 },
  { label: 'Lastikli Yükleyici', page: 10 },
  { label: 'Forklift', page: 11 },
  { label: 'İstif', page: 12 },
  { label: 'İletişim', page: 14 },
  { label: 'Sahada Biz', page: 15 },
];

/** Katalogda yer alan "Görev Aldığımız Projeler" listesi */
const projects = [
  'Yavuz Sultan Selim Köprüsü',
  'Osmangazi Köprüsü',
  'Metro Projeleri',
  'İstanbul-İzmir Otoyolu',
  'Çanakkale-Ezine Yolu',
  'Prof. Dr. Feriha Öz Acil Durum Hastanesi',
  'TRC Göztepe',
  'Yeditepe Üniversitesi Koşuyolu Hastanesi',
  'Medistate Çekmeköy Hastanesi',
  'Novada Forum Bodrum',
];

const gotoPage = (page: number) => window.dispatchEvent(new CustomEvent('catalog:goto', { detail: page }));

export function CatalogView() {
  const { t, locale } = useLanguage();
  const tr = locale === 'tr';

  return (
    <>
      {/* ── Makine grupları (katalog sırası) ─────────────────────────────── */}
      <section className="section-y bg-mist">
        <div className="container-x">
          <SectionHeading
            kicker={tr ? 'Makine Filomuz' : 'Our Fleet'}
            title={tr ? 'Katalogdaki Makine Grupları' : 'Machine Groups in the Catalog'}
            description={
              tr
                ? 'Kataloğun 6–13. sayfalarında yer alan yedi makine grubumuz. Kartlardan katalog sayfasına veya ayrıntılı web sayfasına geçebilirsiniz.'
                : 'Our seven machine groups from pages 6–13. Open the catalog page or the detailed web page from each card.'
            }
            className="mb-10 lg:mb-14"
          />

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {machines.map((m) => (
              <StaggerItem key={m.id} className="h-full">
                <article className="group flex flex-col h-full rounded-xl bg-white border border-line overflow-hidden hover:border-brand/40 transition-colors">
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    <Image
                      src={m.image}
                      alt={tr ? m.title : m.titleEn}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden />
                    {m.tonnage && (
                      <span className="tag-tonnage absolute left-3 bottom-3 shadow">
                        <Weight className="w-3.5 h-3.5" />
                        {m.tonnage}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 text-brand mb-2">
                      <MachineGlyph id={m.id} className="w-5 h-5" />
                      {m.catalogPage && <span className="text-xs font-semibold">{tr ? 'Sayfa' : 'Page'} {m.catalogPage}</span>}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-ink leading-tight">{tr ? m.title : m.titleEn}</h3>
                    <p className="mt-2 text-sm text-steel leading-relaxed flex-1">{tr ? m.shortDesc : m.shortDescEn}</p>
                    <div className="mt-4 flex items-center gap-2">
                      {m.catalogPage && (
                        <button
                          onClick={() => gotoPage(m.catalogPage!)}
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-ink text-white text-xs font-semibold hover:bg-brand transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          {tr ? 'Katalogda Aç' : 'Open in Catalog'}
                        </button>
                      )}
                      <Link
                        href={`/makineler/${m.id}`}
                        className="group/l inline-flex items-center gap-1 h-9 px-3 rounded-md border border-line text-ink text-xs font-semibold hover:border-brand hover:text-brand transition-colors"
                      >
                        {t('catalog.detail')}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/l:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Projeler + tanıtım filmi (katalog 5. sayfa) ──────────────────── */}
      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <SectionHeading
              kicker={tr ? 'Projeler' : 'Projects'}
              title={tr ? 'Görev Aldığımız Projeler' : 'Projects We Have Worked On'}
              description={
                tr
                  ? 'Türkiye’nin önemli altyapı, ulaşım ve sağlık projelerinde makinelerimiz ve ekibimizle yer aldık.'
                  : 'Our machines and team have taken part in major infrastructure, transport and healthcare projects across Türkiye.'
              }
              className="mb-8"
            />
            <Stagger className="flex flex-wrap gap-2">
              {projects.map((p) => (
                <StaggerItem key={p}>
                  <span className="inline-flex items-center h-10 px-4 rounded-md bg-mist border border-line text-sm font-medium text-ink">{p}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <button
                onClick={() => gotoPage(5)}
                className="group mt-8 inline-flex items-center gap-2 text-brand font-semibold text-sm"
              >
                <BookOpen className="w-4 h-4" />
                {tr ? 'Katalogda proje sayfasını aç' : 'Open the projects page in the catalog'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <a
              href={`https://www.youtube.com/watch?v=${siteConfig.video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-xl overflow-hidden bg-ink text-white aspect-video"
            >
              <Image src={siteConfig.video.poster} alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-white text-brand flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                  <Youtube className="w-7 h-7" />
                </span>
              </span>
              <span className="absolute left-5 right-5 bottom-5">
                <span className="block font-heading font-bold text-xl">{tr ? 'Tanıtım filmimiz yayında' : 'Our promo film is live'}</span>
                <span className="block text-sm text-white/70 mt-1">{tr ? 'YouTube’da izlemek için tıklayın' : 'Click to watch on YouTube'}</span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
