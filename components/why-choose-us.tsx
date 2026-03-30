'use client';

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
    titleTr: 'Modern Makine Parkı',
    titleEn: 'Modern Machine Fleet',
    descTr: 'Son teknoloji, düzenli bakımlı ve tam sigortalı geniş makine filomuz her projeye hazır.',
    descEn: 'Our latest-technology, regularly maintained and fully insured large machine fleet is ready for every project.',
  },
  {
    icon: Users,
    titleTr: 'Profesyonel Kadro',
    titleEn: 'Professional Team',
    descTr: 'Sertifikalı ve deneyimli operatör ile teknik kadromuzla güvenli hizmet garantisi.',
    descEn: 'Guaranteed safe service with our certified and experienced operator and technical team.',
  },
  {
    icon: Zap,
    titleTr: 'Hızlı Teslimat',
    titleEn: 'Fast Delivery',
    descTr: 'İhtiyaç duyduğunuzda makineyi zamanında ve eksiksiz yerinize ulaştırıyoruz.',
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
];

export function WhyChooseUs() {
  const { t, locale } = useLanguage();

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
  );
}
