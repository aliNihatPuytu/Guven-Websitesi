import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Wrench, ExternalLink, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { machines } from '@/lib/machine-data';
import { MachineDetailClient } from './machine-detail-client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return machines.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const machine = machines.find((m) => m.id === id);
  if (!machine) return {};
  return {
    title: `${machine.title} | Güven İş ve İstif Makinaları`,
    description: machine.shortDesc + ' Satılık ve kiralık ilanlar için sahibinden.com mağazamızı ziyaret edin.',
  };
}

export default async function MachinePage({ params }: PageProps) {
  const { id } = await params;
  const machine = machines.find((m) => m.id === id);
  if (!machine) notFound();

  const otherMachines = machines.filter((m) => m.id !== machine.id);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={machine.image} alt={machine.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-[#1E5AA8]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-8 pb-12">
          <MachineDetailClient machine={machine} />
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">

          {/* Back */}
          <div className="mb-12">
            <Button asChild variant="outline" className="border-[#E8ECF0] text-[#0B1929] hover:bg-[#1E5AA8] hover:text-white hover:border-[#1E5AA8] group">
              <Link href="/#makinalar" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Tüm Makineler
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-14 items-start">

            {/* Left – Specs + Cards */}
            <div className="lg:col-span-1 space-y-6">

              {/* Sahibinden CTA */}
              {machine.sahibindenUrl && (
                <div className="bg-gradient-to-br from-[#1E5AA8] to-[#2B7FD4] rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-semibold text-sm">Sahibinden.com Mağazamız</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    Bu kategorideki satılık ve kiralık tüm ilanlarımızı sahibinden.com mağazamızdan inceleyebilirsiniz.
                  </p>
                  <a
                    href={machine.sahibindenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-white text-[#1E5AA8] hover:bg-white/92 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
                  >
                    İlanları İncele
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Specs */}
              <div className="bg-[#F6F8FB] rounded-2xl p-6 border border-[#E8ECF0]">
                <h3 className="font-heading text-xl text-[#0B1929] mb-5 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#1E5AA8]" />
                  Teknik Özellikler
                </h3>
                <div className="space-y-0">
                  {machine.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between py-3 border-b border-[#E8ECF0] last:border-0">
                      <span className="text-sm text-[#0B1929]/60">{spec.label}</span>
                      <span className="text-sm font-semibold text-[#0B1929]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Areas */}
              <div className="bg-[#EEF3FB] rounded-2xl p-6">
                <h3 className="font-heading text-lg text-[#1E5AA8] mb-4">Kullanım Alanları</h3>
                <div className="flex flex-wrap gap-2">
                  {machine.usageAreas.map((area) => (
                    <span key={area} className="px-3 py-1.5 bg-white text-[#1E5AA8] text-sm font-medium rounded-lg border border-[#1E5AA8]/15">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Teklif CTA */}
              <div className="bg-[#F6F8FB] rounded-2xl p-6 border border-[#E8ECF0] text-center">
                <h3 className="font-heading text-lg text-[#0B1929] mb-2">Kiralama için teklif alın</h3>
                <p className="text-[#0B1929]/60 text-sm mb-4">Hızlı teklif formunu doldurun, size özel fiyat sunalım.</p>
                <Button asChild className="w-full bg-[#1E5AA8] hover:bg-[#164a8a] text-white">
                  <Link href="/#teklif">Teklif Al</Link>
                </Button>
              </div>
            </div>

            {/* Right – Description + Features */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-[#1E5AA8] rounded-full" />
                  <div>
                    <p className="text-xs font-semibold text-[#1E5AA8] tracking-widest uppercase">Güven İş ve İstif Makinaları</p>
                    <h2 className="font-heading text-3xl md:text-4xl text-[#0B1929]">{machine.title}</h2>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-[#1E5AA8] via-[#E8ECF0] to-transparent mb-8" />
                <p className="text-lg text-[#0B1929]/70 leading-relaxed">{machine.fullDesc}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-heading text-2xl text-[#0B1929] mb-6 flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#1E5AA8] inline-block" />
                  Özellikler & Avantajlar
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {machine.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-4 bg-[#F6F8FB] rounded-xl border border-[#E8ECF0] hover:border-[#1E5AA8]/20 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-[#1E5AA8] shrink-0" />
                      <span className="font-medium text-[#0B1929] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sahibinden inline banner */}
              {machine.sahibindenUrl && (
                <div className="flex items-center gap-4 p-5 bg-[#F6F8FB] rounded-2xl border border-[#E8ECF0]">
                  <div className="w-12 h-12 rounded-xl bg-[#1E5AA8] flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#0B1929] text-sm">Satılık veya kiralık araıyor musunuz?</p>
                    <p className="text-[#0B1929]/50 text-xs mt-0.5">Sahibinden.com mağazamızda güncel ilanlarımızı inceleyin.</p>
                  </div>
                  <a
                    href={machine.sahibindenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#1E5AA8] hover:gap-2.5 transition-all flex-shrink-0"
                  >
                    İlanları Gör
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Machines */}
      <section className="py-16 bg-[#F6F8FB] border-t border-[#E8ECF0]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <h3 className="font-heading text-2xl text-[#0B1929] mb-8">Diğer Makineler</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherMachines.map((m) => (
              <Link
                key={m.id}
                href={`/makinalar/${m.id}`}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E8ECF0] hover:border-[#1E5AA8]/30 hover:shadow-md transition-all"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={m.image} alt={m.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#0B1929] group-hover:text-[#1E5AA8] transition-colors text-sm truncate">{m.title}</p>
                  <p className="text-xs text-[#0B1929]/60 mt-0.5 truncate">{m.usageAreas[0]}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1E5AA8] shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
