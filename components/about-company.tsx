import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

const highlights = [
  "1978'den beri sektörde",
  "100+ makine filosu",
  "Türkiye genelinde hizmet",
  "Profesyonel operatör kadrosu",
  "7/24 teknik destek",
  "ISO kalite sertifikaları",
]

export function AboutCompany() {
  return (
    <section id="hakkimizda" className="py-8 md:py-12 lg:py-20 bg-muted/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-company.jpg"
                alt="GÜVEN İş ve İstif Makinaları ekipman filosu"
                fill
                className="object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-primary text-primary-foreground p-4 sm:p-6 rounded-lg shadow-xl">
              <div className="text-2xl sm:text-4xl font-bold">45+</div>
              <div className="text-xs sm:text-sm">Yıl Deneyim</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6">
              Hakkımızda
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              GÜVEN İş ve İstif Makinaları 1978 yılından beri inşaat ve sanayi sektörüne
              güvenilir makine çözümleri sunmaktadır. Müşteri memnuniyetini ön planda tutan
              anlayışımız ve kaliteli hizmet prensibimizle sektörün lider firmalarından biri
              olmayı başardık.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Geniş makine filomuz, deneyimli operatör kadromuz ve güçlü teknik altyapımızla
              her ölçekte projeye destek veriyoruz. Türkiye'nin dört bir yanında
              gerçekleştirdiğimiz projelerle güvenilirliğimizi kanıtlıyoruz.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/hakkimizda">
                Daha Fazla Bilgi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
