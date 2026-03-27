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
        setError('Bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.');
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-white mb-4">
              Teklif Talebiniz Alındı!
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              En kısa sürede sizinle iletişime geçeceğiz.<br />Bizi tercih ettiğiniz için teşekkür ederiz.
            </p>
            <Button
              onClick={() => { setIsSubmitted(false); setFormData(initialForm); }}
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white bg-transparent"
            >
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
          <span className="text-sm font-medium text-white/55 tracking-widest uppercase">
            Hızlı Teklif
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Makina Kiralama Teklif Al
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            İhtiyacınız olan iş makinasını seçin ve hızlıca teklif alın.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/8 backdrop-blur-sm border-white/15">
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-white text-sm font-medium">Makina Türü</Label>
                      <Select value={formData.machineType} onValueChange={(v) => setFormData((p) => ({ ...p, machineType: v }))}>
                        <SelectTrigger className="bg-white/10 border-white/25 text-white h-11">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {machineTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white text-sm font-medium">Kiralama Süresi</Label>
                      <Select value={formData.duration} onValueChange={(v) => setFormData((p) => ({ ...p, duration: v }))}>
                        <SelectTrigger className="bg-white/10 border-white/25 text-white h-11">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {rentalDurations.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-sm font-medium">Proje Lokasyonu</Label>
                    <Input
                      placeholder="Şehir veya adres giriniz"
                      value={formData.location}
                      onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                      className="bg-white/10 border-white/25 text-white placeholder:text-white/40 h-11"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/15">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-white/70" />
                      <div>
                        <Label className="text-white cursor-pointer">Operatör Gerekli mi?</Label>
                        <p className="text-xs text-white/50 mt-0.5">Tecrübeli operatör hizmeti</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.operatorRequired}
                      onCheckedChange={(v) => setFormData((p) => ({ ...p, operatorRequired: v }))}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-white text-sm font-medium">İsim Soyisim *</Label>
                      <Input placeholder="Adınız ve soyadınız" value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="bg-white/10 border-white/25 text-white placeholder:text-white/40 h-11" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white text-sm font-medium">Telefon *</Label>
                      <Input type="tel" placeholder="05XX XXX XX XX" value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="bg-white/10 border-white/25 text-white placeholder:text-white/40 h-11" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-sm font-medium">E-posta *</Label>
                    <Input type="email" placeholder="ornek@email.com" value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="bg-white/10 border-white/25 text-white placeholder:text-white/40 h-11" required />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-sm font-medium">Mesaj (Opsiyonel)</Label>
                    <Textarea placeholder="Projeniz hakkında ek bilgiler..." value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="bg-white/10 border-white/25 text-white placeholder:text-white/40 min-h-[100px]" />
                  </div>

                  {error && (
                    <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm p-3 rounded-lg">{error}</div>
                  )}

                  <Button type="submit" size="lg"
                    className="w-full min-h-[52px] bg-white text-[#1E5AA8] hover:bg-white/92 font-semibold text-base shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-[#1E5AA8]/30 border-t-[#1E5AA8] rounded-full" />
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
            <Card className="bg-white border-0 shadow-2xl sticky top-24">
              <CardHeader className="border-b border-[#E8ECF0]">
                <CardTitle className="flex items-center gap-2 text-[#2B2B2B]">
                  <Calculator className="h-5 w-5 text-[#1E5AA8]" />
                  Tahmini Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {formData.machineType && formData.duration ? (
                  <>
                    <div className="space-y-3">
                      {[
                        { icon: Truck, label: 'Makina Türü', value: formData.machineType },
                        { icon: Clock, label: 'Kiralama Süresi', value: formData.duration },
                        ...(formData.operatorRequired ? [{ icon: User, label: 'Operatör', value: 'Dahil' }] : []),
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 p-3 bg-[#F6F8FB] rounded-xl">
                          <Icon className="h-5 w-5 text-[#1E5AA8] shrink-0" />
                          <div>
                            <p className="text-xs text-[#2B2B2B]/50">{label}</p>
                            <p className="font-semibold text-[#2B2B2B] text-sm">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#E8ECF0] pt-5">
                      <p className="text-sm text-[#2B2B2B]/50 mb-1">Tahmini Fiyat</p>
                      <p className="text-4xl font-bold text-[#1E5AA8]">
                        {estimatedPrice?.toLocaleString('tr-TR')} ₺
                      </p>
                      <p className="text-xs text-[#2B2B2B]/40 mt-1.5">*KDV hariç tahmini fiyattır</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-[#EEF3FB] flex items-center justify-center mx-auto mb-4">
                      <Truck className="h-8 w-8 text-[#1E5AA8]/50" />
                    </div>
                    <p className="text-[#2B2B2B]/50 text-sm leading-relaxed">
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
