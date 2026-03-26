import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  company: {
    title: "Şirket",
    links: [
      { name: "Hakkımızda", href: "/hakkimizda" },
      { name: "Projeler", href: "/#projeler" },
      { name: "Hizmetler", href: "/#hizmetler" },
    ],
  },
  services: {
    title: "Hizmetler",
    links: [
      { name: "Makina Kiralama", href: "/#teklif" },
      { name: "Makina Satışı", href: "/#makinalar" },
      { name: "Hafriyat", href: "/#hizmetler" },
    ],
  },
  quickLinks: {
    title: "Hızlı Bağlantılar",
    links: [
      { name: "Makinalar", href: "/#makinalar" },
      { name: "Teklif Al", href: "/#teklif" },
      { name: "İletişim", href: "/#iletisim" },
    ],
  },
}

const contactDetails = {
  phone: "+90 (212) 555 12 34",
  email: "info@guvenmakinaları.com",
  address: "Organize Sanayi Bölgesi, İstanbul",
}

export function Footer() {
  return (
    <footer className="bg-[#2B2B2B] text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-8 md:py-12 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-white.png"
                alt="GÜVEN İş ve İstif Makinaları"
                width={180}
                height={40}
                className="h-9 w-auto md:h-10"
              />
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm">
              1978'den beri inşaat ve sanayi sektörüne güvenilir makine çözümleri sunuyoruz.
              Kalite ve güven ilkesiyle çalışıyoruz.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${contactDetails.phone}`}
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                {contactDetails.phone}
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contactDetails.email}
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-4 w-4" />
                {contactDetails.address}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">{footerLinks.company.title}</h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">{footerLinks.services.title}</h3>
            <ul className="space-y-3">
              {footerLinks.services.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">{footerLinks.quickLinks.title}</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Güven İş ve İstif Makinaları. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
