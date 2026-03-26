'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Calculator, Truck, Clock, User, Send } from 'lucide-react';
import { SectionWrapper, FadeIn } from '@/components/ui/section-wrapper';

const machineTypes = [
  { value: 'Ekskavatör', label: 'Ekskavatör', basePrice: 5000 },
  { value: 'Mini Ekskavatör', label: 'Mini Ekskavatör', basePrice: 2500 },
  { value: 'Forklift', label: 'Forklift', basePrice: 2000 },
  { value: 'İstif Makinesi', label: 'İstif Makinesi', basePrice: 1800 },
  { value: 'Yükleyici', label: 'Yükleyici', basePrice: 4000 },
  { value: 'Diğer', label: 'Diğer', basePrice: 3000 },
];

const rentalDurations = [
  { value: '1 Gün', label: '1 Gün', multiplier: 1 },
  { value: '3 Gün', label: '3 Gün', multiplier: 2.5 },
  { value: '1 Hafta', label: '1 Hafta', multiplier: 5 },
  { value: '1 Ay', label: '1 Ay', multiplier: 15 },
];

const initialForm = {
  machineType: '',
  duration: '',
  location: '',
  operatorRequired: false,
  name: '',
  phone: '',
  email: '',
  message: '',
};

export function QuoteCalculator() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const estimatedPrice = useMemo(() => {
    const machine = machineTypes.find((m) => m.value === formData.machineType);
    const duration = rentalDurations.find((d) => d.value === formData.duration);
    if (!machine || !duration) return null;
    let price = machine.basePrice * duration.multiplier;
    if (formData.operatorRequired) price += 1500 * duration.multiplier;
    return price;
  }, [formData.machineType, formData.duration, formData.operatorRequired]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: estimatedPrice?.toLocaleString('tr-TR'),
          formType: 'quote',
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setIsSubmitted(false);
    setError('');
  };

  if (isSubmitted) {
    return (
      <SectionWrapper id="teklif" className="py-24 lg:py-32 bg-[#1E5AA8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
              Teklif Talebiniz Alındı!
            </h2>
            <p className="text-white/90 text-lg mb-8">
              En kısa sürede sizinle iletişime geçeceğiz. Bizi tercih ettiğiniz için teşekkür ederiz.
            </p>
            <Button onClick={handleReset} variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Yeni Teklif Al
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="teklif" className="py-24 lg:py-32 bg-[#1E5AA8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="text-sm font-medium text-white/60 tracking-widest uppercase">
            Hızlı Teklif
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Makina Kiralama Teklif Al
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            İhtiyacınız olan iş makinasını seçin ve hızlıca teklif alın.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Machine Type */}
                    <div className="space-y-2">
                      <Label htmlFor="machineType" className="text-white">Makina Türü</Label>
                      <Select
                        value={formData.machineType}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, machineType: value }))}
                      >
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {machineTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-white">Kiralama Süresi</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
                      >
                        <SelectTrigger className="bg-white/10 border-white/30 text-white">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {rentalDurations.map((d) => (
                            <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-white">Proje Lokasyonu</Label>
                    <Input
                      placeholder="Şehir veya adres giriniz"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>

                  {/* Operator Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/20">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-white/80" />
                      <div>
                        <Label htmlFor="operator" className="text-white cursor-pointer">Operatör Gerekli mi?</Label>
                        <p className="text-sm text-white/60">Tecrübeli operatör hizmeti</p>
                      </div>
                    </div>
                    <Switch
                      id="operator"
                      checked={formData.operatorRequired}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, operatorRequired: checked }))}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white">İsim Soyisim *</Label>
                      <Input
                        placeholder="Adınız ve soyadınız"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Telefon *</Label>
                      <Input
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">E-posta *</Label>
                    <Input
                      type="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Mesaj (Opsiyonel)</Label>
                    <Textarea
                      placeholder="Projeniz hakkında ek bilgiler..."
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[100px]"
                    />
                  </div>

                  {error && (
                    <p className="text-red-300 text-sm">{error}</p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-[52px] bg-white text-[#1E5AA8] hover:bg-white/90 font-medium text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-[#1E5AA8]/30 border-t-[#1E5AA8] rounded-full"
                        />
                        Gönderiliyor...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Teklif Talebi Gönder
                      </span>
                    )}
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
                  <Calculator className="h-5 w-5 text-[#1E5AA8]" />
                  Tahmini Kiralama Bilgisi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {formData.machineType && formData.duration ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Truck className="h-5 w-5 text-[#1E5AA8]" />
                        <div>
                          <p className="text-xs text-muted-foreground">Makina Türü</p>
                          <p className="font-medium text-foreground">{formData.machineType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Clock className="h-5 w-5 text-[#1E5AA8]" />
                        <div>
                          <p className="text-xs text-muted-foreground">Kiralama Süresi</p>
                          <p className="font-medium text-foreground">{formData.duration}</p>
                        </div>
                      </div>
                      {formData.operatorRequired && (
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <User className="h-5 w-5 text-[#1E5AA8]" />
                          <div>
                            <p className="text-xs text-muted-foreground">Operatör</p>
                            <p className="font-medium text-foreground">Dahil</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Tahmini Fiyat</p>
                      <p className="text-3xl font-bold text-[#1E5AA8]">
                        {estimatedPrice?.toLocaleString('tr-TR')} ₺
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">*KDV hariç tahmini fiyattır</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Truck className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Tahmini fiyatı görmek için makina türü ve kiralama süresini seçin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
