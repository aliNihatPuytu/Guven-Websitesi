'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Wrench } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

const projects = [
  {
    id: 'istanbul-metro',
    titleTr: 'İstanbul Metro Şantiye Çalışmaları',
    titleEn: 'Istanbul Metro Construction Works',
    location: 'İstanbul, Türkiye',
    descTr: 'İstanbul metrosu genişletme projesi kapsamında büyük çaplı kazı ve hafriyat işleri gerçekleştirildi.',
    descEn: 'Large-scale excavation and earthwork operations were carried out within the scope of the Istanbul metro expansion project.',
    image: '/images/projects/metro-construction.jpg',
    machines: ['Ekskavatör', 'Yükleyici', 'Kamyon'],
  },
  {
    id: 'konut-projesi',
    titleTr: 'Büyük Konut Projesi Hafriyat',
    titleEn: 'Large Residential Project Excavation',
    location: 'Ankara, Türkiye',
    descTr: '2.000 konutluk projenin temel kazı ve zemin hazırlık çalışmaları başarıyla tamamlandı.',
    descEn: 'Foundation excavation and ground preparation works for a 2,000-unit project were successfully completed.',
    image: '/images/projects/residential-excavation.jpg',
    machines: ['Mini Ekskavatör', 'Forklift', 'İstif Makinesi'],
  },
  {
    id: 'endustriyel-tesis',
    titleTr: 'Endüstriyel Tesis İnşaatı',
    titleEn: 'Industrial Facility Construction',
    location: 'Kocaeli, Türkiye',
    descTr: '50.000 m² alana sahip endüstriyel tesis inşaatında kapsamlı makine desteği sağlandı.',
    descEn: 'Comprehensive machinery support was provided for the construction of an industrial facility covering 50,000 m².',
    image: '/images/projects/industrial-facility.jpg',
    machines: ['Ekskavatör', 'Forklift', 'Yükleyici'],
  },
];

export function ProjectGallery() {
  const { t, locale } = useLanguage();

  return (
    <SectionWrapper id="projeler" className="py-24 lg:py-32 bg-[#F6F8FB]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm font-semibold text-[#1E5AA8] tracking-widest uppercase">
              {t('projects.label')}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">
              {t('projects.title')}
            </h2>
          </div>
          <Button asChild variant="outline"
            className="border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white group w-fit">
            <Link href="/projeler" className="flex items-center gap-2">
              {t('projects.viewAll')}
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
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group overflow-hidden rounded-2xl bg-white border border-[#E8ECF0] hover:shadow-2xl hover:shadow-[#1E5AA8]/8 hover:border-[#1E5AA8]/20 transition-all duration-300"
            >
              <Link href={`/projeler/${project.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={locale === 'tr' ? project.titleTr : project.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E5AA8] px-3 py-1.5 rounded-lg">
                      {locale === 'tr' ? 'Projeyi İncele' : 'View Project'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#0B1929]/50 mb-2.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#1E5AA8]" />
                    {project.location}
                  </div>
                  <h3 className="font-heading text-xl text-[#0B1929] mb-2 group-hover:text-[#1E5AA8] transition-colors leading-snug">
                    {locale === 'tr' ? project.titleTr : project.titleEn}
                  </h3>
                  <p className="text-[#0B1929]/60 text-sm leading-relaxed line-clamp-2 mb-4">
                    {locale === 'tr' ? project.descTr : project.descEn}
                  </p>
                  <div className="flex items-center gap-1.5 pt-3 border-t border-[#E8ECF0]">
                    <Wrench className="w-3.5 h-3.5 text-[#1E5AA8]/60 flex-shrink-0" />
                    <div className="flex flex-wrap gap-1.5">
                      {project.machines.map((machine) => (
                        <span key={machine}
                          className="px-2 py-0.5 text-xs bg-[#EEF3FB] text-[#1E5AA8] rounded-md font-medium">
                          {machine}
                        </span>
                      ))}
                    </div>
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
