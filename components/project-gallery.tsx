"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

const projects = [
  {
    id: "istanbul-metro",
    title: "İstanbul Metro Şantiye Çalışmaları",
    location: "İstanbul, Türkiye",
    description:
      "İstanbul metrosu genişletme projesi kapsamında büyük çaplı kazı ve hafriyat işleri gerçekleştirildi.",
    image: "/images/projects/metro-construction.jpg",
    machines: ["Ekskavatör", "Yükleyici", "Kamyon"],
  },
  {
    id: "konut-projesi",
    title: "Büyük Konut Projesi Hafriyat",
    location: "Ankara, Türkiye",
    description:
      "2000 konutluk dev projede temel kazı ve zemin hazırlık çalışmaları başarıyla tamamlandı.",
    image: "/images/projects/residential-excavation.jpg",
    machines: ["Mini Ekskavatör", "Forklift", "Kompresör"],
  },
  {
    id: "endustriyel-tesis",
    title: "Endüstriyel Tesis İnşaatı",
    location: "Kocaeli, Türkiye",
    description:
      "50.000 m² alana sahip endüstriyel tesis inşaatında kapsamlı makine desteği sağlandı.",
    image: "/images/projects/industrial-facility.jpg",
    machines: ["Ekskavatör", "Forklift", "Jeneratör"],
  },
]

export function ProjectGallery() {
  return (
    <section id="projeler" className="py-8 md:py-12 lg:py-20 bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
            Projelerimiz
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Türkiye genelinde tamamladığımız büyük ölçekli projelerden bazıları.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden bg-background border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  >
                    <Link href={`/projeler/${project.id}`}>
                      Projeyi İncele
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.machines.slice(0, 3).map((machine) => (
                    <span
                      key={machine}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                    >
                      {machine}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto min-h-[48px] border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/projeler">
              Tüm Projeleri Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
