'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/#hizmetler' },
  { name: 'Makinalar', href: '/#makinalar' },
  { name: 'Projeler', href: '/#projeler' },
  { name: 'Hakkımızda', href: '/#hakkimizda' },
  { name: 'İletişim', href: '/#iletisim' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <div className="relative h-10 w-40">
                <Image
                  src="/images/logo-blue.png"
                  alt="Güven İş ve İstif Makinaları"
                  fill
                  className={`object-contain transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[#1E5AA8] ${
                    isScrolled ? 'text-[#2B2B2B]' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Button */}
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="hidden sm:inline-flex bg-[#1E5AA8] hover:bg-[#164a8a] text-white"
              >
                <Link href="/#teklif">Teklif Al</Link>
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 transition-colors ${
                  isScrolled ? 'text-[#2B2B2B]' : 'text-white'
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#2B2B2B]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="relative h-10 w-40">
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
                  className="p-2 text-white"
                  aria-label="Menüyü kapat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center px-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-2xl font-heading font-medium text-white hover:text-[#1E5AA8] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 py-8">
                <Button
                  asChild
                  className="w-full bg-[#1E5AA8] hover:bg-[#164a8a] text-white min-h-[48px]"
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
