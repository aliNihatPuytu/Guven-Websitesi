'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, ExternalLink } from 'lucide-react';
import { SectionWrapper, FadeIn, SlideIn } from '@/components/ui/section-wrapper';
import { useLanguage } from '@/contexts/language-context';

// ─── Telefon numaraları ────────────────────────────────────────────────────────
const phoneNumbers = [
  { number: '0 (216) 314 12 94', href: 'tel:+902163141294' },
  { number: '0 (532) 297 58 13', href: 'tel:+905322975813' },
  { number: '0 (531) 697 36 90', href: 'tel:+905316973690' },
];

const platformLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/guvenismakine?igsh=MTU0bzhweGY2OGw3bg==',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    colorClass: 'hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045]',
  },
  {
    label: 'Sahibinden.com',
    href: 'https://guvenismakine.sahibinden.com/',
    icon: <ExternalLink className="w-5 h-5" />,
    colorClass: 'hover:bg-[#FF6600]',
  },
];

const initialForm = { name: '', phone: '', email: '', message: '' };

export function ContactSection() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'contact' }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData(initialForm);
        setTimeout(() => setIsSubmitted(false), 7000);
      } else {
        setError(locale === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.');
      }
    } catch {
      setError(locale === 'tr' ? 'Bağlantı hatası. Lütfen tekrar deneyin.' : 'Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoCards = [
    {
      icon: Phone,
      title: t('contact.phone'),
      content: (
        <div className="flex flex-col gap-1">
          {phoneNumbers.map((p) => (
            <a key={p.href} href={p.href} className="text-sm text-[#0B1929]/65 hover:text-[#1E5AA8] transition-colors font-medium">
              {p.number}
            </a>
          ))}
        </div>
      ),
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: (
        <a href="mailto:info@guvenismakine.com" className="text-sm text-[#0B1929]/65 hover:text-[#1E5AA8] transition-colors font-medium">
          info@guvenismakine.com
        </a>
      ),
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      content: (
        <p className="text-sm text-[#0B1929]/65 leading-relaxed">
          Esenşehir Mah., Gündeş Sk. No:14<br />34776 Ümraniye / İstanbul
        </p>
      ),
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      content: (
        <>
          <p className="text-sm text-[#0B1929]/65">{t('contact.hours.days')}</p>
          <p className="text-sm text-[#0B1929]/65">{t('contact.hours.time')}</p>
        </>
      ),
    },
  ];

  return (
    <SectionWrapper id="iletisim" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">{t('contact.label')}</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0B1929] mt-3">{t('contact.title')}</h2>
          <p className="mt-4 text-lg text-[#0B1929]/60 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <SlideIn direction="left">
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden h-[240px] shadow-lg border border-[#E8ECF0]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.271!2d29.10588!3d41.01789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac97e5b45b5b5%3A0x0!2sG%C3%BCnde%C5%9F+Sk.+No%3A14%2C+Esen%C5%9Fehir%2C+34776+%C3%9Cmraniye%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Güven İş ve İstif Makinaları"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {infoCards.map((card) => (
                  <div key={card.title} className="bg-[#F6F8FB] p-5 rounded-xl border border-[#E8ECF0] flex items-start gap-4 hover:border-[#1E5AA8]/25 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#1E5AA8]/10 flex items-center justify-center flex-shrink-0">
                      <card.icon className="h-5 w-5 text-[#1E5AA8]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0B1929] mb-1.5 text-sm">{card.title}</h3>
                      {card.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform links */}
              <div className="flex items-center gap-3">
                {platformLinks.map((pl) => (
                  <a
                    key={pl.label}
                    href={pl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F6F8FB] border border-[#E8ECF0] text-[#0B1929]/60 transition-all ${pl.colorClass} hover:text-white hover:border-transparent text-sm font-medium`}
                  >
                    {pl.icon}
                    {pl.label}
                  </a>
                ))}
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <div className="bg-white p-8 rounded-2xl border border-[#E8ECF0] shadow-sm">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#1E5AA8]/8 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-10 w-10 text-[#1E5AA8]" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#0B1929] mb-2">{t('contact.form.success.title')}</h3>
                  <p className="text-[#0B1929]/60">{t('contact.form.success.desc')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-heading text-2xl text-[#0B1929] mb-1">{t('contact.form.title')}</h3>
                    <p className="text-sm text-[#0B1929]/50">{t('contact.form.sub')}</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-name" className="text-sm font-semibold text-[#0B1929]">{t('contact.form.name')}</Label>
                    <Input id="c-name" placeholder={locale === 'tr' ? 'Adınız ve soyadınız' : 'Your full name'} value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]" required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone" className="text-sm font-semibold text-[#0B1929]">{t('contact.form.phone')}</Label>
                      <Input id="c-phone" type="tel" placeholder="05XX XXX XX XX" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email" className="text-sm font-semibold text-[#0B1929]">{t('contact.form.email')}</Label>
                      <Input id="c-email" type="email" placeholder="ornek@email.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8]" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-msg" className="text-sm font-semibold text-[#0B1929]">{t('contact.form.message')}</Label>
                    <Textarea id="c-msg" placeholder={locale === 'tr' ? 'Mesajınızı yazın...' : 'Write your message...'} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="border-[#E8ECF0] bg-[#F6F8FB] focus:bg-white focus:border-[#1E5AA8] resize-none min-h-[120px]" required />
                  </div>

                  {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg border border-red-100">{error}</p>}

                  <Button type="submit" size="lg" className="w-full min-h-[52px] bg-[#1E5AA8] hover:bg-[#164a8a] text-white font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                        {t('contact.form.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {t('contact.form.submit')} — info@guvenismakine.com
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </SlideIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
