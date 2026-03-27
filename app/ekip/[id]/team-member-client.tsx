'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Linkedin, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionWrapper, FadeIn, SlideIn } from '@/components/ui/section-wrapper';
import { Button } from '@/components/ui/button';
import type { TeamMember } from '@/lib/team-data';

interface Props {
  member: TeamMember;
  otherMembers: TeamMember[];
}

export function TeamMemberClient({ member, otherMembers }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B4A] via-[#1E5AA8]/50 to-transparent" />
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-8 pb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-semibold text-white/60 tracking-widest uppercase bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-4"
          >
            Güven İş ve İstif Makinaları
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-2"
          >
            {member.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 font-medium"
          >
            {member.title}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Back */}
          <FadeIn className="mb-12">
            <Button asChild variant="outline" className="border-[#2B2B2B]/20 text-[#2B2B2B] hover:bg-[#1E5AA8] hover:text-white hover:border-[#1E5AA8] group">
              <Link href="/ekip" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Ekibe Dön
              </Link>
            </Button>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-14 items-start">
            {/* Left – Photo + Contact */}
            <SlideIn direction="left" className="lg:sticky lg:top-28 space-y-6">
              {/* Photo */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-[#E8ECF0]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A2B4A]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-[#1E5AA8] text-white text-xs font-semibold tracking-wide px-3 py-1.5 rounded-lg">
                    {member.title}
                  </span>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-[#F6F8FB] rounded-2xl p-6 space-y-3 border border-[#E8ECF0]">
                <h3 className="font-heading text-lg text-[#2B2B2B] border-b border-[#E8ECF0] pb-3 mb-1">
                  İletişim
                </h3>

                <a href={`mailto:${member.email}`} className="flex items-center gap-3 group/c p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-[#E8ECF0]">
                  <div className="w-10 h-10 rounded-xl bg-[#1E5AA8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#2B2B2B]/50 mb-0.5">E-posta</p>
                    <p className="text-sm text-[#2B2B2B] group-hover/c:text-[#1E5AA8] transition-colors truncate font-medium">{member.email}</p>
                  </div>
                </a>

                <a href={`tel:${member.phone.replace(/[\s()]/g, '')}`} className="flex items-center gap-3 group/c p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-[#E8ECF0]">
                  <div className="w-10 h-10 rounded-xl bg-[#1E5AA8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2B2B2B]/50 mb-0.5">Telefon</p>
                    <p className="text-sm font-medium text-[#2B2B2B] group-hover/c:text-[#1E5AA8] transition-colors">{member.phone}</p>
                  </div>
                </a>

                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/c p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-[#E8ECF0]">
                    <div className="w-10 h-10 rounded-xl bg-[#1E5AA8] flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#2B2B2B]/50 mb-0.5">LinkedIn</p>
                      <p className="text-sm font-medium text-[#2B2B2B] group-hover/c:text-[#1E5AA8] transition-colors">Profili Görüntüle →</p>
                    </div>
                  </a>
                )}
              </div>

              <Button asChild className="w-full bg-[#1E5AA8] hover:bg-[#164a8a] text-white py-6 rounded-xl text-base">
                <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  E-posta Gönder
                </a>
              </Button>
            </SlideIn>

            {/* Right – Bio + Expertise */}
            <SlideIn direction="right" delay={0.15} className="lg:col-span-2 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-[#1E5AA8] rounded-full shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#1E5AA8] tracking-widest uppercase">Güven İş ve İstif Makinaları</p>
                    <h2 className="font-heading text-3xl md:text-4xl text-[#2B2B2B]">{member.name}</h2>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-[#1E5AA8] via-[#E8ECF0] to-transparent" />
              </div>

              <div>
                <h3 className="font-heading text-xl text-[#2B2B2B] mb-5 flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#1E5AA8] inline-block shrink-0" />
                  Hakkında
                </h3>
                <p className="text-lg text-[#2B2B2B]/70 leading-relaxed">{member.bio}</p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-[#2B2B2B] mb-6 flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#1E5AA8] inline-block shrink-0" />
                  Uzmanlık Alanları
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {member.expertise.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 p-4 bg-[#F6F8FB] rounded-xl border border-[#E8ECF0] hover:border-[#1E5AA8]/20 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#1E5AA8] shrink-0" />
                      <span className="font-medium text-[#2B2B2B] text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </SectionWrapper>

      {/* Other Team Members */}
      <SectionWrapper className="py-16 bg-[#F6F8FB] border-t border-[#E8ECF0]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <FadeIn className="mb-10">
            <h3 className="font-heading text-2xl text-[#2B2B2B]">Diğer Ekip Üyeleri</h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {otherMembers.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/ekip/${m.id}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all group border border-[#E8ECF0] hover:border-[#1E5AA8]/20"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E8ECF0]">
                    <Image src={m.image} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-bold text-[#2B2B2B] group-hover:text-[#1E5AA8] transition-colors truncate">{m.name}</p>
                    <p className="text-sm text-[#2B2B2B]/55 truncate">{m.title}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#1E5AA8] shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
