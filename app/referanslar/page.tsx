import type { Metadata } from 'next';
import Image from 'next/image';
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
};

export default function ReferanslarPage() {
  return (
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
