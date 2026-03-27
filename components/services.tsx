'use client';

import { motion } from 'framer-motion';
import { Truck, ShoppingCart, Wrench, Users } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';

const services = [
  {
    icon: Truck,
    title: 'İş ve İstif Makinesi Kiralama',
    description: 'Geniş makine filomuzla kısa ve uzun süreli kiralama hizmetleri sunuyoruz. Tüm makinalarımız düzenli bakımlı ve sigortalıdır.',
  },
  {
    icon: ShoppingCart,
    title: 'Makina Satışı',
    description: 'Yeni ve ikinci el iş ve istif makineleri satışı yapıyoruz. Güvenilir markalardan kaliteli makineler, garanti hizmetiyle.',
  },
  {
    icon: Wrench,
    title: 'Yedek Parça',
    description: 'Birçok farklı markaya ait iş ve istif makineleri için orijinal ve muadil yedek parça hızlı teslimatla sunuyoruz.',
  },
  {
    icon: Users,
    title: 'Servis ve Teknik Destek',
    description: 'Deneyimli ekibimizle yerinde servis, bakım ve teknik danışmanlık hizmeti sunuyoruz. Her aşamada yanınızdayız.',
  },
];

export function Services() {
  return (
    <SectionWrapper id="hizmetler" className="py-24 lg:py-32 bg-[#F6F8FB]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
            Hizmetlerimiz
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] mt-3">
            Kapsamlı Makina Çözümleri
          </h2>
          <p className="mt-4 text-lg text-[#2B2B2B]/55 max-w-2xl mx-auto">
            45 yılı aşkın tecrübemizle iş ve istif makineleri alanında kapsamlı çözümler sunuyoruz.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white p-8 rounded-2xl border border-[#E8ECF0] hover:border-[#1E5AA8]/30 hover:shadow-2xl hover:shadow-[#1E5AA8]/8 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#EEF3FB] flex items-center justify-center mb-6 group-hover:bg-[#1E5AA8] transition-colors duration-300">
                <service.icon className="w-7 h-7 text-[#1E5AA8] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl text-[#2B2B2B] mb-3 group-hover:text-[#1E5AA8] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#2B2B2B]/60 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
