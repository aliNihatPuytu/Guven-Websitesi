'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';
import { Reveal, Counter } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';

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
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          {/* Kapak — marka mavisi (#1e5aa8) zemin + beyaz logo */}
          <span className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand to-brand-dark" aria-hidden />
          <span className="absolute inset-0 grid-texture opacity-40" aria-hidden />
          <span className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <Image
            src="/images/guven-white.png"
            alt=""
            width={220}
            height={72}
            className="absolute top-6 left-6 w-36 sm:w-44 h-auto opacity-95"
          />
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
              className="absolute z-20 -bottom-5 right-4 sm:right-6 bg-brand text-white px-6 py-5 rounded-xl shadow-xl ring-4 ring-white"
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
  );
}
