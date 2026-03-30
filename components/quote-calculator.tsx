'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle2, Truck, Clock, User, Send, MapPin,
  ArrowRight, Wrench, Shield, Zap,
} from 'lucide-react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

const machineTypes = [
  { value: 'Ekskavatör', labelTr: 'Ekskavatör', labelEn: 'Excavator', basePrice: 5000, icon: '🚜' },
  { value: 'Mini Ekskavatör', labelTr: 'Mini Ekskavatör', labelEn: 'Mini Excavator', basePrice: 2500, icon: '⛏️' },
  { value: 'Forklift', labelTr: 'Forklift', labelEn: 'Forklift', basePrice: 2000, icon: '🏗️' },
  { value: 'İstif Makinesi', labelTr: 'İstif Makinesi', labelEn: 'Stacker', basePrice: 1800, icon: '📦' },
  { value: 'Yükleyici', labelTr: 'Yükleyici', labelEn: 'Loader', basePrice: 4000, icon: '🚧' },
  { value: 'Diğer', labelTr: 'Diğer', labelEn: 'Other', basePrice: 3000, icon: '⚙️' },
];

const rentalDurations = [
  { value: '1 Gün', labelTr: '1 Gün', labelEn: '1 Day', multiplier: 1 },
  { value: '3 Gün', labelTr: '3 Gün', labelEn: '3 Days', multiplier: 2.5 },
  { value: '1 Hafta', labelTr: '1 Hafta', labelEn: '1 Week', multiplier: 5 },
  { value: '1 Ay', labelTr: '1 Ay', labelEn: '1 Month', multiplier: 15 },
];

const initialForm = {
  machineType: '', duration: '', location: '',
  operatorRequired: false, name: '', phone: '', email: '', message: '',
};

const features = [
  { icon: Shield, labelTr: 'Sigortalı Makine', labelEn: 'Insured Machine' },
  { icon: Wrench, labelTr: 'Periyodik Bakım', labelEn: 'Periodic Maintenance' },
  { icon: Zap, labelTr: 'Hızlı Teslimat', labelEn: 'Fast Delivery' },
];

