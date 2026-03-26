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
    description: 'Son teknoloji, düzenli bakımlı ve sigortalı makine filosu.',
  },
  {
    icon: Users,
    title: 'Profesyonel Operatörler',
    description: 'Sertifikalı ve deneyimli operatör kadromuzla hizmetinizdeyiz.',
  },
  {
    icon: Zap,
    title: 'Hızlı Teslimat',
    description: 'İhtiyacınız olduğunda makinenizi zamanında yerinize ulaştırıyoruz.',
  },
  {
    icon: Shield,
    title: 'Güvenilir Hizmet',
    description: 'Dürüst, şeffaf ve müşteri odaklı bir anlayışla çalışıyoruz.',
  },
  {
    icon: Headphones,
    title: 'Teknik Destek',
    description: 'Uzman ekibimizle hızlı teknik destek ve yedek parça hizmeti.',
  },
];

export function WhyChooseUs() {
  return (
    <SectionWrapper className="py-24 lg:py-32 bg-[#2B2B2B]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
            Neden Güven?
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Bizi Tercih Etmeniz İçin Nedenler
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-[#3D3D3D] p-8 rounded-lg border border-[#4D4D4D] hover:border-[#1E5AA8] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#1E5AA8] flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-xl text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
