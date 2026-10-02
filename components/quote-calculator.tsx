'use client';

<<<<<<< HEAD
import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
=======
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
<<<<<<< HEAD
  CheckCircle2, User, Send, MapPin, ArrowRight, ArrowLeft, Wrench, Zap, PenLine, Plus,
  ShieldCheck, Clock,
} from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { machines } from '@/lib/machine-data';
import { MachineGlyph } from '@/components/machine-glyph';

// Makine seçenekleri: makine gruplarından türetilir + Diğer
const machineTypes: { value: string; labelTr: string; labelEn: string; icon: ReactNode }[] = [
  ...machines.map((m) => ({
    value: m.group,
    labelTr: m.group,
    labelEn: m.groupEn,
    icon: <MachineGlyph id={m.id} className="w-6 h-6" />,
  })),
  { value: 'Diğer', labelTr: 'Diğer', labelEn: 'Other', icon: <Plus className="w-5 h-5" /> },
=======
  CheckCircle2, Truck, User, Send, MapPin,
  ArrowRight, Wrench, Zap, PenLine,
} from 'lucide-react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

const machineTypes = [
  { value: 'Ekskavatör', labelTr: 'Ekskavatör', labelEn: 'Excavator', icon: '🚜' },
  { value: 'Mini Ekskavatör', labelTr: 'Mini Ekskavatör', labelEn: 'Mini Excavator', icon: '🔧' },
  { value: 'Forklift', labelTr: 'Forklift', labelEn: 'Forklift', icon: '🏗️' },
  { value: 'İstif Makinesi', labelTr: 'İstif Makinesi', labelEn: 'Stacker', icon: '📦' },
  { value: 'Yükleyici', labelTr: 'Yükleyici', labelEn: 'Loader', icon: '⚙️' },
  { value: 'Diğer', labelTr: 'Diğer', labelEn: 'Other', icon: '➕' },
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
];

const rentalDurations = [
  { value: '1 Gün', labelTr: '1 Gün', labelEn: '1 Day' },
  { value: '3 Gün', labelTr: '3 Gün', labelEn: '3 Days' },
  { value: '1 Hafta', labelTr: '1 Hafta', labelEn: '1 Week' },
  { value: '1 Ay', labelTr: '1 Ay', labelEn: '1 Month' },
  { value: 'Kendim Belirleyeceğim', labelTr: 'Kendim Belirleyeceğim', labelEn: 'I Will Decide' },
];

const initialForm = {
  machineType: '', duration: '', customDuration: '', location: '',
  operatorRequired: false, name: '', phone: '', email: '', message: '',
};

const features = [
<<<<<<< HEAD
  { icon: Wrench, labelTr: 'Periyodik bakımlı makineler', labelEn: 'Periodically maintained machines' },
  { icon: Zap, labelTr: 'Hızlı teslimat', labelEn: 'Fast delivery' },
  { icon: ShieldCheck, labelTr: 'Sigortalı filo', labelEn: 'Insured fleet' },
  { icon: Clock, labelTr: 'Aynı gün dönüş', labelEn: 'Same-day response' },
];

const inputCls = 'h-11 border-line bg-mist focus-visible:bg-white focus-visible:border-brand rounded-md';

export function QuoteCalculator({ defaultMachine }: { defaultMachine?: string }) {
  const { t, locale } = useLanguage();
  const tr = locale === 'tr';
  const [formData, setFormData] = useState({ ...initialForm, machineType: defaultMachine ?? '' });
=======
  { icon: Wrench, labelTr: 'Periyodik Bakım', labelEn: 'Periodic Maintenance' },
  { icon: Zap, labelTr: 'Hızlı Teslimat', labelEn: 'Fast Delivery' },
];

export function QuoteCalculator() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState(initialForm);
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  const isCustomDuration = formData.duration === 'Kendim Belirleyeceğim';
<<<<<<< HEAD
  const selectedMachine = machineTypes.find((m) => m.value === formData.machineType);
  const selectedDuration = rentalDurations.find((d) => d.value === formData.duration);
  const hasSummary = Boolean(selectedMachine || selectedDuration || formData.operatorRequired);
  const canGoToStep2 =
    formData.machineType && formData.duration && (!isCustomDuration || formData.customDuration.trim().length > 0);
