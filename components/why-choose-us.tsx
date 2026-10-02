'use client';

import { Award, Cog, Users, Zap, Shield, Headset } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Stagger, StaggerItem } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';

const features = [
  { icon: Award, titleTr: '45+ Yıl Deneyim', titleEn: '45+ Years Experience', descTr: "1978'den beri sektörün güvenilir ismi olarak kesintisiz hizmet veriyoruz.", descEn: 'We have been providing uninterrupted service as the trusted name of the industry since 1978.' },
  { icon: Cog, titleTr: 'Makine Parkı', titleEn: 'Machine Fleet', descTr: 'Düzenli ve bakımlı geniş makine filomuz her projeye hazır.', descEn: 'Our regularly maintained, wide machine fleet is ready for every project.' },
  { icon: Users, titleTr: 'Profesyonel Kadro', titleEn: 'Professional Team', descTr: 'Sertifikalı ve deneyimli operatörlerimiz ile güvenilir hizmet sunuyoruz.', descEn: 'Reliable service with our certified and experienced operators.' },
  { icon: Zap, titleTr: 'Hızlı Teslimat', titleEn: 'Fast Delivery', descTr: 'İhtiyaç duyduğunuz makineyi hızlı ve zamanında yerinize ulaştırıyoruz.', descEn: 'We deliver the machine you need to your site quickly and on time.' },
  { icon: Shield, titleTr: 'Güvenilir Hizmet', titleEn: 'Reliable Service', descTr: 'Dürüst, şeffaf ve müşteri odaklı hizmet anlayışımızla sektörde fark yaratıyoruz.', descEn: 'We make a difference with our honest, transparent and customer-focused approach.' },
  { icon: Headset, titleTr: 'Teknik Destek', titleEn: 'Technical Support', descTr: 'Uzman ekibimizle hızlı teknik servis, arıza çözümü ve yedek parça hizmeti.', descEn: 'Fast technical service, fault resolution and spare parts with our expert team.' },
];

export function WhyChooseUs() {
  const { t, locale } = useLanguage();
  const tr = locale === 'tr';

  return (
    <section className="relative section-y bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <SectionHeading dark kicker={t('why.label')} title={t('why.title')} className="mb-12 lg:mb-16" />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
          {features.map((f) => (
            <StaggerItem key={f.titleTr} className="h-full">
              <div className="group relative h-full bg-ink p-7 lg:p-8 hover:bg-ink-2 transition-colors duration-300">
                <div className="w-11 h-11 rounded-md bg-brand/20 border border-brand/30 text-brand-light flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-xl">{tr ? f.titleTr : f.titleEn}</h3>
                <p className="mt-2.5 text-white/60 text-sm leading-relaxed">{tr ? f.descTr : f.descEn}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
