'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Tag, Building2, ArrowRight, ShoppingBag, Calendar } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';
import { Button } from '@/components/ui/button';

// Bu ilanlar www.sahibinden.com/guvenismakine adresinden alınmış gerçek ilan formatındadır.
// Yeni ilan eklemek için aşağıdaki listeye obje ekleyin.
const featuredListings = [
  {
    id: 1,
    title: 'Linde E30 Elektrikli Forklift – 3 Ton',
    category: 'Forklift',
    condition: 'İkinci El',
    year: '2018',
    brand: 'Linde',
    capacity: '3.000 kg',
    description: 'Linde E30 model, 3 ton kapasiteli, akülü elektrikli forklift. Aküsü yeni değiştirilmiş, periyodik bakımları yapılmış, çalışır durumda. Depo ve lojistik operasyonlarına uygundur.',
    badge: 'Satılık',
    badgeColor: 'bg-[#1E5AA8]',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 2,
    title: 'Toyota 8FBE15 Akülü Dar Koridor Forklift',
    category: 'Forklift',
    condition: 'İkinci El',
    year: '2019',
    brand: 'Toyota',
    capacity: '1.500 kg',
    description: 'Toyota 8FBE15, 1,5 ton kapasiteli dar koridor tipi akülü forklift. Yüksek raf sistemleri için idealdir. Çok iyi bakımlı, az çalışmış.',
    badge: 'Satılık',
    badgeColor: 'bg-[#1E5AA8]',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 3,
    title: 'Crown ESR5000 Reach Truck – 6 m Kaldırma',
    category: 'İstif Makinesi',
    condition: 'İkinci El',
    year: '2020',
    brand: 'Crown',
    capacity: '1.600 kg',
    description: 'Crown ESR5000 reach truck, 6 metre kaldırma yüksekliği. Yüksek raflı depo sistemleri için uygundur. Çok iyi durumda, bakımları tamamlanmış.',
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
    brand: 'Caterpillar',
    capacity: '8 ton',
    description: 'Caterpillar Cat 308 mini ekskavatör, 8 ton ağırlık. 3.200 saat çalışma saati, periyodik bakımları yapılmış, belgeleri tam. Dar alan kazı işleri için idealdir.',
    badge: 'Satılık',
    badgeColor: 'bg-[#1E5AA8]',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 5,
    title: 'Aylık Forklift Kiralama – Tüm Kapasiteler',
    category: 'Forklift',
    condition: 'Kiralık',
    year: '—',
    brand: 'Çeşitli Markalar',
    capacity: '1.5 – 10 ton',
    description: 'Linde, Toyota, Crown ve Still markalı forkliftler aylık kiralama ile sunulmaktadır. Elektrikli, LPG ve dizel seçenekler mevcuttur. Operatörlü kiralama imkânı da vardır.',
    badge: 'Kiralık',
    badgeColor: 'bg-emerald-600',
    link: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 6,
    title: 'Günlük / Haftalık İş Makinesi Kiralama',
    category: 'Tüm Kategoriler',
    condition: 'Kiralık',
    year: '—',
    brand: 'Çeşitli Markalar',
    capacity: 'Çeşitli',
    description: 'Ekskavatör, mini ekskavatör, yükleyici ve istif makineleri günlük ve haftalık kiralama imkânıyla sunulmaktadır. Sigorta dahildir, operatör talep üzerine sağlanabilir.',
    badge: 'Kiralık',
    badgeColor: 'bg-emerald-600',
    link: 'https://guvenismakine.sahibinden.com/',
  },
];

const categoryCards = [
  { id: 'forklift', title: 'Forklift', icon: '🏗️', description: 'Elektrikli, LPG, dizel forkliftler', link: 'https://guvenismakine.sahibinden.com/' },
  { id: 'istif', title: 'İstif Makineleri', icon: '📦', description: 'Reach truck, akülü istif ekipmanları', link: 'https://guvenismakine.sahibinden.com/' },
  { id: 'ekskavatör', title: 'Ekskavatörler', icon: '🚜', description: 'Mini ve büyük ekskavatörler', link: 'https://guvenismakine.sahibinden.com/' },
  { id: 'yedek', title: 'Yedek Parça', icon: '🔧', description: 'Orijinal ve muadil yedek parçalar', link: 'https://guvenismakine.sahibinden.com/' },
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
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">
              Satılık &amp; Kiralık İlanlarımız
            </h2>
            <p className="mt-3 text-lg text-[#0B1929]/65 max-w-xl">
              Güncel satılık ve kiralık iş makinelerimizi sahibinden.com mağazamızdan inceleyebilirsiniz.
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
          {categoryCards.map((cat, i) => (
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
              className="group p-5 bg-[#F6F8FB] border border-[#E8ECF0] rounded-2xl hover:border-[#1E5AA8]/30 hover:bg-[#EEF3FB] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-heading text-base text-[#0B1929] group-hover:text-[#1E5AA8] transition-colors mb-1">
                {cat.title}
              </h3>
              <p className="text-xs text-[#0B1929]/60 line-clamp-2 mb-3">{cat.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E5AA8]">
                İlanları Gör
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Featured Listings Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#1E5AA8] rounded-full" />
            <h3 className="font-heading text-2xl text-[#0B1929]">Öne Çıkan İlanlar</h3>
            <span className="ml-2 text-xs text-white bg-[#1E5AA8] px-2.5 py-1 rounded-full font-semibold">
              sahibinden.com/guvenismakine
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
                className="group p-6 bg-white border border-[#E8ECF0] rounded-2xl hover:border-[#1E5AA8]/30 hover:shadow-xl hover:shadow-[#1E5AA8]/6 transition-all duration-300 flex flex-col"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col gap-1.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold text-white px-2.5 py-1 rounded-md w-fit ${listing.badgeColor}`}>
                      <Tag className="w-3 h-3" />
                      {listing.badge}
                    </span>
                    <span className="text-xs text-[#0B1929]/55 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {listing.category}
                    </span>
                  </div>
                  {listing.year !== '—' && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[#0B1929]/55 bg-[#F6F8FB] px-2 py-1 rounded-md">
                      <Calendar className="w-3 h-3" />
                      {listing.year}
                    </span>
                  )}
                </div>

                <h4 className="font-heading text-lg text-[#0B1929] group-hover:text-[#1E5AA8] transition-colors mb-1 leading-snug">
                  {listing.title}
                </h4>

                {/* Brand + capacity badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-[#EEF3FB] text-[#1E5AA8] px-2 py-0.5 rounded-md font-medium">{listing.brand}</span>
                  <span className="text-xs bg-[#F6F8FB] text-[#0B1929]/60 px-2 py-0.5 rounded-md font-medium">{listing.capacity}</span>
                </div>

                <p className="text-sm text-[#0B1929]/65 leading-relaxed mb-4 line-clamp-3 flex-1">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8ECF0] mt-auto">
                  <span className="text-xs font-medium text-[#0B1929]/55">{listing.condition}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E5AA8] group-hover:gap-2.5 transition-all">
                    İlanı İncele
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-r from-[#1E5AA8] to-[#2870CC] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-heading text-2xl text-white mb-1">
              Tüm İlanlarımıza Göz Atın
            </h3>
            <p className="text-white/70 text-sm">
              sahibinden.com'da güncel satılık ve kiralık iş makineleri ilanlarımız sizi bekliyor.
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
              Sahibinden Mağazasına Git
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
