'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';

const projects = [
  {
    id: 'istanbul-metro',
    title: 'İstanbul Metro Şantiye Çalışmaları',
    location: 'İstanbul, Türkiye',
    description: 'İstanbul metrosu genişletme projesi kapsamında büyük çaplı kazı ve hafriyat işleri gerçekleştirildi.',
    image: '/images/projects/metro-construction.jpg',
    machines: ['Ekskavatör', 'Yükleyici', 'Kamyon'],
  },
  {
    id: 'konut-projesi',
    title: 'Büyük Konut Projesi Hafriyat',
    location: 'Ankara, Türkiye',
    description: '2000 konutluk dev projede temel kazı ve zemin hazırlık çalışmaları başarıyla tamamlandı.',
    image: '/images/projects/residential-excavation.jpg',
    machines: ['Mini Ekskavatör', 'Forklift', 'İstif Makinesi'],
  },
  {
    id: 'endustriyel-tesis',
    title: 'Endüstriyel Tesis İnşaatı',
    location: 'Kocaeli, Türkiye',
    description: '50.000 m² alana sahip endüstriyel tesis inşaatında kapsamlı makine desteği sağlandı.',
    image: '/images/projects/industrial-facility.jpg',
    machines: ['Ekskavatör', 'Forklift', 'Yükleyici'],
  },
];

export function ProjectGallery() {
  return (
    <SectionWrapper id="projeler" className="py-24 lg:py-32 bg-[#F2F1ED]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
              Projelerimiz
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] mt-3">
              Tamamladığımız Projeler
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white group w-fit"
          >
            <Link href="/projeler" className="flex items-center gap-2">
              Tüm Projeleri Gör
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group overflow-hidden rounded-lg bg-white border border-[#E5E5E5] hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/projeler/${project.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1E5AA8]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#1E5AA8] bg-transparent"
                    >
                      Projeyi İncele
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-sm text-[#2B2B2B]/60 mb-2">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                  <h3 className="font-heading text-xl text-[#2B2B2B] mb-2 group-hover:text-[#1E5AA8] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#2B2B2B]/70 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.machines.map((machine) => (
                      <span
                        key={machine}
                        className="px-2 py-1 text-xs bg-[#EEF3FB] text-[#1E5AA8] rounded font-medium"
                      >
                        {machine}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
