import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const machines = [
  {
    id: "ekskavatorler",
    title: "Ekskavatörler",
    description: "Kazı ve hafriyat işleri için güçlü ekskavatörler. 20-80 ton arası çeşitli kapasiteler.",
    image: "/images/machines/excavator.jpg",
  },
  {
    id: "forkliftler",
    title: "Forkliftler",
    description: "Depo ve şantiye için yük taşıma çözümleri. Elektrikli ve dizel seçenekler mevcut.",
    image: "/images/machines/forklift.jpg",
  },
  {
    id: "yukleyiciler",
    title: "Yükleyiciler",
    description: "Malzeme taşıma ve yükleme işleri için güvenilir yükleyiciler.",
    image: "/images/machines/loader.jpg",
  },
  {
    id: "mini-ekskavatorler",
    title: "Mini Ekskavatörler",
    description: "Dar alanlarda kazı işleri için kompakt ve manevra kabiliyeti yüksek mini ekskavatörler.",
    image: "/images/machines/mini-excavator.jpg",
  },
  {
    id: "santiye-ekipmanlari",
    title: "Şantiye Ekipmanları",
    description: "Jeneratör, kompresör ve diğer şantiye destek ekipmanları.",
    image: "/images/machines/site-equipment.jpg",
  },
]

export function MachineCategories() {
  return (
    <section id="makinalar" className="py-8 md:py-12 lg:py-20 bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
            Makine Kategorileri
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Geniş makine filomuzla her türlü inşaat ve hafriyat projeniz için doğru ekipmanı sunuyoruz.
          </p>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <Card
              key={machine.id}
              className="group overflow-hidden bg-background border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={machine.image}
                  alt={machine.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl text-foreground mb-2">{machine.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {machine.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full min-h-[44px] group/btn border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href={`/makinalar/${machine.id}`}>
                    Detayları Gör
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
