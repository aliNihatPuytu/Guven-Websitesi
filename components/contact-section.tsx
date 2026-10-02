'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { useLanguage } from '@/contexts/language-context';
import { siteConfig } from '@/lib/site-config';
import { socialLinks } from '@/components/social-links';

const initialForm = { name: '', phone: '', email: '', message: '' };
const inputCls = 'h-11 border-line bg-mist focus-visible:bg-white focus-visible:border-brand rounded-md';

export function ContactSection({ showHeading = true }: { showHeading?: boolean }) {
  const { t, locale } = useLanguage();
  const tr = locale === 'tr';
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'contact' }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData(initialForm);
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        setError(await getApiMessage(res, tr ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.'));
      }
    } catch {
      setError(tr ? 'Bağlantı hatası. Lütfen tekrar deneyin.' : 'Connection error. Please try again.');
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
          {siteConfig.phones.map((p) => (
            <a key={p.href} href={p.href} className="text-sm text-ink/75 hover:text-brand transition-colors font-medium tabular-nums">
              {p.label}
            </a>
          ))}
        </div>
      ),
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: (
        <a href={`mailto:${siteConfig.email}`} className="text-sm text-ink/75 hover:text-brand transition-colors font-medium break-all">
          {siteConfig.email}
        </a>
      ),
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      content: (
        <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-ink/75 hover:text-brand transition-colors leading-relaxed">
          {siteConfig.address.street}
          <br />
          {siteConfig.address.postalCode} {siteConfig.address.district} / {siteConfig.address.city}
        </a>
      ),
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      content: (
        <p className="text-sm text-ink/75">
          {t('contact.hours.days')}
          <br />
          {t('contact.hours.time')}
        </p>
      ),
    },
  ];

  return (
    <section id="iletisim" className="section-y bg-white scroll-mt-20">
      <div className="container-x">
        {showHeading && (
          <SectionHeading kicker={t('contact.label')} title={t('contact.title')} description={t('contact.subtitle')} className="mb-12 lg:mb-16" />
        )}

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sol — bilgiler */}
          <Reveal className="lg:col-span-6 space-y-5">
            <div className="rounded-xl overflow-hidden h-[220px] sm:h-[260px] border border-line bg-mist">
              <iframe
                src={siteConfig.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteConfig.name} — ${tr ? 'Harita' : 'Map'}`}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {infoCards.map((card) => (
                <div key={card.title} className="bg-mist p-5 rounded-xl border border-line flex items-start gap-4 hover:border-brand/30 transition-colors">
                  <span className="w-10 h-10 rounded-md bg-white border border-line text-brand flex items-center justify-center shrink-0">
                    <card.icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-ink mb-1.5 text-sm">{card.title}</h3>
                    {card.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Platform bağlantıları — Instagram, YouTube, LinkedIn, Sahibinden */}
            <ul className="grid grid-cols-2 gap-2.5">
              {socialLinks.map(({ key, href, label, Icon }) => (
                <li key={key} className="w-full">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center gap-2 h-11 px-3 rounded-md bg-mist border border-line text-ink/75 text-sm font-medium hover:bg-ink hover:border-ink hover:text-white transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    {label}
                    <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-80" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sağ — form */}
          <Reveal delay={0.12} className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-line shadow-[0_30px_60px_-40px_rgba(11,25,41,.3)]">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-10 w-10 text-brand" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-ink mb-2">{t('contact.form.success.title')}</h3>
                  <p className="text-steel">{t('contact.form.success.desc')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-ink">{t('contact.form.title')}</h3>
                    <p className="text-sm text-steel mt-1">{t('contact.form.sub')}</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-name" className="text-sm font-semibold text-ink">{t('contact.form.name')}</Label>
                    <Input id="c-name" autoComplete="name" placeholder={tr ? 'Adınız ve soyadınız' : 'Your full name'} value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className={inputCls} required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone" className="text-sm font-semibold text-ink">{t('contact.form.phone')}</Label>
                      <Input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XX XXX XX XX" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={inputCls} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email" className="text-sm font-semibold text-ink">{t('contact.form.email')}</Label>
                      <Input id="c-email" type="email" inputMode="email" autoComplete="email" placeholder="ornek@email.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className={inputCls} required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-msg" className="text-sm font-semibold text-ink">{t('contact.form.message')}</Label>
                    <Textarea id="c-msg" placeholder={tr ? 'Mesajınızı yazın…' : 'Write your message…'} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="border-line bg-mist focus-visible:bg-white focus-visible:border-brand resize-none min-h-[130px] rounded-md" required />
                  </div>

                  {error && <p role="alert" className="text-red-600 text-sm bg-red-50 px-4 py-2.5 rounded-md border border-red-100">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-brand text-white font-semibold hover:bg-brand-dark transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>
                  <p className="text-xs text-steel text-center">{siteConfig.email}</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
