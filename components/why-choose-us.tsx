'use client';

<<<<<<< HEAD
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
=======
import { motion } from 'framer-motion';
import { Award, Cog, Users, Zap, Shield, Headphones } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

const features = [
  {
    icon: Award,
    titleTr: '45+ Yıl Deneyim',
    titleEn: '45+ Years Experience',
    descTr: "1978'den beri sektörün güvenilir ismi olarak kesintisiz hizmet veriyoruz.",
    descEn: 'We have been providing uninterrupted service as the trusted name of the industry since 1978.',
  },
  {
    icon: Cog,
    titleTr: 'Makine Parkı',
    titleEn: 'Modern Machine Fleet',
    descTr: 'Düzenli ve bakımlı geniş makine filomuz her projeye hazır.',
    descEn: 'Our latest-technology, regularly maintained and fully insured large machine fleet is ready for every project.',
  },
  {
    icon: Users,
    titleTr: 'Profesyonel Kadro',
    titleEn: 'Professional Team',
    descTr: 'Sertifikalı ve deneyimli operatörlerimiz ile güvenilir hizmet sunuyoruz.',
    descEn: 'Guaranteed safe service with our certified and experienced operator and technical team.',
  },
  {
    icon: Zap,
    titleTr: 'Hızlı Teslimat',
    titleEn: 'Fast Delivery',
    descTr: 'İhtiyaç duyduğunuz makine hızlı ve zamanında yerinize ulaştırıyoruz.',
    descEn: 'We deliver the machine to your location on time and completely when you need it.',
  },
  {
    icon: Shield,
    titleTr: 'Güvenilir Hizmet',
    titleEn: 'Reliable Service',
    descTr: 'Dürüst, şeffaf ve müşteri odaklı hizmet anlayışımızla sektörde fark yaratıyoruz.',
    descEn: 'We make a difference in the industry with our honest, transparent and customer-focused service approach.',
  },
  {
    icon: Headphones,
    titleTr: 'Teknik Destek',
    titleEn: 'Technical Support',
    descTr: 'Uzman ekibimizle hızlı teknik servis, arıza çözümü ve yedek parça hizmeti.',
    descEn: 'Fast technical service, fault resolution and spare parts service with our expert team.',
  },
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
];

export function WhyChooseUs() {
  const { t, locale } = useLanguage();
<<<<<<< HEAD
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
=======

  return (
    <SectionWrapper className="py-24 lg:py-32 bg-[#0B1929]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-semibold text-[#4A90D9] tracking-widest uppercase">
            {t('why.label')}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            {t('why.title')}
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleTr}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white/5 p-7 rounded-2xl border border-white/8 hover:border-[#1E5AA8]/50 hover:bg-white/8 transition-all duration-300"
            >
              {/* Subtle top accent on hover */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#1E5AA8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />

              <div className="w-12 h-12 rounded-xl bg-[#1E5AA8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-xl text-white mb-2.5">
                {locale === 'tr' ? feature.titleTr : feature.titleEn}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {locale === 'tr' ? feature.descTr : feature.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  );
}
