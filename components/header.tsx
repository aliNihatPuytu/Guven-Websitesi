'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/#hizmetler' },
    { name: t('nav.machines'), href: '/#makinalar' },
    { name: t('nav.listings'), href: '/#sahibinden' },
    { name: t('nav.projects'), href: '/projeler' },
    { name: t('nav.team'), href: '/ekip' },
    { name: t('nav.about'), href: '/#hakkimizda' },
    { name: t('nav.contact'), href: '/#iletisim' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      <motion.header
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
                  src={isScrolled ? '/images/logo-blue.png' : '/images/logo-white.png'}
                  alt="Güven İş ve İstif Makinaları"
                  fill
                  className="object-contain transition-all duration-300"
                  priority
                />
              </div>
            </Link>

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
                <Link href="/#teklif">{t('nav.quote')}</Link>
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`xl:hidden p-2 transition-colors ${
                  isScrolled ? 'text-[#0B1929]' : 'text-white'
                }`}
                aria-label="Menüyü aç"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0B1929]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="relative h-10 w-44">
                    <Image src="/images/logo-white.png" alt="Güven İş ve İstif Makinaları" fill className="object-contain" />
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/#teklif">{t('nav.quote')}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
