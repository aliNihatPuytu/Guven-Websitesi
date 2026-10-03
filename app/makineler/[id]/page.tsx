import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Weight, Download } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { QuoteCalculator } from '@/components/quote-calculator';
import { Reveal } from '@/components/ui/reveal';
import { SahibindenIcon } from '@/components/social-links';
import { machines, getMachine } from '@/lib/machine-data';
import { siteConfig } from '@/lib/site-config';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return machines.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const machine = getMachine(id);
  if (!machine) return {};
  const title = `${machine.title}${machine.tonnage ? ` (${machine.tonnage})` : ''} – Kiralama ve Satış`;
  return {
    title,
    description: `${machine.shortDesc} Güven İş ve İstif Makineleri, İstanbul. Kullanım alanları, özellikler ve teklif.`,
    alternates: { canonical: `/makineler/${machine.id}` },
    openGraph: { title, description: machine.shortDesc, images: [{ url: machine.image, width: 1376, height: 768 }] },
  };
}

export default async function MachinePage({ params }: PageProps) {
  const { id } = await params;
  const machine = getMachine(id);
  if (!machine) notFound();

  const others = machines.filter((m) => m.id !== machine.id);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: machine.title,
    description: machine.fullDesc,
    image: `${siteConfig.url}${machine.image}`,
    brand: { '@type': 'Organization', name: siteConfig.name },
    url: `${siteConfig.url}/makineler/${machine.id}`,
    additionalProperty: machine.specs.map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.value })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'TRY',
      url: `${siteConfig.url}/iletisim#teklif`,
      seller: { '@id': `${siteConfig.url}/#organization` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <Header solid />
      <main>
        <PageHero
          title={machine.title}
          description={machine.shortDesc}
          crumbs={[{ label: 'Makineler', href: '/makineler' }, { label: machine.title }]}
          image={machine.image}
        />

        <section className="section-y bg-white">
          <div className="container-x">
            <Link
              href="/makineler"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-steel hover:text-brand transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Tüm Makineler
            </Link>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Görsel + açıklama */}
              <div className="lg:col-span-7 space-y-10">
                <Reveal>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-mist border border-line">
                    <Image src={machine.image} alt={machine.title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                    {machine.tonnage && (
                      <span className="tag-tonnage absolute left-5 bottom-5 shadow-lg text-sm">
                        <Weight className="w-4 h-4" />
                        {machine.tonnage}
                      </span>
                    )}
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink">Genel Bilgi</h2>
                  <p className="mt-4 text-base sm:text-lg text-ink/80 leading-relaxed">{machine.fullDesc}</p>
                </Reveal>

                <Reveal delay={0.05}>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink mb-5">Özellikler ve Avantajlar</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {machine.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 p-4 bg-mist rounded-md border border-line">
                        <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                        <span className="font-medium text-ink text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* Yan panel */}
              <aside className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                <Reveal delay={0.05}>
                  <div className="bg-mist rounded-xl p-6 border border-line">
                    <h3 className="font-heading font-semibold text-lg text-ink mb-4">Kullanım Alanları</h3>
                    <ul className="flex flex-wrap gap-2">
                      {machine.usageAreas.map((a) => (
                        <li key={a} className="px-3 py-1.5 bg-white text-ink text-sm font-medium rounded-md border border-line">{a}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="rounded-xl p-6 border border-line space-y-3">
                    <Link
                      href="#teklif"
                      className="group inline-flex w-full items-center justify-center gap-2 h-12 rounded-md bg-brand text-white font-semibold hover:bg-brand-dark transition-colors"
                    >
                      Bu Makine İçin Teklif Al
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    {machine.sahibindenUrl && (
                      <a
                        href={machine.sahibindenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 h-12 rounded-md border border-line text-ink font-medium hover:border-ink hover:bg-ink hover:text-white transition-colors"
                      >
                        <SahibindenIcon className="w-4 h-4" />
                        Sahibinden İlanlarını Gör
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    )}
                    <a
                      href={siteConfig.catalogPdf}
                      download
                      className="inline-flex w-full items-center justify-center gap-2 h-12 rounded-md text-brand font-medium hover:bg-mist transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      PDF Katalog İndir
                    </a>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </section>

        {/* Diğer gruplar */}
        <section className="py-14 bg-mist border-t border-line">
          <div className="container-x">
            <h3 className="font-heading font-bold text-2xl text-ink mb-7">Diğer Makine Grupları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {others.map((m) => (
                <Link
                  key={m.id}
                  href={`/makineler/${m.id}`}
                  className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-line hover:border-brand/40 hover:shadow-md transition-all"
                >
                  <div className="relative w-16 h-14 rounded-md overflow-hidden shrink-0 bg-mist">
                    <Image src={m.image} alt={m.title} fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-semibold text-ink group-hover:text-brand transition-colors text-sm leading-tight truncate">{m.title}</p>
                    <p className="text-xs text-steel mt-1 truncate">{m.tonnage ?? m.usageAreas[0]}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <QuoteCalculator defaultMachine={machine.group} />
      </main>
      <Footer />
    </>
  );
}
