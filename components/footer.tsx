'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

// ─── Sosyal medya & platform linkleri ────────────────────────────────────────
const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/guvenismakine?igsh=MTU0bzhweGY2OGw3bg==',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Sahibinden',
    label: 'Sahibinden.com',
    href: 'https://guvenismakine.sahibinden.com/',
    icon: (
      <svg viewBox="0 0 40 40" className="w-4 h-4" fill="currentColor">
        <path d="M20 2C10.059 2 2 10.059 2 20s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2zm0 4c7.732 0 14 6.268 14 14S27.732 34 20 34 6 27.732 6 20 12.268 6 20 6zm-1 5v3h-5v2h5v2h-5v2h5v3l6-6-6-6z"/>
      </svg>
    ),
  },
];

// ─── Telefon numaraları ────────────────────────────────────────────────────────
const phoneNumbers = [
  { number: '0 (216) 314 12 94', href: 'tel:+902163141294' },
  { number: '0 (532) 297 58 13', href: 'tel:+905322975813' },
  { number: '+90 531 697 36 90', href: 'tel:+905316973690' },
];

export function Footer() {
  const { t, locale } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/#hizmetler' },
    { name: t('nav.machines'), href: '/#makinalar' },
    { name: t('nav.listings'), href: '/#sahibinden' },
    { name: t('nav.projects'), href: '/projeler' },
    { name: t('nav.team'), href: '/ekip' },
    { name: t('nav.about'), href: '/#hakkimizda' },
    { name: t('nav.contact'), href: '/#iletisim' },
  ];

  const serviceLinks = [
    { name: locale === 'tr' ? 'İş Makinesi Kiralama' : 'Machine Rental', href: '/#hizmetler' },
    { name: locale === 'tr' ? 'Makina Satışı' : 'Machine Sales', href: '/#hizmetler' },
    { name: locale === 'tr' ? 'Yedek Parça' : 'Spare Parts', href: '/#hizmetler' },
    { name: locale === 'tr' ? 'Servis ve Teknik Destek' : 'Technical Support', href: '/#hizmetler' },
    { name: 'Sahibinden.com', href: 'https://guvenismakine.sahibinden.com/', external: true },
  ];

  return (
    <footer className="bg-[#0B1929] text-stone-100">
      <div className="h-1 bg-gradient-to-r from-[#1E5AA8] via-[#4A90D9] to-[#1E5AA8]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-5">
              <div className="relative w-44 h-12">
                <Image src="/images/logo-white.png" alt="Güven İş ve İstif Makinaları" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-sm text-white/40 italic mb-2">{t('footer.tagline')}</p>
            <p className="text-sm text-stone-400 leading-relaxed mb-6">{t('footer.desc')}</p>

            {/* Social / platform links */}
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-stone-400 hover:text-[#4A90D9] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center group-hover:bg-[#1E5AA8] transition-colors flex-shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-sm">{'label' in s ? s.label : s.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base text-white/80 mb-6">{t('footer.pages')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-stone-400 hover:text-[#4A90D9] transition-colors flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#4A90D9] transition-all duration-200 inline-block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-base text-white/80 mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-400 hover:text-[#4A90D9] transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#4A90D9] transition-all duration-200 inline-block" />
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-stone-400 hover:text-[#4A90D9] transition-colors flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-2 h-px bg-[#4A90D9] transition-all duration-200 inline-block" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-base text-white/80 mb-6">{t('nav.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1E5AA8] mt-0.5 shrink-0" />
                <span className="text-sm text-stone-400">
                  Esenşehir Mah., Gündeş Sk. No:14<br />34776 Ümraniye / İstanbul
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1E5AA8] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1.5">
                  {phoneNumbers.map((p) => (
                    <a key={p.href} href={p.href} className="text-sm text-stone-400 hover:text-[#4A90D9] transition-colors">
                      {p.number}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1E5AA8] shrink-0" />
                <a href="mailto:info@guvenismakine.com" className="text-sm text-stone-400 hover:text-[#4A90D9] transition-colors">
                  info@guvenismakine.com
                </a>
              </li>
            </ul>

            {/* Social icon row */}
            <div className="flex gap-2 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={'label' in s ? s.label : s.name}
                  className="w-9 h-9 rounded-lg bg-white/6 flex items-center justify-center text-stone-400 hover:bg-[#1E5AA8] hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-stone-500">
            © {currentYear} Güven İş ve İstif Makinaları. {t('footer.rights')}
          </p>
          <p className="text-xs text-stone-600">
            {t('footer.designer')}: <span className="text-stone-500">Ali Nihat Puytu</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
