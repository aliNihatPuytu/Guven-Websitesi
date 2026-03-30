'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Linkedin, ArrowRight } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { teamMembers } from '@/lib/team-data';

export function TeamPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E5AA8]/80 via-[#1E3A6E]/70 to-[#2B2B2B]/80" />
        <div className="relative z-10 text-center px-6 pt-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-semibold text-white/60 tracking-widest uppercase mb-4"
          >
            Profesyonel Kadromuz
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Ekibimiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/75 max-w-2xl mx-auto"
          >
            45 yılı aşkın deneyimimizin arkasındaki güçlü ve uzman kadromuzla tanışın.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <SectionWrapper className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
              Kadromuz
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">
              Uzman Ekibimiz
            </h2>
            <p className="mt-4 text-lg text-[#0B1929]/65 max-w-2xl mx-auto">
              Deneyim ve uzmanlığı bir araya getiren ekibimiz, her projede en yüksek kaliteyi sağlamak için çalışmaktadır.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/ekip/${member.id}`}>
                  {/* Photo */}
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-5 shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#1E5AA8]/0 group-hover:bg-[#1E5AA8]/20 transition-all duration-300" />
                    {/* Blue tag at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A2B4A]/80 to-transparent p-4">
                      <span className="inline-block bg-[#1E5AA8] text-white text-xs font-semibold px-3 py-1 rounded-md">
                        {member.title}
                      </span>
                    </div>
                    {/* Arrow on hover */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 shadow-md">
                      <ArrowRight className="w-5 h-5 text-[#1E5AA8]" />
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-heading text-xl text-[#0B1929] group-hover:text-[#1E5AA8] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-[#1E5AA8]/75 mt-1 mb-3">
                      {member.title}
                    </p>

                    {/* Contact quick links */}
                    <div className="flex items-center gap-2 mt-2" onClick={(e) => e.preventDefault()}>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-9 h-9 rounded-full bg-[#EEF3FB] hover:bg-[#1E5AA8] flex items-center justify-center transition-colors group/icon"
                        title={member.email}
                      >
                        <Mail className="w-4 h-4 text-[#1E5AA8] group-hover/icon:text-white transition-colors" />
                      </a>
                      <a
                        href={`tel:${member.phone.replace(/[\s()]/g, '')}`}
                        className="w-9 h-9 rounded-full bg-[#EEF3FB] hover:bg-[#1E5AA8] flex items-center justify-center transition-colors group/icon"
                        title={member.phone}
                      >
                        <Phone className="w-4 h-4 text-[#1E5AA8] group-hover/icon:text-white transition-colors" />
                      </a>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-[#EEF3FB] hover:bg-[#1E5AA8] flex items-center justify-center transition-colors group/icon"
                        >
                          <Linkedin className="w-4 h-4 text-[#1E5AA8] group-hover/icon:text-white transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
