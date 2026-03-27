'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/#hizmetler' },
  { name: 'Makinalar', href: '/#makinalar' },
  { name: 'Projeler', href: '/projeler' },
  { name: 'Ekibimiz', href: '/ekip' },
  { name: 'Hakkımızda', href: '/#hakkimizda' },
  { name: 'İletişim', href: '/#iletisim' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // On non-home pages, always show solid header
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/97 backdrop-blur-md shadow-sm border-b border-[#E5E7EA]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0">
              <div className="relative h-10 w-44">
                <Image
                  src={isTransparent ? '/images/logo-white.png' : '/images/logo-blue.png'}
                  alt="Güven İş ve İstif Makinaları"
                  fill
                  className="object-contain transition-all duration-300"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium tracking-wide rounded-md transition-all ${
                      isActive
                        ? 'text-[#1E5AA8] bg-[#1E5AA8]/8'
                        : isTransparent
                        ? 'text-white hover:text-white hover:bg-white/15'
                        : 'text-[#2B2B2B] hover:text-[#1E5AA8] hover:bg-[#1E5AA8]/6'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile Button */}
            <div className="flex items-center gap-3">
              <Button
                asChild
                className="hidden sm:inline-flex bg-[#1E5AA8] hover:bg-[#164a8a] text-white px-5 shadow-sm"
              >
                <Link href="/#teklif">Teklif Al</Link>
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-md transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/15'
                    : 'text-[#2B2B2B] hover:bg-[#1E5AA8]/8'
                }`}
                aria-label="Menüyü aç"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#1A1A2E]"
          >
            {/* Subtle background accent */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1E5AA8]/20 blur-3xl" />
              <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-[#1E5AA8]/10 blur-3xl" />
            </div>

            <div className="relative flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="relative h-9 w-40">
                    <Image
                      src="/images/logo-white.png"
                      alt="Güven İş ve İstif Makinaları"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Menüyü kapat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center px-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center py-4 text-2xl font-heading text-white/80 hover:text-white border-b border-white/8 group transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-0.5 bg-[#1E5AA8] mr-0 group-hover:mr-3 transition-all duration-200 inline-block" />
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-8 py-8">
                <Button
                  asChild
                  className="w-full bg-[#1E5AA8] hover:bg-[#164a8a] text-white min-h-[52px] text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/#teklif">Teklif Al</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
