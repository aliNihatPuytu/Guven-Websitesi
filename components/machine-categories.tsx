'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { machines } from '@/lib/machine-data';

export function MachineCategories() {
  return (
    <SectionWrapper id="makinalar" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
            Makine Kategorileri
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">
            Geniş Makine Filomuz
          </h2>
          <p className="mt-4 text-lg text-[#0B1929]/65 max-w-2xl mx-auto">
            Her türlü inşaat ve lojistik projeniz için doğru ekipmanı sunuyoruz.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-xl border border-[#E8ECF0] bg-white hover:shadow-2xl hover:border-[#1E5AA8]/20 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={machine.image}
                  alt={machine.title}
                  fill
                  className="object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A6E]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Hover CTA overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white text-[#1E5AA8] font-medium px-5 py-2.5 rounded-lg text-sm shadow-lg">
                    Detayları Gör
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl text-[#0B1929] mb-2 group-hover:text-[#1E5AA8] transition-colors duration-200">
                  {machine.title}
                </h3>
                <p className="text-[#0B1929]/65 text-sm leading-relaxed mb-5 line-clamp-2">
                  {machine.shortDesc}
                </p>

                {/* Usage badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {machine.usageAreas.slice(0, 3).map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 text-xs bg-[#EEF3FB] text-[#1E5AA8] rounded-md font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full min-h-[44px] border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white group/btn transition-all duration-200"
                >
                  <Link href={`/makinalar/${machine.id}`}>
                    Detayları Gör
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
