import type { Metadata } from 'next';
import Image from 'next/image';
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
};

export default function ReferanslarPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* ── Sayfa Başlığı ──────────────────────────────────────────── */}
      <section className="bg-[#1E5AA8] py-24 lg:py-32 pt-36 relative overflow-hidden">
        {/* Dekoratif desen */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full border border-white/20" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full border border-white/15" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-white/60 tracking-widest uppercase block mb-4">
            Referanslarımız
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            45 Yılı Aşkın Süredir Bizi Tercih Ettiler
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Türkiye’nin önde gelen firmaları
            projelerinde Güven İş ve İstif Makineleri’nin güvenilir çözüm
            ortaklığını tercih etti.
          </p>
        </div>
      </section>

      {/* ── Tanıtım Metni ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold text-[#1E5AA8] tracking-widest uppercase mb-4">
            Güvenli. Hızlı. Kaliteli.
          </span>
          <h2 className="font-heading text-2xl md:text-3xl text-[#0B1929] mb-6">
            Güven İş ve İstif Makineleri ile çalışmayı tercih edenler
          </h2>
          <p className="text-[#0B1929]/65 leading-relaxed text-base md:text-lg">
            İş makinelerinin satış, kiralama, yedek parça ve teknik servis
            alanında Türkiye’de profesyonel anlamda faaliyet gösteriyoruz.
            Müşterilerimize ilk seferinde ve her seferinde kaliteli, hızlı ve
            güvenilir hizmet vermeyi ana ilkemiz olarak benimsiyoruz; firmamızın
            temelini oluşturan yegane unsur budur.
          </p>
        </div>
      </section>

      {/* ── Referans Logoları (Grid) ────────────────────────────────── */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-5">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="group flex items-center justify-center aspect-[3/2] bg-white border border-[#E8ECF0] rounded-xl p-1 hover:shadow-lg hover:shadow-[#1E5AA8]/8 hover:border-[#1E5AA8]/25 transition-all duration-300"
              >
                <div className="relative w-full h-full">
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

      {/* ── Alt CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#0B2545] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545] via-[#1E5AA8]/30 to-[#0B2545]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Bizimle bilgilerinizi paylaşın, sizinle iletişime geçelim
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto">
            Her ölçekteki projeniz için güvenilir, hızlı ve uzman makine
            kiralama desteği sunuyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#1E5AA8] hover:bg-[#164a8a] text-white px-8 py-6"
            >
              <Link href="/#teklif" className="flex items-center gap-2">
                Teklif Al <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8 py-6 bg-transparent"
            >
              <Link href="/#iletisim">İletişime Geç</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
