'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';

const machines = [
  {
    id: 'ekskavatorler',
    title: 'Ekskavatörler',
    description: 'Kazı ve hafriyat işleri için güçlü ekskavatörler. 20-80 ton arası çeşitli kapasiteler.',
    image: '/images/machines/excavator.jpg',
  },
  {
    id: 'forkliftler',
    title: 'Forkliftler',
    description: 'Depo ve şantiye için yük taşıma çözümleri. Elektrikli ve dizel seçenekler mevcut.',
    image: '/images/machines/forklift.jpg',
  },
  {
    id: 'istif-makineleri',
    title: 'İstif Makineleri',
    description: 'Dar alanlarda yüksek verimlilikle çalışan istif makineleri ve reach truck\'lar.',
    image: '/images/machines/loader.jpg',
  },
  {
    id: 'yukleyiciler',
    title: 'Yükleyiciler',
    description: 'Malzeme taşıma ve yükleme işleri için güvenilir yükleyiciler. Her ölçeğe uygun.',
    image: '/images/machines/mini-excavator.jpg',
  },
  {
    id: 'mini-ekskavatorler',
    title: 'Mini Ekskavatörler',
    description: 'Dar alanlarda kazı işleri için kompakt ve manevra kabiliyeti yüksek modeller.',
    image: '/images/machines/site-equipment.jpg',
  },
];

export function MachineCategories() {
  return (
    <SectionWrapper id="makinalar" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
            Makine Kategorileri
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] mt-3">
            Geniş Makine Filomuz
          </h2>
          <p className="mt-4 text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
            Her türlü inşaat ve lojistik projeniz için doğru ekipmanı sunuyoruz.
          </p>
        </FadeIn>

        {/* 3-col grid, last two centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.slice(0, 3).map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-[66.666%] lg:mx-auto">
          {machines.slice(3).map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index + 3} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function MachineCard({ machine, index }: { machine: typeof machines[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group overflow-hidden rounded-lg border border-[#E5E5E5] bg-white hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={machine.image}
          alt={machine.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl text-[#2B2B2B] mb-2 group-hover:text-[#1E5AA8] transition-colors">
          {machine.title}
        </h3>
        <p className="text-[#2B2B2B]/70 text-sm leading-relaxed mb-4">
          {machine.description}
        </p>
        <Button
          asChild
          variant="outline"
          className="w-full min-h-[44px] group/btn border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white"
        >
          <Link href={`/makinalar/${machine.id}`}>
            Detayları Gör
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
