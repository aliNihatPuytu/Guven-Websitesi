// ─── Site genelinde kullanılan tüm sabit bilgiler ────────────────────────────
//
// Telefon, e-posta, adres, sosyal medya ve video ayarlarını sadece bu dosyadan
// güncelleyin; tüm sayfalar (iletişim, footer, SEO şemaları) buradan okur.

export const siteConfig = {
  name: 'Güven İş ve İstif Makineleri',
  shortName: 'Güven',
  legalName: 'Güven İş ve İstif Makinaları',
  url: 'https://www.guvenismakine.com',
  foundingYear: 1978,
  email: 'info@guvenismakine.com',

  // Telefonlar — sırayla gösterilir. İlk numara ana hat olarak kullanılır.
  phones: [
    { label: '0 (216) 314 12 94', href: 'tel:+902163141294', e164: '+902163141294' },
    { label: '0 (540) 130 03 04', href: 'tel:+905401300304', e164: '+905401300304' },
  ],

  address: {
    street: 'Esenşehir Mah., Gündeş Sk. No:14',
    district: 'Ümraniye',
    city: 'İstanbul',
    postalCode: '34776',
    country: 'TR',
    full: 'Esenşehir Mah., Gündeş Sk. No:14, 34776 Ümraniye / İstanbul',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=G%C3%BCnde%C5%9F+Sk.+No%3A14+Esen%C5%9Fehir+%C3%9Cmraniye+%C4%B0stanbul',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.271!2d29.10588!3d41.01789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac97e5b45b5b5%3A0x0!2sG%C3%BCnde%C5%9F+Sk.+No%3A14%2C+Esen%C5%9Fehir%2C+34776+%C3%9Cmraniye%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str',
    geo: { lat: 41.01789, lng: 29.10588 },
  },

  hours: { days: 'Pzt – Cmt', daysEn: 'Mon – Sat', time: '08:00 – 18:00' },

  // Sosyal medya & platformlar
  social: {
    instagram: 'https://www.instagram.com/guvenismakine',
    linkedin: 'https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/',
    // YouTube: kanal adresinizi buraya yazın; şimdilik tanıtım filmine yönlendirir
    youtube: 'https://www.youtube.com/watch?v=Mg_yOXaDn7o',
    sahibinden: 'https://guvenismakine.sahibinden.com/',
  },

  // Tanıtım filmi
  // - "file": public/videos altındaki dosya (varsayılan)
  // - YouTube kullanmak için youtubeId alanını doldurun; dolu ise YouTube tercih edilir.
  video: {
    file: '/videos/guven-video.MP4',
    // Yalnızca ana sayfadaki hero arka plan videosu
    heroBackground: '/videos/tanitim-filmi-arka-plan.mp4',
    poster: '/images/about-company.jpg',
    youtubeId: 'Mg_yOXaDn7o', // Tanıtım filmi (katalogdaki QR kod)
  },

  // Katalog (PDF) — public/katalog altındaki dosya
  catalogPdf: '/katalog/guven-katalog.pdf',
  // Katalog sayfa görselleri (public/katalog/pages/page-01.jpg ...)
  catalogPages: 16,
} as const;

export type SiteConfig = typeof siteConfig;
