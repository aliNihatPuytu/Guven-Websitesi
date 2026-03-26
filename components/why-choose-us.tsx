import { Award, Cog, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "45+ Yıl Deneyim",
    description: "1978'den beri sektörün güvenilir ismi",
  },
  {
    icon: Cog,
    title: "Modern Makine Parkı",
    description: "Son teknoloji, bakımlı makineler",
  },
  {
    icon: Users,
    title: "Profesyonel Operatörler",
    description: "Sertifikalı, deneyimli ekip",
  },
  {
    icon: Zap,
    title: "Hızlı Teslimat",
    description: "İhtiyacınız olduğunda yanınızda",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-8 md:py-12 lg:py-20 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
              </div>
              <h3 className="font-serif text-sm sm:text-base lg:text-xl text-foreground mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
