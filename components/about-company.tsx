'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionWrapper, SlideIn, FadeIn } from '@/components/ui/section-wrapper';

const highlights = [
  '1978\'den beri aktif faaliyet',
  'Geniş ürün ve marka yelpazesi',
  'Hızlı yedek parça temini',
  'Deneyimli teknik kadro',
  'Müşteri odaklı hizmet anlayışı',
  'Kalite ve güven ilkeleri',
];

export function AboutCompany() {
  return (
    <SectionWrapper id="hakkimizda" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <SlideIn direction="left">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-company.jpg"
                  alt="Güven İş ve İstif Makinaları ekipman filosu"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="absolute -bottom-6 -right-6 bg-[#1E5AA8] text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl font-bold">45+</div>
                <div className="text-sm mt-1 text-white/80">Yıl Deneyim</div>
              </motion.div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#EEF3FB] rounded-2xl -z-10" />
            </div>
          </SlideIn>

          {/* Content */}
          <SlideIn direction="right" delay={0.15}>
            <div className="space-y-6">
              <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
                Hakkımızda
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] leading-tight">
                1978'den Bu Yana Güvenle Hizmet
              </h2>
              <p className="text-lg text-[#2B2B2B]/70 leading-relaxed">
                Güven İş ve İstif Makinaları, 1978 yılından bu yana İstanbul'da iş ve istif makineleri sektöründe faaliyet göstermektedir. Kurulduğumuz günden bu yana edindiğimiz tecrübe ve güven anlayışıyla müşterilerimize kaliteli, hızlı ve sürdürülebilir çözümler sunmaktayız.
              </p>
              <p className="text-[#2B2B2B]/60 leading-relaxed">
                Firmamız çeşitli iş ve istif makinelerinin satış, kiralama ve yedek parça hizmetlerini profesyonel bir anlayışla sunmaktadır. Geniş ürün yelpazemiz sayesinde birçok farklı markaya ait iş ve istif makineleri için müşterilerimize uygun seçenekler sunuyor, ihtiyaç duyulan yedek parça ve teknik destek konusunda hızlı çözümler sağlıyoruz.
              </p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#1E5AA8] flex-shrink-0" />
                    <span className="text-[#2B2B2B] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                className="border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white group w-fit mt-2"
              >
                <Link href="/#iletisim" className="flex items-center gap-2">
                  Bizimle İletişime Geçin
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </SlideIn>
        </div>

        {/* Mission & Vision cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-20">
          {[
            {
              label: 'Misyonumuz',
              text: 'Müşterilerimizin iş süreçlerini kolaylaştıran güvenilir, kaliteli ve verimli iş ve istif makinesi çözümleri sunmak; satış, kiralama ve yedek parça hizmetlerinde hızlı, dürüst ve profesyonel bir hizmet anlayışıyla sektörde kalıcı değer üretmek.',
            },
            {
              label: 'Vizyonumuz',
              text: 'İş ve istif makineleri sektöründe güvenilirliği, hizmet kalitesi ve müşteri memnuniyetiyle öne çıkan; yenilikçi çözümler sunarak Türkiye genelinde alanında önde gelen firmalardan biri olmak.',
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F6F8FB] p-8 rounded-2xl border-l-4 border-[#1E5AA8]"
            >
              <h3 className="font-heading text-2xl text-[#1E5AA8] mb-4">{card.label}</h3>
              <p className="text-[#2B2B2B]/65 leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
