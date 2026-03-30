'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Locale = 'tr' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

// ─── Tüm site metinleri ────────────────────────────────────────────────────────
const translations: Record<Locale, Record<string, string>> = {
  tr: {
    // NAV
    'nav.home': 'Ana Sayfa',
    'nav.services': 'Hizmetler',
    'nav.machines': 'Makinalar',
    'nav.listings': 'İlanlarımız',
    'nav.projects': 'Projeler',
    'nav.team': 'Ekibimiz',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.quote': 'Teklif Al',

    // HERO
    'hero.badge': "1978'den Beri İstanbul'da",
    'hero.title': 'Güvenilir İş ve İstif Makinaları',
    'hero.subtitle': 'Satış, kiralama, yedek parça ve teknik destek hizmetlerinde İstanbul\'un güvenilir çözüm ortağı.',
    'hero.cta.machines': 'Makinaları İncele',
    'hero.cta.quote': 'Teklif Al',
    'hero.stat.experience': 'Yıl Deneyim',
    'hero.stat.projects': 'Tamamlanan Proje',
    'hero.stat.fleet': 'Makine Filosu',

    // SERVICES
    'services.label': 'Hizmetlerimiz',
    'services.title': 'Kapsamlı Makina Çözümleri',
    'services.subtitle': '45 yılı aşkın tecrübemizle iş ve istif makineleri alanında kapsamlı çözümler sunuyoruz.',
    'services.rental.title': 'İş ve İstif Makinesi Kiralama',
    'services.rental.desc': 'Geniş makine filomuzla kısa ve uzun süreli kiralama hizmetleri sunuyoruz. Tüm makinalarımız düzenli bakımlı ve sigortalıdır.',
    'services.sales.title': 'Makina Satışı',
    'services.sales.desc': 'Yeni ve ikinci el iş ve istif makineleri satışı yapıyoruz. Güvenilir markalardan kaliteli makineler, garanti hizmetiyle.',
    'services.parts.title': 'Yedek Parça',
    'services.parts.desc': 'Birçok farklı markaya ait iş ve istif makineleri için hızlı yedek parça temini sağlıyoruz.',
    'services.support.title': 'Servis ve Teknik Destek',
    'services.support.desc': 'Deneyimli kadromuzla hızlı servis ve teknik destek hizmeti sunuyoruz. Projenizin her aşamasında yanınızdayız.',

    // MACHINES
    'machines.label': 'Makine Kategorileri',
    'machines.title': 'Geniş Makine Filomuz',
    'machines.subtitle': 'Her türlü inşaat ve lojistik projeniz için doğru ekipmanı sunuyoruz.',
    'machines.cta': 'Detayları İncele',

    // SAHIBINDEN
    'listings.label': 'Sahibinden.com Mağazamız',
    'listings.title': 'Satılık & Kiralık İlanlarımız',
    'listings.subtitle': 'Güncel satılık ve kiralık iş makinelerimizi sahibinden.com mağazamızdan inceleyebilirsiniz.',
    'listings.viewAll': 'Tüm İlanları Gör',
    'listings.featured': 'Öne Çıkan İlanlar',
    'listings.viewListing': 'İlanı İncele',
    'listings.cta.title': 'Tüm İlanlarımıza Göz Atın',
    'listings.cta.desc': 'sahibinden.com mağazamızda güncel satılık ve kiralık iş makineleri ilanlarımız sizi bekliyor.',
    'listings.cta.btn': 'Sahibinden Mağazasına Git',

    // QUOTE
    'quote.label': 'Hızlı Teklif',
    'quote.title': 'Makina Kiralama Teklifi Alın',
    'quote.subtitle': 'İhtiyacınız olan makineyi seçin, bilgilerinizi girin — ekibimiz en kısa sürede sizinle iletişime geçsin.',
    'quote.machine': 'Makina Türü',
    'quote.duration': 'Kiralama Süresi',
    'quote.location': 'Proje Lokasyonu',
    'quote.location.placeholder': 'Şehir veya ilçe giriniz',
    'quote.operator': 'Operatör Gerekli mi?',
    'quote.operator.sub': 'Tecrübeli ve sertifikalı operatör',
    'quote.name': 'Ad Soyad *',
    'quote.phone': 'Telefon *',
    'quote.email': 'E-posta *',
    'quote.message': 'Ek Bilgi (isteğe bağlı)',
    'quote.message.placeholder': 'Projeniz hakkında ek bilgi...',
    'quote.submit': 'Teklif Talebi Gönder',
    'quote.sending': 'Gönderiliyor...',
    'quote.success.title': 'Teklif Talebiniz Alındı!',
    'quote.success.desc': 'En kısa sürede ekibimiz sizinle iletişime geçecektir.',
    'quote.newQuote': 'Yeni Teklif Al',
    'quote.summary.title': 'Tahmini Kiralama Özeti',
    'quote.summary.machine': 'Makina',
    'quote.summary.duration': 'Süre',
    'quote.summary.operator': 'Operatör',
    'quote.summary.operator.yes': 'Dahil',
    'quote.summary.price': 'Tahmini Fiyat',
    'quote.summary.vat': '*KDV hariç tahmini fiyattır',
    'quote.summary.empty': 'Makina ve süre seçerek tahmini fiyatı görün.',
    'quote.select.placeholder': 'Seçiniz...',
    'quote.error': 'Bir hata oluştu. Lütfen tekrar deneyin.',

    // WHY US
    'why.label': 'Neden Güven?',
    'why.title': 'Bizi Tercih Etmeniz İçin Nedenler',

    // PROJECTS
    'projects.label': 'Projelerimiz',
    'projects.title': 'Tamamladığımız Projeler',
    'projects.viewAll': 'Tüm Projeleri Gör',

    // ABOUT
    'about.label': 'Hakkımızda',
    'about.title': "1978'den Bu Yana Güvenle Hizmet",
    'about.p1': "Güven İş ve İstif Makinaları, 1978 yılından bu yana İstanbul'da iş ve istif makineleri sektöründe faaliyet göstermektedir. Kurulduğumuz günden bu yana edindiğimiz tecrübe ve güven anlayışıyla müşterilerimize kaliteli, hızlı ve sürdürülebilir çözümler sunmaktayız.",
    'about.p2': 'Firmamız çeşitli iş ve istif makinelerinin satış, kiralama ve yedek parça hizmetlerini profesyonel bir anlayışla sunmaktadır. Geniş ürün yelpazemiz sayesinde birçok farklı markaya ait makineler için müşterilerimize uygun seçenekler sunuyor, yedek parça ve teknik destek konusunda hızlı çözümler sağlıyoruz.',
    'about.cta': 'Bizimle İletişime Geçin',
    'about.mission.title': 'Misyonumuz',
    'about.mission.text': 'Müşterilerimizin iş süreçlerini kolaylaştıran güvenilir, kaliteli ve verimli iş ve istif makinesi çözümleri sunmak; satış, kiralama ve yedek parça hizmetlerinde hızlı, dürüst ve profesyonel bir hizmet anlayışıyla sektörde kalıcı değer üretmek.',
    'about.vision.title': 'Vizyonumuz',
    'about.vision.text': 'İş ve istif makineleri sektöründe güvenilirliği, hizmet kalitesi ve müşteri memnuniyetiyle öne çıkan; yenilikçi çözümler sunarak Türkiye genelinde alanında önde gelen firmalardan biri olmak.',
    'about.play': 'Tanıtım videosunu izle',

    // CTA
    'cta.badge': 'Hemen Başlayalım',
    'cta.title': 'Projeniz İçin En Doğru Çözümü Birlikte Bulalım',
    'cta.desc': '45 yılı aşkın tecrübemiz ve geniş makine filomuzla ihtiyaçlarınıza özel, hızlı ve güvenilir çözümler sunuyoruz.',
    'cta.quote': 'Teklif Al',
    'cta.call': '0 (216) 314 12 94',

    // CONTACT
    'contact.label': 'İletişim',
    'contact.title': 'Bizimle İletişime Geçin',
    'contact.subtitle': 'Sorularınız için bize ulaşın, uzman ekibimiz en kısa sürede geri dönecektir.',
    'contact.phone': 'Telefon',
    'contact.email': 'E-posta',
    'contact.address': 'Adres',
    'contact.hours': 'Çalışma Saatleri',
    'contact.hours.days': 'Pzt – Cmt',
    'contact.hours.time': '08:00 – 18:00',
    'contact.form.title': 'Mesaj Gönderin',
    'contact.form.sub': 'Formunuz doğrudan e-posta olarak iletilir.',
    'contact.form.name': 'Ad Soyad *',
    'contact.form.phone': 'Telefon *',
    'contact.form.email': 'E-posta *',
    'contact.form.message': 'Mesaj *',
    'contact.form.submit': 'Gönder',
    'contact.form.sending': 'Gönderiliyor...',
    'contact.form.success.title': 'Mesajınız Alındı!',
    'contact.form.success.desc': 'En kısa sürede sizinle iletişime geçeceğiz.',

    // FOOTER
    'footer.tagline': '"Güven ile kiralayın."',
    'footer.desc': "1978'den bu yana iş ve istif makineleri alanında İstanbul'un güvenilir çözüm ortağı.",
    'footer.pages': 'Sayfalar',
    'footer.services': 'Hizmetlerimiz',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.designer': 'Tasarım',

    // HIGHLIGHTS
    'highlight.1': "1978'den beri aktif faaliyet",
    'highlight.2': 'Geniş ürün ve marka yelpazesi',
    'highlight.3': 'Hızlı yedek parça temini',
    'highlight.4': 'Deneyimli teknik kadro',
    'highlight.5': 'Müşteri odaklı hizmet anlayışı',
    'highlight.6': 'Kalite ve güven ilkeleri',
  },

  en: {
    // NAV
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.machines': 'Machines',
    'nav.listings': 'Listings',
    'nav.projects': 'Projects',
    'nav.team': 'Our Team',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.quote': 'Get a Quote',

    // HERO
    'hero.badge': 'In Istanbul Since 1978',
    'hero.title': 'Reliable Work & Stacking Machines',
    'hero.subtitle': "Istanbul's trusted partner for machinery sales, rental, spare parts and technical support.",
    'hero.cta.machines': 'View Machines',
    'hero.cta.quote': 'Get a Quote',
    'hero.stat.experience': 'Years Experience',
    'hero.stat.projects': 'Completed Projects',
    'hero.stat.fleet': 'Machine Fleet',

    // SERVICES
    'services.label': 'Our Services',
    'services.title': 'Comprehensive Machine Solutions',
    'services.subtitle': 'With over 45 years of experience, we provide comprehensive solutions in work and stacking machinery.',
    'services.rental.title': 'Machine Rental',
    'services.rental.desc': 'We offer short and long-term rental services with our wide machine fleet. All our machines are regularly maintained and insured.',
    'services.sales.title': 'Machine Sales',
    'services.sales.desc': 'We sell new and used work & stacking machines from reliable brands with warranty service.',
    'services.parts.title': 'Spare Parts',
    'services.parts.desc': 'We provide fast spare parts supply for work and stacking machines of many different brands.',
    'services.support.title': 'Service & Technical Support',
    'services.support.desc': 'We provide fast service and technical support with our experienced team at every stage of your project.',

    // MACHINES
    'machines.label': 'Machine Categories',
    'machines.title': 'Our Wide Machine Fleet',
    'machines.subtitle': 'We provide the right equipment for all types of construction and logistics projects.',
    'machines.cta': 'View Details',

    // SAHIBINDEN
    'listings.label': 'Sahibinden.com Store',
    'listings.title': 'For Sale & Rental Listings',
    'listings.subtitle': 'Browse our current for-sale and rental machines on our sahibinden.com store.',
    'listings.viewAll': 'View All Listings',
    'listings.featured': 'Featured Listings',
    'listings.viewListing': 'View Listing',
    'listings.cta.title': 'Browse All Our Listings',
    'listings.cta.desc': 'Current for-sale and rental machinery listings await you on our sahibinden.com store.',
    'listings.cta.btn': 'Visit Sahibinden Store',

    // QUOTE
    'quote.label': 'Quick Quote',
    'quote.title': 'Get a Machine Rental Quote',
    'quote.subtitle': 'Choose the machine you need, enter your details — our team will contact you as soon as possible.',
    'quote.machine': 'Machine Type',
    'quote.duration': 'Rental Duration',
    'quote.location': 'Project Location',
    'quote.location.placeholder': 'Enter city or district',
    'quote.operator': 'Operator Required?',
    'quote.operator.sub': 'Experienced and certified operator',
    'quote.name': 'Full Name *',
    'quote.phone': 'Phone *',
    'quote.email': 'Email *',
    'quote.message': 'Additional Info (optional)',
    'quote.message.placeholder': 'Additional details about your project...',
    'quote.submit': 'Send Quote Request',
    'quote.sending': 'Sending...',
    'quote.success.title': 'Quote Request Received!',
    'quote.success.desc': 'Our team will contact you as soon as possible.',
    'quote.newQuote': 'New Quote',
    'quote.summary.title': 'Estimated Rental Summary',
    'quote.summary.machine': 'Machine',
    'quote.summary.duration': 'Duration',
    'quote.summary.operator': 'Operator',
    'quote.summary.operator.yes': 'Included',
    'quote.summary.price': 'Estimated Price',
    'quote.summary.vat': '*Estimated price excluding VAT',
    'quote.summary.empty': 'Select a machine and duration to see estimated price.',
    'quote.select.placeholder': 'Select...',
    'quote.error': 'An error occurred. Please try again.',

    // WHY US
    'why.label': 'Why Güven?',
    'why.title': 'Reasons to Choose Us',

    // PROJECTS
    'projects.label': 'Our Projects',
    'projects.title': 'Completed Projects',
    'projects.viewAll': 'View All Projects',

    // ABOUT
    'about.label': 'About Us',
    'about.title': 'Serving with Trust Since 1978',
    'about.p1': 'Güven İş ve İstif Makinaları has been operating in Istanbul in the work and stacking machinery sector since 1978. With the experience and trust we have gained since our founding, we provide our customers with quality, fast and sustainable solutions.',
    'about.p2': 'Our company professionally offers sales, rental and spare parts services for various work and stacking machines. Thanks to our wide product range, we offer suitable options for machines of many different brands and provide fast solutions for spare parts and technical support.',
    'about.cta': 'Contact Us',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To provide reliable, quality and efficient work and stacking machinery solutions that facilitate our customers\' business processes; to produce lasting value in the sector with a fast, honest and professional service approach in sales, rental and spare parts services.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To stand out in the work and stacking machinery sector with reliability, service quality and customer satisfaction; to become one of the leading companies in the field across Turkey by offering innovative solutions.',
    'about.play': 'Watch introduction video',

    // CTA
    'cta.badge': "Let's Get Started",
    'cta.title': "Let's Find the Right Solution for Your Project Together",
    'cta.desc': 'With over 45 years of experience and our wide machine fleet, we offer fast and reliable solutions tailored to your needs.',
    'cta.quote': 'Get a Quote',
    'cta.call': '0 (216) 314 12 94',

    // CONTACT
    'contact.label': 'Contact',
    'contact.title': 'Get in Touch with Us',
    'contact.subtitle': 'Contact us for your questions and our expert team will get back to you as soon as possible.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Working Hours',
    'contact.hours.days': 'Mon – Sat',
    'contact.hours.time': '08:00 – 18:00',
    'contact.form.title': 'Send a Message',
    'contact.form.sub': 'Your form will be delivered directly as an email.',
    'contact.form.name': 'Full Name *',
    'contact.form.phone': 'Phone *',
    'contact.form.email': 'Email *',
    'contact.form.message': 'Message *',
    'contact.form.submit': 'Send',
    'contact.form.sending': 'Sending...',
    'contact.form.success.title': 'Message Received!',
    'contact.form.success.desc': 'We will contact you as soon as possible.',

    // FOOTER
    'footer.tagline': '"Rent with Confidence."',
    'footer.desc': "Istanbul's trusted partner in work and stacking machinery since 1978.",
    'footer.pages': 'Pages',
    'footer.services': 'Services',
    'footer.rights': 'All rights reserved.',
    'footer.designer': 'Design',

    // HIGHLIGHTS
    'highlight.1': 'Active since 1978',
    'highlight.2': 'Wide product & brand range',
    'highlight.3': 'Fast spare parts supply',
    'highlight.4': 'Experienced technical team',
    'highlight.5': 'Customer-oriented service',
    'highlight.6': 'Quality and reliability principles',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('tr');
  const t = (key: string) => translations[locale][key] ?? key;
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
