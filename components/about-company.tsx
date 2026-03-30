'use client';
import { useLanguage } from '@/contexts/language-context';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Volume2, VolumeX, Play } from 'lucide-react';
import { SectionWrapper, SlideIn, FadeIn } from '@/components/ui/section-wrapper';

const highlights = [
  "1978'den beri aktif faaliyet",
  'Geniş ürün ve marka yelpazesi',
  'Hızlı yedek parça temini',
  'Deneyimli teknik kadro',
  'Müşteri odaklı hizmet anlayışı',
  'Kalite ve güven ilkeleri',
];

export function AboutCompany() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <SectionWrapper id="hakkimizda" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Video / Image panel */}
          <SlideIn direction="left">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#0B1929] relative group">
                {/* Fallback image shown before video plays */}
                <Image
                  src="/images/about-company.jpg"
                  alt="Güven İş ve İstif Makinaları ekipman filosu"
                  fill
                  className={`object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                />
                {/* Video */}
                <video
                  ref={videoRef}
                  src="/videos/tanitim.mp4"
                  poster="/images/about-company.jpg"
                  muted={isMuted}
                  playsInline
                  loop
                  onPlay={() => setIsPlaying(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Play overlay — hidden once playing */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                    onClick={handlePlay}
                  >
                    <div className="w-20 h-20 rounded-full bg-[#1E5AA8]/90 backdrop-blur-sm flex items-center justify-center shadow-2xl border-2 border-white/30 group-hover:scale-105 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                    <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/70 font-medium tracking-wide">
                      Tanıtım videosunu izle
                    </span>
                  </div>
                )}
                {/* Mute button while playing */}
                {isPlaying && (
                  <button
                    onClick={toggleMute}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:bg-black/60 transition-all"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
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
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#EEF3FB] rounded-2xl -z-10" />
            </div>
          </SlideIn>

          {/* Content */}
          <SlideIn direction="right" delay={0.15}>
            <div className="space-y-6">
              <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
                Hakkımızda
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] leading-tight">
                1978'den Bu Yana Güvenle Hizmet
              </h2>
              <p className="text-lg text-[#0B1929]/70 leading-relaxed">
                Güven İş ve İstif Makinaları, 1978 yılından bu yana İstanbul'da iş ve istif makineleri sektöründe faaliyet göstermektedir. Kurulduğumuz günden bu yana edindiğimiz tecrübe ve güven anlayışıyla müşterilerimize kaliteli, hızlı ve sürdürülebilir çözümler sunmaktayız.
              </p>
              <p className="text-[#0B1929]/55 leading-relaxed">
                Firmamız çeşitli iş ve istif makinelerinin satış, kiralama ve yedek parça hizmetlerini profesyonel bir anlayışla sunmaktadır. Geniş ürün yelpazemiz sayesinde birçok farklı markaya ait makineler için müşterilerimize uygun seçenekler sunuyor, yedek parça ve teknik destek konusunda hızlı çözümler sağlıyoruz.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#1E5AA8] flex-shrink-0" />
                    <span className="text-[#0B1929] text-sm font-medium">{item}</span>
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
              <p className="text-[#0B1929]/65 leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
