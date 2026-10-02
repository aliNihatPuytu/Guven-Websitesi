'use client';

<<<<<<< HEAD
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Phone, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';
import { socialLinks } from '@/components/social-links';

/**
 * Site başlığı. Ana sayfada şeffaf başlar, kaydırınca beyaza döner;
 * alt sayfalarda her zaman koyu zemin üzerinde beyaz metinle başlar.
 */
export function Header({ solid = false }: { solid?: boolean }) {
  const { t, locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/hizmetler' },
    { name: t('nav.machines'), href: '/makineler' },
    { name: t('nav.catalog'), href: '/katalog' },
    { name: t('nav.references'), href: '/referanslar' },
    { name: t('nav.about'), href: '/hakkimizda' },
    { name: t('nav.contact'), href: '/iletisim' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sayfa değişince menüyü kapat, body scroll kilidini kaldır
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const light = !scrolled; // koyu zemin üstünde beyaz metin
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
=======
import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { scrollToPageSection } from '@/lib/section-navigation';

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/#hizmetler' },
    { name: t('nav.machines'), href: '/#makinalar' },
    { name: t('nav.references'), href: '/referanslar' },
    { name: t('nav.about'), href: '/#hakkimizda' },
    { name: t('nav.contact'), href: '/#iletisim' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuoteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (scrollToPageSection('teklif')) {
      event.preventDefault();
      setIsMobileMenuOpen(false);
    }
  };

  const LanguageSwitcher = ({ dark = false }: { dark?: boolean }) => (
    <button
      onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
        dark
          ? 'border-white/20 text-white hover:bg-white/10'
          : isScrolled
          ? 'border-[#1E5AA8]/25 text-[#1E5AA8] hover:bg-[#1E5AA8]/8'
          : 'border-white/25 text-white hover:bg-white/10'
      }`}
    >
      <Globe className="w-3.5 h-3.5" />
      {locale === 'tr' ? 'EN' : 'TR'}
    </button>
  );
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332

  return (
    <>
      <motion.header
<<<<<<< HEAD
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_var(--line),0_8px_30px_-16px_rgba(11,25,41,.25)]'
            : solid
              ? 'bg-ink/40 backdrop-blur-sm'
              : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="container-x">
          <div className="flex items-center justify-between" style={{ height: 'var(--header-h)' }}>
            {/* Logo */}
            <Link href="/" className="relative shrink-0 block" aria-label={siteConfig.name}>
              <div className="relative h-10 w-[150px] sm:h-11 sm:w-[170px]">
                <Image
                  src="/images/guven-white.png"
                  alt={siteConfig.name}
                  fill
                  sizes="170px"
                  priority
                  className={`object-contain object-left transition-opacity duration-300 ${light ? 'opacity-100' : 'opacity-0'}`}
                />
                <Image
                  src="/images/guven-blue.png"
                  alt=""
                  fill
                  sizes="170px"
                  priority
                  className={`object-contain object-left transition-opacity duration-300 ${light ? 'opacity-0' : 'opacity-100'}`}
=======
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/97 backdrop-blur-md shadow-sm border-b border-[#1E5AA8]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <div className="relative h-11 w-44">
                <Image
                  src={isScrolled ? '/images/guven-blue.png' : '/images/guven-white.png'}
                  alt="Güven İş ve İstif Makineleri"
                  fill
                  className="object-contain transition-all duration-300"
                  priority
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
                />
              </div>
            </Link>

<<<<<<< HEAD
            {/* Masaüstü menü */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Ana menü">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-2 text-[0.9375rem] font-medium rounded-md transition-colors ${
                      light ? 'text-white/85 hover:text-white' : 'text-ink/75 hover:text-ink'
                    } ${active ? (light ? 'text-white' : 'text-brand') : ''}`}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={`absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full ${light ? 'bg-white' : 'bg-brand'}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Sağ aksiyonlar */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}
                className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-xs font-semibold tracking-wide border transition-colors ${
                  light
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-line text-ink hover:border-brand/40 hover:text-brand'
                }`}
                aria-label={locale === 'tr' ? 'Switch to English' : "Türkçe'ye geç"}
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'tr' ? 'EN' : 'TR'}
              </button>

              <Link
                href="/iletisim#teklif"
                className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-md bg-brand text-white text-sm font-semibold shadow-[0_8px_24px_-10px_rgba(30,90,168,.7)] hover:bg-brand-dark transition-colors"
              >
                {t('nav.quote')}
              </Link>

              <button
                onClick={() => setOpen(true)}
                className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
                  light ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-mist'
                }`}
                aria-label="Menüyü aç"
                aria-expanded={open}
=======
            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[#1E5AA8] ${
                    isScrolled ? 'text-[#0B1929]' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button
                asChild
                className="hidden sm:inline-flex bg-[#1E5AA8] hover:bg-[#164a8a] text-white shadow-sm text-sm"
              >
                <Link href="/#teklif" onClick={handleQuoteClick}>{t('nav.quote')}</Link>
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`xl:hidden p-2 transition-colors ${
                  isScrolled ? 'text-[#0B1929]' : 'text-white'
                }`}
                aria-label="Menüyü aç"
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

<<<<<<< HEAD
      {/* Mobil menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
=======
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
<<<<<<< HEAD
            className="fixed inset-0 z-[100] bg-ink text-white flex flex-col"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />

            <div className="container-x relative flex items-center justify-between" style={{ height: 'var(--header-h)' }}>
              <Link href="/" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
                <div className="relative h-10 w-[150px]">
                  <Image src="/images/guven-white.png" alt="" fill sizes="150px" className="object-contain object-left" />
                </div>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/10"
                aria-label="Menüyü kapat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="container-x relative flex-1 flex flex-col justify-center py-6 overflow-y-auto" aria-label="Mobil menü">
              <ul className="divide-y divide-white/10">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between py-4 font-heading text-2xl font-semibold ${
                        isActive(item.href) ? 'text-brand-light' : 'text-white'
                      }`}
                    >
                      {item.name}
                      <ArrowUpRight className="w-5 h-5 text-white/30" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="container-x relative pb-8 space-y-4"
            >
              <Link
                href="/iletisim#teklif"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center h-12 rounded-md bg-brand text-white font-semibold"
              >
                {t('nav.quote')}
              </Link>
              <div className="flex items-center justify-between gap-4">
                <a href={siteConfig.phones[0].href} className="inline-flex items-center gap-2 text-sm text-white/80">
                  <Phone className="w-4 h-4 text-brand-light" />
                  {siteConfig.phones[0].label}
                </a>
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ key, href, label, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-md bg-white/8 flex items-center justify-center text-white/80 hover:bg-brand hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
=======
            className="fixed inset-0 z-[100] bg-[#0B1929]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="relative h-10 w-44">
                    <Image src="/images/guven-white.png" alt="Güven İş ve İstif Makineleri" fill className="object-contain" />
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  <LanguageSwitcher dark />
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white" aria-label="Kapat">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <nav className="flex-1 flex flex-col justify-center px-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center py-3.5 text-xl font-heading text-white hover:text-[#4A90D9] border-b border-white/8 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 py-8">
                <Button
                  asChild
                  className="w-full bg-[#1E5AA8] hover:bg-[#164a8a] text-white min-h-[50px] text-base font-semibold"
                >
                  <Link href="/#teklif" onClick={handleQuoteClick}>{t('nav.quote')}</Link>
                </Button>
              </div>
            </div>
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
