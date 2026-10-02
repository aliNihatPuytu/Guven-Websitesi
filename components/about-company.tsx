'use client';
<<<<<<< HEAD
=======
import { useLanguage } from '@/contexts/language-context';
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { CheckCircle2, ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';
import { Reveal, Counter } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';

const highlightKeys = ['highlight.1', 'highlight.2', 'highlight.3', 'highlight.4', 'highlight.5', 'highlight.6'];

/** Tanıtım filmi oynatıcı: siteConfig.video üzerinden dosya veya YouTube. */
function PromoVideo() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const useYouTube = Boolean(siteConfig.video.youtubeId);

  const play = () => {
    setPlaying(true);
    if (!useYouTube) {
      requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
=======
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
<<<<<<< HEAD
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-ink shadow-[0_40px_80px_-40px_rgba(11,25,41,.6)]">
      {useYouTube ? (
        playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${siteConfig.video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={t('about.play')}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : null
      ) : (
        <video
          ref={videoRef}
          src={siteConfig.video.file}
          poster={siteConfig.video.poster}
          playsInline
          controls={playing}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {!playing && (
        <button
          type="button"
          onClick={play}
          className="group absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          aria-label={t('about.play')}
        >
          <Image src={siteConfig.video.poster} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <span className="relative w-20 h-20 rounded-full bg-white text-brand flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 rounded-full bg-white/40 animate-ping [animation-duration:2.2s]" aria-hidden />
            <Play className="relative w-7 h-7 ml-1" fill="currentColor" />
          </span>
          <span className="absolute bottom-5 left-5 text-sm font-medium text-white/90">{t('about.play')}</span>
        </button>
      )}

      {playing && !useYouTube && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

export function AboutCompany({ full = false }: { full?: boolean }) {
  const { t } = useLanguage();

  return (
    <section id="hakkimizda" className="section-y bg-white scroll-mt-20 overflow-hidden">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Video paneli */}
          <Reveal className="lg:col-span-6 relative">
            <PromoVideo />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="absolute z-20 -bottom-5 right-4 sm:right-6 bg-brand text-white px-6 py-5 rounded-xl shadow-xl"
            >
              <div className="font-heading font-bold text-4xl leading-none">
                <Counter to={45} suffix="+" />
              </div>
              <div className="text-sm mt-1.5 text-white/80">{t('hero.stat.experience')}</div>
            </motion.div>
          </Reveal>

          {/* Metin */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:pl-4">
            <div className="rule">
              <p className="text-sm font-semibold text-brand mb-3">{t('about.label')}</p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-ink leading-[1.05]">{t('about.title')}</h2>
            </div>
            <p className="mt-6 text-base sm:text-lg text-ink/80 leading-relaxed">{t('about.p1')}</p>
            <p className="mt-4 text-steel leading-relaxed">{t('about.p2')}</p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {highlightKeys.map((k) => (
                <li key={k} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-ink text-sm font-medium leading-snug">{t(k)}</span>
                </li>
              ))}
            </ul>

            <Link
              href={full ? '/iletisim' : '/hakkimizda'}
              className="group mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-md border border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-colors"
            >
              {full ? t('about.cta') : t('machines.cta')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Misyon & Vizyon — yalnızca tam sayfada */}
        {full && (
          <div className="grid md:grid-cols-2 gap-5 mt-20">
            {[
              { title: t('about.mission.title'), text: t('about.mission.text') },
              { title: t('about.vision.title'), text: t('about.vision.text') },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="h-full bg-mist p-8 lg:p-10 rounded-xl border-l-4 border-brand">
                  <h3 className="font-heading font-bold text-2xl text-brand">{card.title}</h3>
                  <p className="mt-4 text-steel leading-relaxed">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
=======
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
                  alt="Güven İş ve İstif Makineleri ekipman filosu"
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
                Güven İş ve İstif Makineleri, 1978 yılından bu yana İstanbul'da iş ve istif makineleri sektöründe faaliyet göstermektedir. Kurulduğumuz günden bu yana edindiğimiz tecrübe ve güven anlayışıyla müşterilerimize kaliteli, hızlı ve sürdürülebilir çözümler sunmaktayız.
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  );
}
