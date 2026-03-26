import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

const quickLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/#hizmetler' },
  { name: 'Makinalar', href: '/#makinalar' },
  { name: 'Projeler', href: '/#projeler' },
  { name: 'Hakkımızda', href: '/#hakkimizda' },
  { name: 'İletişim', href: '/#iletisim' },
];

const serviceLinks = [
  { name: 'İş ve İstif Makinesi Kiralama', href: '/#hizmetler' },
  { name: 'Makina Satışı', href: '/#hizmetler' },
  { name: 'Yedek Parça', href: '/#hizmetler' },
  { name: 'Servis ve Teknik Destek', href: '/#hizmetler' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2B2B2B] text-stone-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6">
              <div className="relative w-40 h-12">
                <Image
                  src="/images/logo-white.png"
                  alt="Güven İş ve İstif Makinaları"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              1978'den beri iş ve istif makineleri sektöründe güvenilir çözüm ortağınız.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center transition-colors hover:bg-[#1E5AA8]"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-300 hover:text-[#1E5AA8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-300 hover:text-[#1E5AA8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1E5AA8] mt-0.5 shrink-0" />
                <span className="text-sm text-stone-300">
                  Esenşehir Mahallesi, Gündeş Sokak No:14
                  <br />34776 Ümraniye / İstanbul
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1E5AA8] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+902163141294" className="text-sm text-stone-300 hover:text-[#1E5AA8] transition-colors">
                    0 (216) 314 12 94
                  </a>
                  <a href="tel:+905322975813" className="text-sm text-stone-300 hover:text-[#1E5AA8] transition-colors">
                    0 (532) 297 58 13
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1E5AA8] shrink-0" />
                <a
                  href="mailto:info@guvenismakina.com"
                  className="text-sm text-stone-300 hover:text-[#1E5AA8] transition-colors"
                >
                  info@guvenismakina.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-400">
              © {currentYear} Güven İş ve İstif Makinaları. Tüm hakları saklıdır.
            </p>
            <p className="text-sm text-stone-500">
              "Güven ile kiralayın."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
