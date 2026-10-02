'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative section-y bg-brand text-white overflow-hidden">
      <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-white/10 blur-3xl drift pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full bg-ink/30 blur-3xl drift-slow pointer-events-none" aria-hidden />
      <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />

      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-white/70 mb-3">{t('cta.badge')}</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">{t('cta.title')}</h2>
          <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl">{t('cta.desc')}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex flex-col xs:flex-row gap-3">
  <Link
    href="/iletisim#teklif"
    className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-white text-brand font-semibold hover:bg-ink hover:text-white transition-colors"
  >
    {t('cta.quote')}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Link>

  {siteConfig.phones.map((phone) => (
    <a
      key={phone.href}
      href={phone.href}
      className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md border border-white/40 text-white font-medium hover:bg-white/10 hover:border-white transition-colors tabular-nums"
    >
      <Phone className="w-4 h-4" />
      {phone.label}
    </a>
  ))}
</Reveal>
      </div>
    </section>
  );
}
