"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Calculator, Truck, Clock, User } from "lucide-react"

const machineTypes = [
  { value: "ekskavator", label: "Ekskavatör", basePrice: 5000 },
  { value: "mini-ekskavator", label: "Mini Ekskavatör", basePrice: 2500 },
  { value: "forklift", label: "Forklift", basePrice: 2000 },
  { value: "yukleyici", label: "Yükleyici", basePrice: 4000 },
  { value: "diger", label: "Diğer", basePrice: 3000 },
]

const rentalDurations = [
  { value: "1-gun", label: "1 Gün", multiplier: 1 },
  { value: "3-gun", label: "3 Gün", multiplier: 2.5 },
  { value: "1-hafta", label: "1 Hafta", multiplier: 5 },
  { value: "1-ay", label: "1 Ay", multiplier: 15 },
]

export function QuoteCalculator() {
  const [formData, setFormData] = useState({
    machineType: "",
    duration: "",
    location: "",
    operatorRequired: false,
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const estimatedPrice = useMemo(() => {
    const machine = machineTypes.find((m) => m.value === formData.machineType)
    const duration = rentalDurations.find((d) => d.value === formData.duration)

    if (!machine || !duration) return null

    let price = machine.basePrice * duration.multiplier
    if (formData.operatorRequired) {
      price += 1500 * duration.multiplier
    }

    return price
  }, [formData.machineType, formData.duration, formData.operatorRequired])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleReset = () => {
    setFormData({
      machineType: "",
      duration: "",
      location: "",
      operatorRequired: false,
      name: "",
      phone: "",
      email: "",
      message: "",
    })
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <section id="teklif" className="py-20 lg:py-24 bg-primary">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
              Teklif Talebiniz Alındı!
            </h2>
            <p className="text-white/90 text-lg mb-8">
              En kısa sürede sizinle iletişime geçeceğiz. Bizi tercih ettiğiniz için teşekkür ederiz.
            </p>
            <Button onClick={handleReset} variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Yeni Teklif Al
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="teklif" className="py-8 md:py-12 lg:py-20 bg-primary">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
            Makina Kiralama Teklif Al
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            İhtiyacınız olan iş makinasını seçin ve hızlıca teklif alın.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Machine Type */}
                    <div className="space-y-2">
                      <Label htmlFor="machineType" className="text-white">
                        Makina Türü
                      </Label>
                      <Select
                        value={formData.machineType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, machineType: value }))
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {machineTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-white">
                        Kiralama Süresi
                      </Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, duration: value }))
                        }
                      >
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {rentalDurations.map((duration) => (
                            <SelectItem key={duration.value} value={duration.value}>
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Proje Lokasyonu
                    </Label>
                    <Input
                      id="location"
                      placeholder="Şehir veya adres giriniz"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, location: e.target.value }))
                      }
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>

                  {/* Operator Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/20">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-white/80" />
                      <div>
                        <Label htmlFor="operator" className="text-white cursor-pointer">
                          Operatör Gerekli mi?
                        </Label>
                        <p className="text-sm text-white/60">Tecrübeli operatör hizmeti</p>
                      </div>
                    </div>
                    <Switch
                      id="operator"
                      checked={formData.operatorRequired}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, operatorRequired: checked }))
                      }
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        İsim Soyisim
                      </Label>
                      <Input
                        id="name"
                        placeholder="Adınız ve soyadınız"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      E-posta
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Mesaj (Opsiyonel)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Projeniz hakkında ek bilgiler..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-[48px] bg-white text-primary hover:bg-white/90 font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Teklif Talebi Gönder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Quote Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-xl sticky top-24">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calculator className="h-5 w-5 text-primary" />
                  Tahmini Kiralama Bilgisi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {formData.machineType && formData.duration ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Truck className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Makina Türü</p>
                          <p className="font-medium text-foreground">
                            {machineTypes.find((m) => m.value === formData.machineType)?.label}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Kiralama Süresi</p>
                          <p className="font-medium text-foreground">
                            {rentalDurations.find((d) => d.value === formData.duration)?.label}
                          </p>
                        </div>
                      </div>

                      {formData.operatorRequired && (
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <User className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Operatör</p>
                            <p className="font-medium text-foreground">Dahil</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Tahmini Fiyat</p>
                      <p className="text-3xl font-bold text-primary">
                        {estimatedPrice?.toLocaleString("tr-TR")} ₺
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        *KDV hariç tahmini fiyattır
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Truck className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Tahmini fiyatı görmek için makina türü ve kiralama süresini seçin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
