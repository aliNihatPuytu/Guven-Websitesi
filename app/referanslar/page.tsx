import type { Metadata } from 'next';
import Image from 'next/image';
<<<<<<< HEAD
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { references } from '@/lib/references-data';

export const metadata: Metadata = {
  title: 'Referanslar – İş Ortaklarımız',
  description:
    'Güven İş ve İstif Makineleri olarak uzun yıllardır birlikte çalıştığımız değerli iş ortaklarımız ve referanslarımız.',
  alternates: { canonical: '/referanslar' },
=======
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { references } from '@/lib/references-data';

export const metadata: Metadata = {
  title: 'Referanslar | Güven İş ve İstif Makineleri',
  description:
    'Güven İş ve İstif Makineleri olarak uzun yıllardır birlikte çalıştığımız değerli iş ortaklarımız ve referanslarımız.',
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
};

export default function ReferanslarPage() {
  return (
<<<<<<< HEAD
    <>
      <Header solid />
      <main>
        <PageHero
          title="Güvenilir İş Ortaklarımız"
          description="Uzun yıllardır farklı sektörlerden birçok değerli firma ile çalışıyor, kaliteli hizmet anlayışımızla iş ortaklarımızın çözüm süreçlerine katkı sağlıyoruz."
          crumbs={[{ label: 'Referanslar' }]}
        />

        <section className="section-y bg-white">
          <div className="container-x">
            <Reveal className="max-w-3xl rule mb-12 lg:mb-16">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-[1.05]">Sektöründe Öncü Firmaların Tercihi</h2>
              <p className="mt-5 text-steel text-base sm:text-lg leading-relaxed">
                Forklift, istif makineleri, servis, bakım, yedek parça ve kiralama çözümlerimizle farklı ölçeklerdeki
                işletmelere profesyonel destek sunuyoruz. Referanslarımız, hizmet kalitemizin ve sürdürülebilir iş
                anlayışımızın en önemli göstergesidir.
              </p>
            </Reveal>

            <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {references.map((ref) => (
                <StaggerItem key={ref.id}>
                  <div className="group flex items-center justify-center aspect-[3/2] bg-white border border-line rounded-xl p-5 hover:border-brand/40 hover:shadow-[0_24px_50px_-30px_rgba(30,90,168,.5)] transition-all duration-300">
                    <div className="relative w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <Image src={ref.image} alt={ref.name} fill sizes="(max-width: 640px) 45vw, 200px" className="object-contain" unoptimized />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
=======
    <main className="min-h-screen">
      <Header />

      {/* ── Sayfa Başlığı ──────────────────────────────────────────── */}
      <section className="bg-[#1E5AA8] py-24 lg:py-32 pt-36 relative overflow-hidden">
        {/* Dekoratif desen */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">
              Referanslarımız
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Güvenilir İş Ortaklarımız
            </h1>

            <p className="text-lg md:text-xl text-white/85 leading-relaxed">
              Güven İş ve İstif Makineleri olarak uzun yıllardır farklı
              sektörlerden birçok değerli firma ile çalışıyor, kaliteli hizmet
              anlayışımızla iş ortaklarımızın çözüm süreçlerine katkı sağlıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* ── Açıklama Alanı ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B172A] mb-6">
              Sektöründe Öncü Firmaların Tercihi
            </h2>

            <p className="text-[#64748B] text-lg leading-relaxed">
              Forklift, istif makineleri, servis, bakım, yedek parça ve kiralama
              çözümlerimizle farklı ölçeklerdeki işletmelere profesyonel destek
              sunuyoruz. Referanslarımız, hizmet kalitemizin ve sürdürülebilir iş
              anlayışımızın en önemli göstergesidir.
            </p>
          </div>
        </div>
      </section>

      {/* ── Referans Logoları (Grid) ────────────────────────────────── */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-5">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="group flex items-center justify-center aspect-[3/2] bg-white border border-[#E8ECF0] rounded-xl p-2 overflow-hidden hover:shadow-lg hover:shadow-[#1E5AA8]/8 hover:border-[#1E5AA8]/25 transition-all duration-300"
              >
                <div className="relative w-full h-full scale-[1.50] group-hover:scale-[1.3] transition-transform duration-300">
                  <Image
                    src={ref.image}
                    alt={ref.name}
                    fill
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                    className="object-contain grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Alanı ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="bg-[#1E5AA8] rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Siz de Referanslarımız Arasında Yer Alın
              </h2>

              <p className="text-white/85 text-lg leading-relaxed mb-8">
                İşletmenizin forklift, istif makinesi, bakım, servis ve kiralama
                ihtiyaçları için bizimle iletişime geçebilirsiniz.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E5AA8] hover:bg-white/90 rounded-full px-8"
              >
                <Link href="/iletisim">
                  İletişime Geç
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
