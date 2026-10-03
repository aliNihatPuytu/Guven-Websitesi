import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/page-hero';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { references } from '@/lib/references-data';

export const metadata: Metadata = {
  title: 'Referanslar – Birlikte Çalıştığımız Firmalar',
  description:
    'Güven İş ve İstif Makineleri olarak uzun yıllardır birlikte çalıştığımız değerli firmalar ve referanslarımız.',
  alternates: { canonical: '/referanslar' },
};

export default function ReferanslarPage() {
  return (
    <>
      <Header solid />
      <main>
        <PageHero
          title="Birlikte Çalıştığımız Firmalar"
          crumbs={[{ label: 'Referanslar' }]}
        />

        <section className="section-y bg-white">
          <div className="container-x">
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
