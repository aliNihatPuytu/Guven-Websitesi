'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  CheckCircle2, Truck, User, Send, MapPin,
  ArrowRight, Wrench, Shield, Zap, PenLine,
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
  { value: 'Kendim Belirleyeceğim', labelTr: 'Kendim Belirleyeceğim', labelEn: 'I Will Decide', multiplier: 0 },
];

const initialForm = {
  machineType: '', duration: '', customDuration: '', location: '',
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

  const isCustomDuration = formData.duration === 'Kendim Belirleyeceğim';

  const estimatedPrice = useMemo(() => {
    if (isCustomDuration) return null;
    const machine = machineTypes.find((m) => m.value === formData.machineType);
    const duration = rentalDurations.find((d) => d.value === formData.duration);
    if (!machine || !duration || duration.multiplier === 0) return null;
    let price = machine.basePrice * duration.multiplier;
    if (formData.operatorRequired) price += 1500 * duration.multiplier;
    return price;
  }, [formData.machineType, formData.duration, formData.operatorRequired, isCustomDuration]);

  const selectedMachine = machineTypes.find((m) => m.value === formData.machineType);
  const selectedDuration = rentalDurations.find((d) => d.value === formData.duration);

  const canGoToStep2 = formData.machineType && formData.duration &&
    (!isCustomDuration || formData.customDuration.trim().length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const durationToSend = isCustomDuration
      ? `Kendim Belirleyeceğim: ${formData.customDuration}`
      : formData.duration;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          duration: durationToSend,
          estimatedPrice: estimatedPrice ? estimatedPrice.toLocaleString('tr-TR') : 'Belirlenecek',
          formType: 'quote',
        }),
      });
      if (res.ok) setIsSubmitted(true);
      else setError(t('quote.error'));
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

  return (
    <SectionWrapper id="teklif" className="py-0 relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[680px]">

        {/* ── LEFT — info panel ─────────────────────────────────────────── */}
        <div className="relative bg-gradient-to-br from-[#0B2545] via-[#1E5AA8] to-[#0B2545] flex flex-col justify-center p-10 lg:p-16 overflow-hidden">
          {/* Decorative rings */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full border-2 border-white -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full border-2 border-white translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full border border-white -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <span className="inline-block text-xs font-semibold text-white/70 tracking-widest uppercase mb-5 px-3 py-1 border border-white/20 rounded-full">
              {t('quote.label')}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
              {t('quote.title')}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              {t('quote.subtitle')}
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-10">
              {features.map((f) => (
                <div key={f.labelTr} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 font-medium text-sm">
                    {locale === 'tr' ? f.labelTr : f.labelEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Price / summary preview */}
            <AnimatePresence mode="wait">
              {(estimatedPrice || (isCustomDuration && formData.customDuration)) ? (
                <motion.div
                  key="price"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6"
                >
                  {estimatedPrice ? (
                    <>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{t('quote.summary.price')}</p>
                      <p className="text-4xl font-bold text-white mb-0.5">{estimatedPrice.toLocaleString('tr-TR')} ₺</p>
                      <p className="text-white/50 text-xs">{t('quote.summary.vat')}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
                        {locale === 'tr' ? 'Kiralama Süresi' : 'Rental Duration'}
                      </p>
                      <p className="text-xl font-bold text-white">{formData.customDuration}</p>
                      <p className="text-white/50 text-xs mt-1">
                        {locale === 'tr' ? 'Fiyat görüşme ile belirlenecektir.' : 'Price will be determined by negotiation.'}
                      </p>
                    </>
                  )}

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
                  <p className="text-white/55 text-sm">{t('quote.summary.empty')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT — form ──────────────────────────────────────────────── */}
        <div className="bg-white flex flex-col justify-center p-10 lg:p-16">

          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 rounded-full bg-[#1E5AA8]/8 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="h-12 w-12 text-[#1E5AA8]" />
              </motion.div>
              <h3 className="font-heading text-3xl text-[#0B1929] mb-3">{t('quote.success.title')}</h3>
              <p className="text-[#0B1929]/60 mb-8 leading-relaxed">{t('quote.success.desc')}</p>
              <Button onClick={handleReset} variant="outline" className="border-[#1E5AA8] text-[#1E5AA8] hover:bg-[#1E5AA8] hover:text-white">
                {t('quote.newQuote')}
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-8">
                {[1, 2].map((n) => (
                  <div key={n} className="flex items-center gap-3 flex-1">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all flex-shrink-0 ${
                      step === n ? 'bg-[#1E5AA8] text-white shadow-lg shadow-[#1E5AA8]/30'
                        : n === 2 && canGoToStep2 ? 'bg-[#1E5AA8]/15 text-[#1E5AA8]'
                        : 'bg-[#F6F8FB] text-[#0B1929]/30'
                    }`}>{n}</div>
                    {n === 1 && <div className={`flex-1 h-0.5 transition-all ${canGoToStep2 ? 'bg-[#1E5AA8]' : 'bg-[#E8ECF0]'}`} />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <h3 className="font-heading text-2xl text-[#0B1929] mb-0.5">
                        {locale === 'tr' ? 'Makine ve Süre Seçin' : 'Select Machine & Duration'}
                      </h3>
                      <p className="text-sm text-[#0B1929]/50 mb-5">
                        {locale === 'tr' ? 'Hangi makineye ihtiyacınız var?' : 'Which machine do you need?'}
                      </p>
                    </div>

                    {/* Machine buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {machineTypes.map((m) => (
                        <button
                          type="button" key={m.value}
                          onClick={() => setFormData((p) => ({ ...p, machineType: m.value }))}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                            formData.machineType === m.value
                              ? 'border-[#1E5AA8] bg-[#EEF3FB]'
                              : 'border-[#E8ECF0] hover:border-[#1E5AA8]/30 hover:bg-[#F6F8FB]'
                          }`}
                        >
                          <span className="text-xl">{m.icon}</span>
                          <span className={`text-sm font-semibold ${formData.machineType === m.value ? 'text-[#1E5AA8]' : 'text-[#0B1929]'}`}>
                            {locale === 'tr' ? m.labelTr : m.labelEn}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Duration */}
                    <div>
                      <Label className="text-sm font-semibold text-[#0B1929] mb-2 block">{t('quote.duration')}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {rentalDurations.map((d) => (
                          <button
                            type="button" key={d.value}
                            onClick={() => {
                              setFormData((p) => ({ ...p, duration: d.value, customDuration: '' }));
                            }}
                            className={`py-2.5 px-2 rounded-xl border-2 text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 ${
                              formData.duration === d.value
                                ? 'border-[#1E5AA8] bg-[#1E5AA8] text-white'
                                : 'border-[#E8ECF0] text-[#0B1929] hover:border-[#1E5AA8]/40'
                            }`}
                          >
                            {d.value === 'Kendim Belirleyeceğim' && <PenLine className="w-3 h-3 flex-shrink-0" />}
                            {locale === 'tr' ? d.labelTr : d.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom duration input */}
                    {isCustomDuration && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-1.5"
                      >
                        <Label className="text-sm font-semibold text-[#0B1929]">
                          {locale === 'tr' ? 'Kiralama Sürenizi Belirtin *' : 'Specify Your Rental Duration *'}
                        </Label>
                        <div className="relative">
                          <PenLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E5AA8]/60" />
                          <Input
                            placeholder={locale === 'tr' ? 'Örn: 2 hafta, 3 ay, 6 ay...' : 'E.g.: 2 weeks, 3 months, 6 months...'}
                            value={formData.customDuration}
                            onChange={(e) => setFormData((p) => ({ ...p, customDuration: e.target.value }))}
                            className="pl-10 border-[#1E5AA8]/30 bg-[#EEF3FB] focus:bg-white focus:border-[#1E5AA8]"
                            required={isCustomDuration}
                          />
                        </div>
                        <p className="text-xs text-[#0B1929]/45">
                          {locale === 'tr'
                            ? 'Fiyatlandırma görüşme ile yapılacak, ekibimiz sizi arayacaktır.'
                            : 'Pricing will be determined by negotiation, our team will call you.'}
                        </p>
                      </motion.div>
                    )}

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

                    {/* Operator */}
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
                      <Switch id="operator" checked={formData.operatorRequired}
                        onCheckedChange={(v) => setFormData((p) => ({ ...p, operatorRequired: v }))} />
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

                {/* ── STEP 2 ── */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <h3 className="font-heading text-2xl text-[#0B1929] mb-0.5">
                        {locale === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
                      </h3>
                      <p className="text-sm text-[#0B1929]/50 mb-5">
                        {locale === 'tr' ? 'Ekibimiz en kısa sürede sizinle iletişime geçecektir.' : 'Our team will contact you as soon as possible.'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.name')}</Label>
                      <Input placeholder={locale === 'tr' ? 'Adınız ve soyadınız' : 'Your full name'}
                        value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]" required />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.phone')}</Label>
                        <Input type="tel" placeholder="05XX XXX XX XX"
                          value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.email')}</Label>
                        <Input type="email" placeholder="ornek@email.com"
                          value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]" required />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-[#0B1929]">{t('quote.message')}</Label>
                      <Textarea placeholder={t('quote.message.placeholder')}
                        value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8] resize-none min-h-[90px]" />
                    </div>

                    {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg border border-red-100">{error}</p>}

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}
                        className="border-[#E8ECF0] text-[#0B1929] hover:bg-[#F6F8FB] w-12 flex-shrink-0">←</Button>
                      <Button type="submit"
                        className="flex-1 min-h-[52px] bg-[#1E5AA8] hover:bg-[#164a8a] text-white font-semibold text-base"
                        disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
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