=======

  const selectedMachine = machineTypes.find((m) => m.value === formData.machineType);
  const selectedDuration = rentalDurations.find((d) => d.value === formData.duration);
  const hasSummary = Boolean(selectedMachine || selectedDuration || formData.operatorRequired);

  const canGoToStep2 = formData.machineType && formData.duration &&
    (!isCustomDuration || formData.customDuration.trim().length > 0);

  const showAlert = (message: string) => {
    if (typeof window !== 'undefined') {
      window.alert(message);
    }
  };
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332

  const getApiMessage = async (res: Response, fallback: string) => {
    try {
      const data = await res.json();
      return data?.message || data?.error || fallback;
    } catch {
      return fallback;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
<<<<<<< HEAD
    const durationToSend = isCustomDuration ? `Kendim Belirleyeceğim: ${formData.customDuration}` : formData.duration;
=======
    const durationToSend = isCustomDuration
      ? `Kendim Belirleyeceğim: ${formData.customDuration}`
      : formData.duration;
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
        body: JSON.stringify({ ...formData, duration: durationToSend, formType: 'quote' }),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setError(await getApiMessage(res, t('quote.error')));
      }
    } catch {
      setError(t('quote.error'));
=======
        body: JSON.stringify({
          ...formData,
          duration: durationToSend,
          formType: 'quote',
        }),
      });

      if (res.ok) {
        const message = await getApiMessage(
          res,
          locale === 'tr'
            ? 'Teklif talebiniz başarıyla gönderildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.'
            : 'Your quote request has been sent successfully. Our team will contact you as soon as possible.',
        );
        setIsSubmitted(true);
        showAlert(message);
      } else {
        const message = await getApiMessage(res, t('quote.error'));
        setError(message);
        showAlert(message);
      }
    } catch {
      const message = t('quote.error');
      setError(message);
      showAlert(message);
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
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
<<<<<<< HEAD
    <section id="teklif" className="scroll-mt-20 relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* ── Sol — bilgi paneli ─────────────────────────────────────────── */}
        <div className="relative bg-ink text-white flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-14 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/40 via-ink to-ink" aria-hidden />
          <div className="absolute inset-0 grid-texture pointer-events-none" aria-hidden />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand/30 blur-3xl drift-slow pointer-events-none" aria-hidden />

          <Reveal className="relative max-w-lg">
            <p className="text-sm font-semibold text-brand-light mb-3">{t('quote.label')}</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">{t('quote.title')}</h2>
            <p className="mt-5 text-white/70 text-base sm:text-lg leading-relaxed">{t('quote.subtitle')}</p>

            <ul className="mt-9 grid grid-cols-1 xs:grid-cols-2 gap-3">
              {features.map((f) => (
                <li key={f.labelTr} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-md bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-brand-light" />
                  </span>
                  <span className="text-sm text-white/85 font-medium">{tr ? f.labelTr : f.labelEn}</span>
                </li>
              ))}
            </ul>

            {/* Talep özeti — sadece seçim yapılınca görünür */}
            <AnimatePresence>
              {hasSummary && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 16, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-10 rounded-xl border border-white/12 bg-white/[0.05] backdrop-blur-sm p-5 sm:p-6">
                    <p className="text-xs font-semibold text-white/50 mb-4">{tr ? 'Talep Özeti' : 'Request Summary'}</p>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      {selectedMachine && (
                        <div>
                          <dt className="text-white/45 text-xs">{t('quote.summary.machine')}</dt>
                          <dd className="text-white font-medium mt-0.5">{tr ? selectedMachine.labelTr : selectedMachine.labelEn}</dd>
                        </div>
                      )}
                      {selectedDuration && (
                        <div>
                          <dt className="text-white/45 text-xs">{t('quote.summary.duration')}</dt>
                          <dd className="text-white font-medium mt-0.5">
                            {isCustomDuration && formData.customDuration
                              ? formData.customDuration
                              : tr ? selectedDuration.labelTr : selectedDuration.labelEn}
                          </dd>
                        </div>
                      )}
                      {formData.operatorRequired && (
                        <div className="col-span-2">
                          <dt className="text-white/45 text-xs">{t('quote.summary.operator')}</dt>
                          <dd className="text-white font-medium mt-0.5 inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-brand-light" />
                            {t('quote.summary.operator.yes')}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>

        {/* ── Sağ — form ────────────────────────────────────────────────── */}
        <div className="bg-white flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-14 lg:py-20">
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 max-w-md mx-auto">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-brand" />
              </motion.div>
              <h3 className="font-heading font-bold text-3xl text-ink mb-3">{t('quote.success.title')}</h3>
              <p className="text-steel leading-relaxed">{t('quote.success.desc')}</p>
              <button
                onClick={handleReset}
                className="mt-8 inline-flex items-center justify-center h-11 px-6 rounded-md border border-brand text-brand font-semibold hover:bg-brand hover:text-white transition-colors"
              >
                {t('quote.newQuote')}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto lg:mx-0" noValidate={false}>
              {/* Adım göstergesi */}
              <ol className="flex items-center gap-3 mb-8" aria-label={tr ? 'Adımlar' : 'Steps'}>
                {[1, 2].map((n) => (
                  <li key={n} className="flex items-center gap-3 flex-1 last:flex-none">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 transition-colors ${
                        step === n
                          ? 'bg-brand text-white shadow-[0_8px_20px_-8px_rgba(30,90,168,.8)]'
                          : n === 2 && canGoToStep2 ? 'bg-brand/15 text-brand' : 'bg-mist text-ink/35'
                      }`}
                      aria-current={step === n ? 'step' : undefined}
                    >
                      {n}
                    </span>
                    {n === 1 && (
                      <span className="flex-1 h-0.5 rounded-full bg-line overflow-hidden">
                        <motion.span
                          className="block h-full bg-brand"
                          initial={false}
                          animate={{ width: canGoToStep2 ? '100%' : '0%' }}
                          transition={{ duration: 0.4 }}
                        />
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="space-y-6">
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-ink">{tr ? 'Makine ve Süre Seçin' : 'Select Machine & Duration'}</h3>
                      <p className="text-sm text-steel mt-1">{tr ? 'Hangi makineye ihtiyacınız var?' : 'Which machine do you need?'}</p>
                    </div>

                    {/* Makine seçimi — ikonlu */}
                    <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label={t('quote.machine')}>
                      {machineTypes.map((m) => {
                        const active = formData.machineType === m.value;
                        return (
                          <button
                            type="button"
                            key={m.value}
                            role="radio"
                            aria-checked={active}
                            onClick={() => setFormData((p) => ({ ...p, machineType: m.value }))}
                            className={`flex items-center gap-3 p-3 rounded-md border text-left transition-colors ${
                              active ? 'border-brand bg-brand/[0.06]' : 'border-line hover:border-brand/40 hover:bg-mist'
                            }`}
                          >
                            <span className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-colors ${active ? 'bg-brand text-white' : 'bg-mist text-ink/70'}`}>
                              {m.icon}
                            </span>
                            <span className={`text-sm font-semibold leading-tight ${active ? 'text-brand' : 'text-ink'}`}>
                              {tr ? m.labelTr : m.labelEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Süre */}
                    <div>
                      <Label className="text-sm font-semibold text-ink mb-2 block">{t('quote.duration')}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="radiogroup" aria-label={t('quote.duration')}>
                        {rentalDurations.map((d) => {
                          const active = formData.duration === d.value;
                          return (
                            <button
                              type="button"
                              key={d.value}
                              role="radio"
                              aria-checked={active}
                              onClick={() => setFormData((p) => ({ ...p, duration: d.value, customDuration: '' }))}
                              className={`min-h-11 py-2.5 px-2 rounded-md border text-xs font-semibold transition-colors text-center inline-flex items-center justify-center gap-1 ${
                                active ? 'border-brand bg-brand text-white' : 'border-line text-ink hover:border-brand/40'
                              } ${d.value === 'Kendim Belirleyeceğim' ? 'col-span-2 sm:col-span-1' : ''}`}
                            >
                              {d.value === 'Kendim Belirleyeceğim' && <PenLine className="w-3 h-3 shrink-0" />}
                              {tr ? d.labelTr : d.labelEn}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isCustomDuration && (
                        <motion.div
                          key="custom"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1.5 pb-1">
                            <Label htmlFor="q-custom" className="text-sm font-semibold text-ink">
                              {tr ? 'Kiralama sürenizi belirtin *' : 'Specify your rental duration *'}
                            </Label>
                            <div className="relative">
                              <PenLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand/60" />
                              <Input
                                id="q-custom"
                                placeholder={tr ? 'Örn: 2 hafta, 3 ay, 6 ay…' : 'E.g.: 2 weeks, 3 months, 6 months…'}
                                value={formData.customDuration}
                                onChange={(e) => setFormData((p) => ({ ...p, customDuration: e.target.value }))}
                                className={`${inputCls} pl-10`}
                                required={isCustomDuration}
                              />
                            </div>
                            <p className="text-xs text-steel">{tr ? 'Ekibimiz detayları netleştirmek için sizi arayacaktır.' : 'Our team will call you to clarify the details.'}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Lokasyon */}
                    <div className="space-y-1.5">
                      <Label htmlFor="q-location" className="text-sm font-semibold text-ink">{t('quote.location')}</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand/60" />
                        <Input
                          id="q-location"
                          placeholder={t('quote.location.placeholder')}
                          value={formData.location}
                          onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                          className={`${inputCls} pl-10`}
=======
    <SectionWrapper id="teklif" className="scroll-mt-24 py-0 relative overflow-hidden">
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

            {/* Request summary preview */}
            <AnimatePresence mode="wait">
              {hasSummary ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6"
                >
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
                    {locale === 'tr' ? 'Talep Özeti' : 'Request Summary'}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {selectedMachine && (
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">{t('quote.summary.machine')}</p>
                        <p className="text-white text-sm font-medium">
                          {selectedMachine.icon} {locale === 'tr' ? selectedMachine.labelTr : selectedMachine.labelEn}
                        </p>
                      </div>
                    )}

                    {selectedDuration && (
                      <div>
                        <p className="text-white/40 text-xs mb-0.5">{t('quote.summary.duration')}</p>
                        <p className="text-white text-sm font-medium">
                          {isCustomDuration && formData.customDuration
                            ? formData.customDuration
                            : locale === 'tr'
                              ? selectedDuration.labelTr
                              : selectedDuration.labelEn}
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
                            ? 'Ekibimiz detayları netleştirmek için sizi arayacaktır.'
                            : 'Our team will call you to clarify the details.'}
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
                        />
                      </div>
                    </div>

<<<<<<< HEAD
                    {/* Operatör */}
                    <div className={`flex items-center justify-between gap-4 p-4 rounded-md border transition-colors ${formData.operatorRequired ? 'border-brand bg-brand/[0.06]' : 'border-line bg-mist'}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-colors ${formData.operatorRequired ? 'bg-brand text-white' : 'bg-white border border-line text-ink/40'}`}>
                          <User className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <Label htmlFor="operator" className="text-sm font-semibold text-ink cursor-pointer">{t('quote.operator')}</Label>
                          <p className="text-xs text-steel">{t('quote.operator.sub')}</p>
                        </div>
                      </div>
                      <Switch id="operator" checked={formData.operatorRequired} onCheckedChange={(v) => setFormData((p) => ({ ...p, operatorRequired: v }))} />
                    </div>

                    <button
                      type="button"
                      onClick={() => canGoToStep2 && setStep(2)}
                      disabled={!canGoToStep2}
                      className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-brand text-white font-semibold hover:bg-brand-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {tr ? 'Devam Et' : 'Continue'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="space-y-5">
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-ink">{tr ? 'İletişim Bilgileri' : 'Contact Information'}</h3>
                      <p className="text-sm text-steel mt-1">{tr ? 'Ekibimiz en kısa sürede sizinle iletişime geçecektir.' : 'Our team will contact you as soon as possible.'}</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="q-name" className="text-sm font-semibold text-ink">{t('quote.name')}</Label>
                      <Input id="q-name" autoComplete="name" placeholder={tr ? 'Adınız ve soyadınız' : 'Your full name'} value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className={inputCls} required />
=======
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
<<<<<<< HEAD
                        <Label htmlFor="q-phone" className="text-sm font-semibold text-ink">{t('quote.phone')}</Label>
                        <Input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XX XXX XX XX" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={inputCls} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="q-email" className="text-sm font-semibold text-ink">{t('quote.email')}</Label>
                        <Input id="q-email" type="email" inputMode="email" autoComplete="email" placeholder="ornek@email.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className={inputCls} required />
=======
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
                      </div>
                    </div>

                    <div className="space-y-1.5">
<<<<<<< HEAD
                      <Label htmlFor="q-msg" className="text-sm font-semibold text-ink">{t('quote.message')}</Label>
                      <Textarea id="q-msg" placeholder={t('quote.message.placeholder')} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="border-line bg-mist focus-visible:bg-white focus-visible:border-brand resize-none min-h-[100px] rounded-md" />
                    </div>

                    {error && (
                      <p role="alert" className="text-red-600 text-sm bg-red-50 px-4 py-2.5 rounded-md border border-red-100">{error}</p>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-md border border-line text-ink hover:bg-mist transition-colors shrink-0"
                        aria-label={tr ? 'Geri' : 'Back'}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-md bg-brand text-white font-semibold hover:bg-brand-dark transition-colors disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                            {t('quote.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {t('quote.submit')}
                          </>
                        )}
                      </button>
=======
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
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </div>
      </div>
<<<<<<< HEAD
    </section>
=======
    </SectionWrapper>
>>>>>>> 87ec4f623f8827d5c1d997f4fada778cc5a42332
  );
}
