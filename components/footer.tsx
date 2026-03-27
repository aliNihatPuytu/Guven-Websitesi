import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Linkedin, ExternalLink } from 'lucide-react';

const quickLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/#hizmetler' },
  { name: 'Makinalar', href: '/#makinalar' },
  { name: 'Sahibinden İlanları', href: '/#sahibinden' },
  { name: 'Projeler', href: '/projeler' },
  { name: 'Ekibimiz', href: '/ekip' },
  { name: 'Hakkımızda', href: '/#hakkimizda' },
  { name: 'İletişim', href: '/#iletisim' },
];

const serviceLinks = [
  { name: 'İş Makinesi Kiralama', href: '/#hizmetler' },
  { name: 'Makina Satışı', href: '/#hizmetler' },
  { name: 'Yedek Parça', href: '/#hizmetler' },
  { name: 'Servis ve Teknik Destek', href: '/#hizmetler' },
  { name: 'Sahibinden Mağazamız', href: 'https://guvenismakine.sahibinden.com/', external: true },
];

// Telefon numaraları — yeni numara eklemek için buraya ekleyin
const phoneNumbers = [
  { number: '0 (216) 314 12 94', href: 'tel:+902163141294' },
  { number: '0 (532) 297 58 13', href: 'tel:+905322975813' },
  // Eklemek istediğiniz numarayı buraya ekleyin:
  // { number: '0 (5XX) XXX XX XX', href: 'tel:+90XXXXXXXXXX' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1929] text-stone-100">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-[#1E5AA8] via-[#4A90D9] to-[#1E5AA8]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-6">
              <div className="relative w-44 h-12">
                <Image src="/images/logo-white.png" alt="Güven İş ve İstif Makinaları" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-sm text-white/40 italic mb-2">"Güven ile kiralayın."</p>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              1978'den bu yana iş ve istif makineleri alanında İstanbul'un güvenilir çözüm ortağı.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-stone-500 hover:text-[#4A90D9] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center group-hover:bg-[#1E5AA8] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://guvenismakine.sahibinden.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-stone-500 hover:text-[#4A90D9] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center group-hover:bg-[#1E5AA8] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span className="text-sm">Sahibinden Mağazamız</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base text-white/80 mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-stone-500 hover:text-[#4A90D9] transition-colors flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#4A90D9] transition-all duration-200 inline-block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-base text-white/80 mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-500 hover:text-[#4A90D9] transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#4A90D9] transition-all duration-200 inline-block" />
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-stone-500 hover:text-[#4A90D9] transition-colors flex items-center gap-1.5 group">
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
            <h3 className="font-heading text-base text-white/80 mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1E5AA8] mt-0.5 shrink-0" />
                <span className="text-sm text-stone-500">
                  Esenşehir Mahallesi, Gündeş Sokak No:14<br />34776 Ümraniye / İstanbul
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1E5AA8] mt-1 shrink-0" />
                <div className="flex flex-col gap-1.5">
                  {phoneNumbers.map((p) => (
                    <a key={p.href} href={p.href} className="text-sm text-stone-500 hover:text-[#4A90D9] transition-colors">
                      {p.number}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1E5AA8] shrink-0" />
                <a href="mailto:info@guvenismakina.com" className="text-sm text-stone-500 hover:text-[#4A90D9] transition-colors">
                  info@guvenismakina.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-stone-600">© {currentYear} Güven İş ve İstif Makinaları. Tüm hakları saklıdır.</p>
          <p className="text-xs text-stone-700">Güven İş ve İstif Makinaları San. ve Tic. Ltd. Şti.</p>
        </div>
      </div>
    </footer>
  );
}
