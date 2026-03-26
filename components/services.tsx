import { Truck, ShoppingCart, HardHat, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Truck,
    title: "İş Makinası Kiralama",
    description:
      "Geniş makine filomuzla kısa ve uzun süreli kiralama hizmetleri sunuyoruz. Tüm makinalarımız düzenli bakımlı ve sigortalıdır.",
  },
  {
    icon: ShoppingCart,
    title: "Makina Satışı",
    description:
      "Yeni ve ikinci el iş makinaları satışı yapıyoruz. Güvenilir markalardan kaliteli makineler sunar, garanti hizmeti veririz.",
  },
  {
    icon: HardHat,
    title: "Hafriyat Hizmetleri",
    description:
      "Her ölçekte hafriyat, kazı ve dolgu işlerinizi profesyonel ekibimiz ve modern ekipmanlarımızla gerçekleştiriyoruz.",
  },
  {
    icon: Users,
    title: "Proje Destek",
    description:
      "Projenizin başından sonuna kadar teknik destek ve danışmanlık hizmeti veriyoruz. Deneyimli mühendislerimiz yanınızda.",
  },
]

export function Services() {
  return (
    <section id="hizmetler" className="py-8 md:py-12 lg:py-20 bg-muted/50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            45 yılı aşkın tecrübemizle inşaat ve sanayi sektörüne kapsamlı çözümler sunuyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-background border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-6 lg:p-8">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
