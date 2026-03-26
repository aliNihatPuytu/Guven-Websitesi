'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionWrapper, SlideIn, FadeIn } from '@/components/ui/section-wrapper';

const highlights = [
  '1978\'den beri sektörde faaliyet',
  'Geniş ürün ve marka yelpazesi',
  'Hızlı yedek parça temini',
  'Profesyonel teknik kadro',
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
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-company.jpg"
                  alt="Güven İş ve İstif Makinaları ekipman filosu"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-[#1E5AA8] text-white p-6 rounded-lg shadow-xl"
              >
                <div className="text-4xl font-bold">45+</div>
                <div className="text-sm mt-1">Yıl Deneyim</div>
              </motion.div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#F2F1ED] rounded-lg -z-10" />
            </div>
          </SlideIn>

          {/* Content */}
          <SlideIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
                Hakkımızda
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] leading-tight">
                1978'den Bu Yana Güvenle Hizmet
              </h2>
              <p className="text-lg text-[#2B2B2B]/80 leading-relaxed">
                Güven İş ve İstif Makinaları, 1978 yılından bu yana İstanbul'da iş ve istif makineleri sektöründe faaliyet göstermektedir. Kurulduğumuz günden bu yana edindiğimiz tecrübe ve güven anlayışıyla müşterilerimize kaliteli, hızlı ve sürdürülebilir çözümler sunmaktayız.
              </p>
              <p className="text-[#2B2B2B]/70 leading-relaxed">
                Firmamız çeşitli iş ve istif makinelerinin satış, kiralama ve yedek parça hizmetlerini profesyonel bir anlayışla sunmaktadır. Geniş ürün yelpazemiz sayesinde birçok farklı markaya ait iş ve istif makineleri için müşterilerimize uygun seçenekler sunuyor, ihtiyaç duyulan yedek parça ve teknik destek konusunda hızlı çözümler sağlıyoruz.
              </p>

              {/* Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#1E5AA8] flex-shrink-0" />
                    <span className="text-[#2B2B2B] text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white group w-fit"
              >
                <Link href="/#iletisim" className="flex items-center gap-2">
                  Bizimle İletişime Geçin
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </SlideIn>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          {[
            {
              title: 'Misyonumuz',
              text: 'Müşterilerimizin iş süreçlerini kolaylaştıran güvenilir, kaliteli ve verimli iş ve istif makinesi çözümleri sunmak; satış, kiralama ve yedek parça hizmetlerinde hızlı, dürüst ve profesyonel bir hizmet anlayışıyla sektörde kalıcı değer üretmek.',
            },
            {
              title: 'Vizyonumuz',
              text: 'İş ve istif makineleri sektöründe güvenilirliği, hizmet kalitesi ve müşteri memnuniyetiyle öne çıkan; yenilikçi çözümler sunarak Türkiye genelinde alanında önde gelen firmalardan biri olmak.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F2F1ED] p-8 rounded-lg border-l-4 border-[#1E5AA8]"
            >
              <h3 className="font-heading text-2xl text-[#2B2B2B] mb-4">{item.title}</h3>
              <p className="text-[#2B2B2B]/70 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
