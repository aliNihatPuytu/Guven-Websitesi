import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projeler | Güven İş ve İstif Makinaları',
  description: 'Güven İş ve İstif Makinaları tarafından tamamlanan projeler. İstanbul, Ankara ve Türkiye genelinde büyük ölçekli inşaat ve lojistik projeleri.',
}

const projects = [
  {
    id: 'istanbul-metro',
    title: 'İstanbul Metro Şantiye Çalışmaları',
    location: 'İstanbul, Türkiye',
    description: 'İstanbul metrosu genişletme projesi kapsamında büyük çaplı kazı ve hafriyat işleri gerçekleştirildi.',
    image: '/images/projects/metro-construction.jpg',
    machines: ['Ekskavatör', 'Yükleyici', 'Kamyon'],
  },
  {
    id: 'konut-projesi',
    title: 'Büyük Konut Projesi Hafriyat',
    location: 'Ankara, Türkiye',
    description: '2000 konutluk dev projede temel kazı ve zemin hazırlık çalışmaları başarıyla tamamlandı.',
    image: '/images/projects/residential-excavation.jpg',
    machines: ['Mini Ekskavatör', 'Forklift', 'İstif Makinesi'],
  },
  {
    id: 'endustriyel-tesis',
    title: 'Endüstriyel Tesis İnşaatı',
    location: 'Kocaeli, Türkiye',
    description: '50.000 m² alana sahip endüstriyel tesis inşaatında kapsamlı makine desteği sağlandı.',
    image: '/images/projects/industrial-facility.jpg',
    machines: ['Ekskavatör', 'Forklift', 'Yükleyici'],
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="bg-[#1E5AA8] py-20 lg:py-28 pt-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <span className="text-sm font-medium text-white/60 tracking-widest uppercase block mb-4">
            Referanslarımız
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-white mb-4">Projelerimiz</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Türkiye genelinde tamamladığımız büyük ölçekli projelerden bazıları.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-28 bg-[#F2F1ED]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden bg-white border-[#E5E5E5] hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1E5AA8]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      asChild
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#1E5AA8] bg-transparent"
                    >
                      <Link href={`/projeler/${project.id}`}>
                        Projeyi İncele
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-sm text-[#2B2B2B]/60 mb-2">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                  <h3 className="font-heading text-xl text-[#2B2B2B] mb-2 group-hover:text-[#1E5AA8] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#2B2B2B]/70 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.machines.map((machine) => (
                      <span
                        key={machine}
                        className="px-2 py-1 text-xs bg-[#EEF3FB] text-[#1E5AA8] rounded font-medium"
                      >
                        {machine}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2B2B2B] py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Projeniz İçin Destek Almak İster misiniz?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Her ölçekte projeniz için güvenilir makine desteği sunuyoruz.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#1E5AA8] hover:bg-[#164a8a] text-white px-8 py-6"
          >
            <Link href="/#teklif">
              Teklif Al
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
