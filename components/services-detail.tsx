'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { serviceItems } from '@/components/services';

const details: Record<string, { image: string; bulletsTr: string[]; bulletsEn: string[] }> = {
  rental: {
    image: '/images/machines/ekskavator.jpg',
    bulletsTr: ['Günlük, haftalık ve aylık kiralama', 'Operatörlü veya operatörsüz seçenek', 'Düzenli bakımlı, sigortalı makineler', 'Şantiyeye hızlı teslimat'],
    bulletsEn: ['Daily, weekly and monthly rental', 'With or without operator', 'Regularly maintained, insured machines', 'Fast delivery to site'],
  },
  sales: {
    image: '/images/machines/forklift.jpg',
    bulletsTr: ['Sıfır ve ikinci el iş makineleri', 'Forklift ve istif makinesi satışı', 'Güncel ilanlar sahibinden.com mağazamızda', 'Ekspertiz ve teslimat desteği'],
    bulletsEn: ['New and used machinery', 'Forklift and stacker sales', 'Current listings on our sahibinden.com store', 'Inspection and delivery support'],
  },
  parts: {
    image: '/images/machines/lastikli-yukleyici.jpg',
    bulletsTr: ['Farklı markalara uygun yedek parça', 'Hızlı tedarik ve stok takibi', 'Orijinal ve muadil seçenekler', 'Teknik danışmanlık'],
    bulletsEn: ['Spare parts for various brands', 'Fast supply and stock tracking', 'Original and equivalent options', 'Technical consultancy'],
  },
  support: {
    image: '/images/machines/greyder.jpg',
    bulletsTr: ['Periyodik bakım ve arıza onarımı', 'Yerinde servis hizmeti', 'Deneyimli teknik kadro', 'Projenizin her aşamasında destek'],
    bulletsEn: ['Periodic maintenance and repair', 'On-site service', 'Experienced technical team', 'Support at every stage of your project'],
  },
};

export function ServicesDetail() {
  const { t, locale } = useLanguage();
  const tr = locale === 'tr';

  return (
    <section className="bg-white">
      <div className="container-x">
        {serviceItems.map(({ key, anchor, Icon }, i) => {
          const d = details[key];
          return (
            <article key={key} id={anchor} className={`scroll-mt-24 py-14 lg:py-20 ${i < serviceItems.length - 1 ? 'border-b border-line' : ''}`}>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <Reveal className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-mist border border-line">
                    <Image src={d.image} alt={t(`services.${key}.title`)} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={0.08} className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-12 h-12 rounded-md bg-mist text-brand flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink leading-[1.05]">{t(`services.${key}.title`)}</h2>
                  <p className="mt-4 text-steel text-base sm:text-lg leading-relaxed">{t(`services.${key}.desc`)}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {(tr ? d.bulletsTr : d.bulletsEn).map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-ink/85">
                        <CheckCircle2 className="w-[18px] h-[18px] text-brand shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/iletisim#teklif"
                    className="group mt-8 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors"
                  >
                    {t('nav.quote')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
