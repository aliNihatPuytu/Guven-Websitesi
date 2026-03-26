import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-construction.jpg"
          alt="İş makinaları şantiyede çalışıyor"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E5AA8]/90 via-[#1E5AA8]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 pb-28 sm:pb-32">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight text-balance">
            Güvenilir İş ve İstif Makinaları
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl">
            1978'den beri iş makinası kiralama, satış ve hafriyat hizmetleri sunuyoruz.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-[#1E5AA8] hover:bg-white/90 font-medium px-6 sm:px-8 min-h-[44px] sm:min-h-[48px] text-base"
            >
              <Link href="/#makinalar">Makinaları İncele</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 font-medium px-6 sm:px-8 min-h-[44px] sm:min-h-[48px] text-base bg-transparent"
            >
              <Link href="/#teklif">Teklif Al</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#2B2B2B]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 py-4 sm:py-6 text-center">
            <div className="border-r border-white/20 md:border-r px-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">45+</div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">Yıl Deneyim</div>
            </div>
            <div className="md:border-r border-white/20 px-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">500+</div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">Tamamlanan Proje</div>
            </div>
            <div className="border-r border-white/20 md:border-r px-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">100+</div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">Makine Filosu</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">50+</div>
              <div className="text-xs sm:text-sm text-white/70 mt-1">Uzman Operatör</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
