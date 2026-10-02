'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';
import { socialLinks } from '@/components/social-links';

export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();
  const tr = locale === 'tr';

  const pages = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/hizmetler' },
    { name: t('nav.machines'), href: '/makineler' },
    { name: t('nav.catalog'), href: '/katalog' },
    { name: t('nav.references'), href: '/referanslar' },
    { name: t('nav.about'), href: '/hakkimizda' },
    { name: t('nav.contact'), href: '/iletisim' },
  ];

  const services = [
    { name: tr ? 'İş Makinesi Kiralama' : 'Machine Rental', href: '/hizmetler#kiralama' },
    { name: tr ? 'Makine Satışı' : 'Machine Sales', href: '/hizmetler#satis' },
    { name: tr ? 'Yedek Parça' : 'Spare Parts', href: '/hizmetler#yedek-parca' },
    { name: tr ? 'Servis ve Teknik Destek' : 'Service & Technical Support', href: '/hizmetler#servis' },
    { name: tr ? 'Teklif Al' : 'Get a Quote', href: '/iletisim#teklif' },
  ];

  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />
      <div className="h-[3px] bg-gradient-to-r from-brand via-brand-light to-brand" />

      <div className="container-x relative">
        <div className="py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Marka */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={siteConfig.name}>
              <div className="relative w-[180px] h-12">
                <Image src="/images/guven-white.png" alt={siteConfig.name} fill sizes="180px" className="object-contain object-left" />
              </div>
            </Link>
            <p className="mt-5 text-white/60 text-sm leading-relaxed max-w-sm">{t('footer.desc')}</p>
            <p className="mt-3 font-heading text-white/90 italic">{t('footer.tagline')}</p>

            <ul className="mt-7 grid grid-cols-2 gap-2">
              {socialLinks.map(({ key, href, label, Icon }) => (
                <li key={key} className="w-full">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="group flex w-full items-center gap-2.5 h-10 px-2.5 rounded-md bg-white/6 border border-white/8 text-white/80 hover:bg-brand hover:border-brand hover:text-white transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sayfalar */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-semibold text-white mb-5">{t('footer.pages')}</h3>
            <ul className="space-y-2.5">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-light transition-all duration-300" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-semibold text-white mb-5">{t('footer.services')}</h3>
            <ul className="space-y-2.5">
              {services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-light transition-all duration-300" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-semibold text-white mb-5">{t('nav.contact')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-light mt-0.5 shrink-0" />
                <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors leading-relaxed">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.district} / {siteConfig.address.city}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-light mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1.5">
                  {siteConfig.phones.map((p) => (
                    <a key={p.href} href={p.href} className="text-white/60 hover:text-white transition-colors tabular-nums">
                      {p.label}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-light shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-white/60 hover:text-white transition-colors break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-light shrink-0" />
                <span className="text-white/60">
                  {tr ? siteConfig.hours.days : siteConfig.hours.daysEn} · {siteConfig.hours.time}
                </span>
              </li>
            </ul>

            <a
              href={siteConfig.social.sahibinden}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-light hover:text-white transition-colors"
            >
              {tr ? 'Sahibinden.com mağazamız' : 'Our sahibinden.com store'}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Alt şerit */}
        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {year} {siteConfig.legalName}. {t('footer.rights')}
          </p>
          <p>
            {t('footer.designer')}: <span className="text-white/60">Ali Nihat Puytu</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
