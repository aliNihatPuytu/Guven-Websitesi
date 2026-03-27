'use client';

import { motion } from 'framer-motion';
import { Award, Cog, Users, Zap, Shield, Headphones } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';

const features = [
  {
    icon: Award,
    title: '45+ Yıl Deneyim',
    description: '1978\'den beri sektörün güvenilir ismi olarak faaliyet gösteriyoruz.',
  },
  {
    icon: Cog,
    title: 'Modern Makine Parkı',
    description: 'Son teknoloji, düzenli bakımlı ve sigortalı geniş makine filosu.',
  },
  {
    icon: Users,
    title: 'Profesyonel Kadro',
    description: 'Sertifikalı ve deneyimli operatör ve teknik kadromuzla hizmetinizdeyiz.',
  },
  {
    icon: Zap,
    title: 'Hızlı Teslimat',
    description: 'İhtiyacınız olduğunda makinenizi zamanında yerinize ulaştırıyoruz.',
  },
  {
    icon: Shield,
    title: 'Güvenilir Hizmet',
    description: 'Dürüst, şeffaf ve müşteri odaklı bir hizmet anlayışıyla çalışıyoruz.',
  },
  {
    icon: Headphones,
    title: 'Teknik Destek',
    description: 'Uzman ekibimizle hızlı teknik servis ve yedek parça hizmeti sunuyoruz.',
  },
];

export function WhyChooseUs() {
  return (
    <SectionWrapper className="py-24 lg:py-32 bg-[#0B2545]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#4A90D9] tracking-widest uppercase">
            Neden Güven?
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Bizi Tercih Etmeniz İçin Nedenler
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Sektördeki uzun yıllara dayanan deneyimimiz ve güvenilir hizmet anlayışımızla fark yaratıyoruz.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/8 hover:border-[#1E5AA8]/50 hover:bg-[#1E5AA8]/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E5AA8] flex items-center justify-center mb-6 group-hover:bg-[#4A90D9] transition-colors">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-xl text-white mb-3">{feature.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
