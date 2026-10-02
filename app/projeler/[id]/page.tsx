import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, Calendar, Truck } from "lucide-react"

const projects = {
  "istanbul-metro": {
    title: "İstanbul Metro Şantiye Çalışmaları",
    location: "İstanbul, Türkiye",
    date: "2023 - 2024",
    description: `İstanbul metrosu genişletme projesi kapsamında gerçekleştirdiğimiz büyük çaplı kazı ve hafriyat işleri, 
    şehrin ulaşım altyapısına önemli katkılar sağlamıştır. Proje süresince 50.000 m³'ü aşkın hafriyat çıkarılmış, 
    güvenli ve verimli bir çalışma ortamı sağlanmıştır.
    
    Zorlu kentsel koşullarda gerçekleştirilen bu proje, Güven İş ve İstif Makinaları'nın teknik kapasitesini 
    ve deneyimini bir kez daha kanıtlamıştır.`,
    heroImage: "/images/projects/metro-construction.jpg",
    machines: [
      { name: "Ekskavatör", count: 5 },
      { name: "Yükleyici", count: 3 },
      { name: "Kamyon", count: 10 },
    ],
    gallery: [
      "/images/projects/metro-construction.jpg",
      "/images/hero-construction.jpg",
      "/images/about-company.jpg",
    ],
  },
  "konut-projesi": {
    title: "Büyük Konut Projesi Hafriyat",
    location: "Ankara, Türkiye",
    date: "2022 - 2023",
    description: `2000 konutluk dev projede temel kazı ve zemin hazırlık çalışmaları başarıyla tamamlandı. 
    Modern yaşam alanlarının temelini oluşturan bu projede, hassas zemin analizi ve güvenli kazı teknikleri uygulandı.
    
    Proje boyunca çevre dostu uygulamalar tercih edilmiş, atık yönetimi ve geri dönüşüm süreçlerine 
    özen gösterilmiştir.`,
    heroImage: "/images/projects/residential-excavation.jpg",
    machines: [
      { name: "Mini Ekskavatör", count: 8 },
      { name: "Forklift", count: 4 },
      { name: "Kompresör", count: 2 },
    ],
    gallery: [
      "/images/projects/residential-excavation.jpg",
      "/images/machines/mini-excavator.jpg",
      "/images/machines/forklift.jpg",
    ],
  },
  "endustriyel-tesis": {
    title: "Endüstriyel Tesis İnşaatı",
    location: "Kocaeli, Türkiye",
    date: "2021 - 2022",
    description: `50.000 m² alana sahip endüstriyel tesis inşaatında kapsamlı makine desteği sağlandı. 
    Türkiye'nin önde gelen sanayi tesislerinden biri için gerçekleştirilen bu projede, 
    yoğun iş programı içinde zamanında teslim başarısı elde edildi.
    
    Proje, Güven İş ve İstif Makinaları'nın endüstriyel projeler konusundaki uzmanlığını 
    ve güvenilirliğini ortaya koymaktadır.`,
    heroImage: "/images/projects/industrial-facility.jpg",
    machines: [
      { name: "Ekskavatör", count: 6 },
      { name: "Forklift", count: 5 },
      { name: "Jeneratör", count: 3 },
    ],
    gallery: [
      "/images/projects/industrial-facility.jpg",
      "/images/machines/excavator.jpg",
      "/images/machines/loader.jpg",
    ],
  },
}

type ProjectParams = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return Object.keys(projects).map((id) => ({ id }))
}

export async function generateMetadata({ params }: ProjectParams) {
  const { id } = await params
  const project = projects[id as keyof typeof projects]

  if (!project) {
    return { title: "Proje Bulunamadı" }
  }

  return {
    title: `${project.title} | Güven İş ve İstif Makinaları`,
    description: project.description.slice(0, 160),
  }
}

export default async function ProjectDetailPage({ params }: ProjectParams) {
  const { id } = await params
  const project = projects[id as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B] via-[#2B2B2B]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-12">
            <Link
              href="/#projeler"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Tüm Projeler
            </Link>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {project.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {project.date}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl text-foreground mb-6">Proje Hakkında</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {project.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Gallery */}
              <div className="mt-12">
                <h2 className="font-heading text-2xl text-foreground mb-6">Proje Görselleri</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-[4/3] rounded-lg overflow-hidden relative group"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Görsel ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-border">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl text-foreground mb-6 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-[#1E5AA8]" />
                    Kullanılan Makineler
                  </h3>
                  <div className="space-y-4">
                    {project.machines.map((machine) => (
                      <div
                        key={machine.name}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <span className="text-foreground">{machine.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {machine.count} adet
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      Benzer bir proje için teklif almak ister misiniz?
                    </p>
                    <Button
                      asChild
                      className="w-full bg-[#1E5AA8] text-[#1E5AA8]-foreground hover:bg-[#1E5AA8]/90"
                    >
                      <Link href="/#teklif">Teklif Al</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
