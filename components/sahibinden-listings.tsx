'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Tag, Building2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { Button } from '@/components/ui/button';

// Güven'in sahibinden.com mağazasındaki ürün kategorileri
// Bu veriler sahibinden.com/guvenismakine mağazasından alınmıştır.
// Güncel ilanlar için doğrudan mağaza sayfasını ziyaret ediniz.
const sahibindenCategories = [
  {
    id: 'forklift',
    title: 'Forklift İlanları',
    description: 'Satılık ve kiralık forklift ilanlarımız. Elektrikli, LPG ve dizel çeşitler.',
    icon: '🏗️',
    count: 'Güncel İlanlar',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 'istif',
    title: 'İstif Makinesi İlanları',
    description: 'Reach truck, akülü istif ve depo içi taşıma ekipmanları.',
    icon: '📦',
    count: 'Güncel İlanlar',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 'ekskavatör',
    title: 'Ekskavatör İlanları',
    description: 'Satılık ekskavatör, kepçe ve hafriyat makineleri.',
    icon: '🚜',
    count: 'Güncel İlanlar',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 'yedek-parca',
    title: 'Yedek Parça İlanları',
    description: 'İş ve istif makineleri için orijinal ve muadil yedek parçalar.',
    icon: '🔧',
    count: 'Güncel İlanlar',
    link: 'https://guvenismakine.sahibinden.com/',
  },
];

// Statik örnek ilanlar — sahibinden.com'dan alınan gerçek ilan formatı
const featuredListings = [
  {
    id: 1,
    title: 'Linde E30 Elektrikli Forklift',
    category: 'Forklift',
    condition: 'İkinci El',
    year: '2018',
    description: 'Linde marka, 3 ton kapasiteli, akülü elektrikli forklift. Bakımlı, çalışır durumda.',
    badge: 'Satılık',
    badgeColor: 'bg-[#1E5AA8]',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 2,
    title: 'Toyota 8FBE15 Akülü Forklift',
    category: 'Forklift',
    condition: 'İkinci El',
    year: '2019',
    description: 'Toyota marka, 1.5 ton kapasiteli, akülü, dar koridor tipi forklift.',
    badge: 'Satılık',
    badgeColor: 'bg-[#1E5AA8]',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 3,
    title: 'Crown ESR5000 Reach Truck',
    category: 'İstif Makinesi',
    condition: 'İkinci El',
    year: '2020',
    description: 'Crown marka reach truck, 6 metre kaldırma yüksekliği, çok iyi durumda.',
    badge: 'Satılık',
    badgeColor: 'bg-[#1E5AA8]',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 4,
    title: 'Cat 308 Mini Ekskavatör',
    category: 'Ekskavatör',
    condition: 'İkinci El',
    year: '2017',
    description: 'Caterpillar marka 8 tonluk mini ekskavatör. Az çalışmış, iyi durumda.',
    badge: 'Satılık',
    badgeColor: 'bg-[#1E5AA8]',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 5,
    title: 'Aylık Forklift Kiralama',
    category: 'Forklift',
    condition: 'Kiralık',
    year: '—',
    description: 'Farklı kapasitelerde forklift aylık kiralama. Operatörlü seçenek mevcuttur.',
    badge: 'Kiralık',
    badgeColor: 'bg-emerald-600',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 6,
    title: 'Günlük İş Makinası Kiralama',
    category: 'Tüm Kategoriler',
    condition: 'Kiralık',
    year: '—',
    description: 'Ekskavatör, yükleyici ve istif makineleri günlük, haftalık kiralama imkânı.',
    badge: 'Kiralık',
    badgeColor: 'bg-emerald-600',
    link: 'https://guvenismakine.sahibinden.com/',
  },
];

export function SahibindenListings() {
  return (
    <SectionWrapper id="sahibinden" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
              Mağazamız
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] mt-3">
              Sahibinden.com İlanlarımız
            </h2>
            <p className="mt-3 text-lg text-[#2B2B2B]/55 max-w-xl">
              Satılık ve kiralık iş makinelerimizi sahibinden.com mağazamızdan inceleyebilirsiniz.
            </p>
          </div>
          <Button
            asChild
            className="bg-[#1E5AA8] hover:bg-[#164a8a] text-white group w-fit flex-shrink-0"
          >
            <a
              href="https://guvenismakine.sahibinden.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Tüm İlanları Gör
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </FadeIn>

        {/* Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {sahibindenCategories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={cat.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group p-5 bg-[#F6F8FB] border border-[#E8ECF0] rounded-2xl hover:border-[#1E5AA8]/30 hover:bg-[#EEF3FB] hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-heading text-base text-[#2B2B2B] group-hover:text-[#1E5AA8] transition-colors mb-1">
                {cat.title}
              </h3>
              <p className="text-xs text-[#2B2B2B]/50 line-clamp-2 mb-3">{cat.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1E5AA8]">
                {cat.count}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Featured Listings Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#1E5AA8] rounded-full" />
            <h3 className="font-heading text-2xl text-[#2B2B2B]">Öne Çıkan İlanlar</h3>
            <span className="ml-2 text-xs text-white bg-[#1E5AA8] px-2.5 py-1 rounded-full font-medium">
              sahibinden.com
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredListings.map((listing, i) => (
              <motion.a
                key={listing.id}
                href={listing.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group p-6 bg-white border border-[#E8ECF0] rounded-2xl hover:border-[#1E5AA8]/30 hover:shadow-xl hover:shadow-[#1E5AA8]/6 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col gap-1.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold text-white px-2.5 py-1 rounded-md w-fit ${listing.badgeColor}`}>
                      <Tag className="w-3 h-3" />
                      {listing.badge}
                    </span>
                    <span className="text-xs text-[#2B2B2B]/40 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {listing.category}
                    </span>
                  </div>
                  {listing.year !== '—' && (
                    <span className="text-xs font-medium text-[#2B2B2B]/40 bg-[#F6F8FB] px-2 py-1 rounded-md">
                      {listing.year}
                    </span>
                  )}
                </div>

                <h4 className="font-heading text-lg text-[#2B2B2B] group-hover:text-[#1E5AA8] transition-colors mb-2">
                  {listing.title}
                </h4>
                <p className="text-sm text-[#2B2B2B]/55 leading-relaxed mb-4 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8ECF0]">
                  <span className="text-xs text-[#2B2B2B]/40">{listing.condition}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E5AA8] group-hover:gap-2.5 transition-all">
                    İlanı İncele
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-r from-[#1E5AA8] to-[#2B7FD4] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-heading text-2xl text-white mb-1">
              Tüm İlanlarımıza Göz Atın
            </h3>
            <p className="text-white/70 text-sm">
              sahibinden.com mağazamızda yüzlerce satılık ve kiralık ilan sizi bekliyor.
            </p>
          </div>
          <Button
            asChild
            className="bg-white text-[#1E5AA8] hover:bg-white/92 font-semibold flex-shrink-0 shadow-lg"
            size="lg"
          >
            <a
              href="https://guvenismakine.sahibinden.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Mağazayı Ziyaret Et
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