export function QuoteCalculator() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  const estimatedPrice = useMemo(() => {
    const machine = machineTypes.find((m) => m.value === formData.machineType);
    const duration = rentalDurations.find((d) => d.value === formData.duration);
    if (!machine || !duration) return null;
    let price = machine.basePrice * duration.multiplier;
    if (formData.operatorRequired) price += 1500 * duration.multiplier;
    return price;
  }, [formData.machineType, formData.duration, formData.operatorRequired]);

  const selectedMachine = machineTypes.find((m) => m.value === formData.machineType);
  const selectedDuration = rentalDurations.find((d) => d.value === formData.duration);

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
        setError(t('quote.error'));
      }
    } catch {
      setError(t('quote.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setIsSubmitted(false);
    setError('');
    setStep(1);
  };

  const canGoToStep2 = formData.machineType && formData.duration;

  return (
    <SectionWrapper id="teklif" className="py-0 relative overflow-hidden">
      {/* Split background */}
      <div className="grid lg:grid-cols-2 min-h-[700px]">

        {/* LEFT — decorative info panel */}
        <div className="relative bg-gradient-to-br from-[#0B2545] via-[#1E5AA8] to-[#0B2545] flex flex-col justify-center p-10 lg:p-16 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full border-2 border-white -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full border-2 border-white translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full border border-white -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <span className="inline-block text-xs font-semibold text-white/60 tracking-widest uppercase mb-5 px-3 py-1 border border-white/15 rounded-full">
              {t('quote.label')}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
              {t('quote.title')}
            </h2>
            <p className="text-white/75 text-lg leading-relaxed mb-10">
              {t('quote.subtitle')}
            </p>

            {/* Feature badges */}
            <div className="space-y-3 mb-10">
              {features.map((f) => (
                <div key={f.labelTr} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/85 font-medium text-sm">
                    {locale === 'tr' ? f.labelTr : f.labelEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Price preview */}
            <AnimatePresence mode="wait">
              {estimatedPrice ? (
                <motion.div
                  key="price"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6"
                >
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{t('quote.summary.price')}</p>
                  <p className="text-4xl font-bold text-white mb-0.5">
                    {estimatedPrice.toLocaleString('tr-TR')} ₺
                  </p>
                  <p className="text-white/50 text-xs">{t('quote.summary.vat')}</p>

                  {selectedMachine && (
                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">{t('quote.summary.machine')}</p>
                        <p className="text-white text-sm font-medium">
                          {selectedMachine.icon} {locale === 'tr' ? selectedMachine.labelTr : selectedMachine.labelEn}
                        </p>
                      </div>
                      {selectedDuration && (
                        <div>
                          <p className="text-white/40 text-xs mb-0.5">{t('quote.summary.duration')}</p>
                          <p className="text-white text-sm font-medium">
                            {locale === 'tr' ? selectedDuration.labelTr : selectedDuration.labelEn}
                          </p>
                        </div>
                      )}
                      {formData.operatorRequired && (
                        <div className="col-span-2">
                          <p className="text-white/40 text-xs mb-0.5">{t('quote.summary.operator')}</p>
                          <p className="text-white text-sm font-medium">✓ {t('quote.summary.operator.yes')}</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/6 border border-white/10 rounded-2xl p-6 text-center"
                >
                  <Truck className="w-8 h-8 text-white/30 mx-auto mb-2" />
                  <p className="text-white/50 text-sm">{t('quote.summary.empty')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="bg-white flex flex-col justify-center p-10 lg:p-16">

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 rounded-full bg-[#1E5AA8]/8 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="h-12 w-12 text-[#1E5AA8]" />
              </motion.div>
              <h3 className="font-heading text-3xl text-[#0B1929] mb-3">{t('quote.success.title')}</h3>
              <p className="text-[#0B1929]/60 mb-8 leading-relaxed">{t('quote.success.desc')}</p>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white"
              >
                {t('quote.newQuote')}
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0">
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-8">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${step === 1 ? 'bg-[#1E5AA8] text-white' : 'bg-[#1E5AA8]/15 text-[#1E5AA8]'}`}>1</div>
                <div className={`flex-1 h-0.5 transition-all ${canGoToStep2 ? 'bg-[#1E5AA8]' : 'bg-[#E8ECF0]'}`} />
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${step === 2 ? 'bg-[#1E5AA8] text-white' : canGoToStep2 ? 'bg-[#1E5AA8]/15 text-[#1E5AA8]' : 'bg-[#F6F8FB] text-[#0B1929]/30'}`}>2</div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-heading text-2xl text-[#0B1929] mb-1">{t('quote.machine')}</h3>
                      <p className="text-sm text-[#0B1929]/50 mb-5">{locale === 'tr' ? 'Hangi makinaya ihtiyacınız var?' : 'Which machine do you need?'}</p>
                    </div>

                    {/* Machine type buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      {machineTypes.map((m) => (
                        <button
                          type="button"
                          key={m.value}
                          onClick={() => setFormData((p) => ({ ...p, machineType: m.value }))}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                            formData.machineType === m.value
                              ? 'border-[#1E5AA8] bg-[#EEF3FB]'
                              : 'border-[#E8ECF0] hover:border-[#1E5AA8]/30 hover:bg-[#F6F8FB]'
                          }`}
                        >
                          <span className="text-2xl">{m.icon}</span>
                          <span className={`text-sm font-semibold ${formData.machineType === m.value ? 'text-[#1E5AA8]' : 'text-[#0B1929]'}`}>
                            {locale === 'tr' ? m.labelTr : m.labelEn}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Duration */}
                    <div>
                      <Label className="text-sm font-semibold text-[#0B1929] mb-2 block">{t('quote.duration')}</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {rentalDurations.map((d) => (
                          <button
                            type="button"
                            key={d.value}
                            onClick={() => setFormData((p) => ({ ...p, duration: d.value }))}
                            className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              formData.duration === d.value
                                ? 'border-[#1E5AA8] bg-[#1E5AA8] text-white'
                                : 'border-[#E8ECF0] text-[#0B1929] hover:border-[#1E5AA8]/40'
                            }`}
                          >
                            {locale === 'tr' ? d.labelTr : d.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.location')}</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E5AA8]/60" />
                        <Input
                          placeholder={t('quote.location.placeholder')}
                          value={formData.location}
                          onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                          className="pl-10 border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]"
                        />
                      </div>
                    </div>

                    {/* Operator toggle */}
                    <div className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${formData.operatorRequired ? 'border-[#1E5AA8] bg-[#EEF3FB]' : 'border-[#E8ECF0] bg-[#F6F8FB]'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${formData.operatorRequired ? 'bg-[#1E5AA8]' : 'bg-white border border-[#E8ECF0]'}`}>
                          <User className={`h-4 w-4 ${formData.operatorRequired ? 'text-white' : 'text-[#0B1929]/40'}`} />
                        </div>
                        <div>
                          <Label htmlFor="operator" className="text-sm font-semibold text-[#0B1929] cursor-pointer">{t('quote.operator')}</Label>
                          <p className="text-xs text-[#0B1929]/50">{t('quote.operator.sub')}</p>
                        </div>
                      </div>
                      <Switch
                        id="operator"
                        checked={formData.operatorRequired}
                        onCheckedChange={(v) => setFormData((p) => ({ ...p, operatorRequired: v }))}
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => canGoToStep2 && setStep(2)}
                      disabled={!canGoToStep2}
                      className="w-full min-h-[52px] bg-[#1E5AA8] hover:bg-[#164a8a] text-white font-semibold text-base disabled:opacity-40"
                    >
                      {locale === 'tr' ? 'Devam Et' : 'Continue'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-heading text-2xl text-[#0B1929] mb-1">{locale === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}</h3>
                      <p className="text-sm text-[#0B1929]/50 mb-5">{locale === 'tr' ? 'Ekibimiz sizinle iletişime geçsin.' : 'Our team will contact you.'}</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.name')}</Label>
                      <Input
                        placeholder={locale === 'tr' ? 'Adınız ve soyadınız' : 'Your full name'}
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]"
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.phone')}</Label>
                        <Input
                          type="tel"
                          placeholder="05XX XXX XX XX"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.email')}</Label>
                        <Input
                          type="email"
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.message')}</Label>
                      <Textarea
                        placeholder={t('quote.message.placeholder')}
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8] resize-none min-h-[90px]"
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg border border-red-100">{error}</p>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="border-[#E8ECF0] text-[#0B1929] hover:bg-[#F6F8FB] px-5"
                      >
                        ←
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 min-h-[52px] bg-[#1E5AA8] hover:bg-[#164a8a] text-white font-semibold text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            {t('quote.sending')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            {t('quote.submit')}
                          </span>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
