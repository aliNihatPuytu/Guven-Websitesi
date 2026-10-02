'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

type Crumb = { label: string; href?: string };

/**
 * Alt sayfaların ortak üst alanı: koyu lacivert zemin, breadcrumb, başlık.
 * Breadcrumb JSON-LD'si de burada üretilir (Google'da yol gösterimi için).
 */
export function PageHero({
  title,
  description,
  crumbs,
  image,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
  image?: string;
}) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Ana Sayfa', href: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${siteConfig.url}${c.href}` } : {}),
    })),
  };

  return (
    <section className="relative bg-ink text-white overflow-hidden" style={{ paddingTop: 'var(--header-h)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-brand/40" aria-hidden />
      <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />

      <div className="container-x relative py-14 sm:py-20 lg:py-24">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-1.5 text-sm text-white/60 mb-5"
        >
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              {c.href ? (
                <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link>
              ) : (
                <span className="text-white/90">{c.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.02] max-w-3xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
