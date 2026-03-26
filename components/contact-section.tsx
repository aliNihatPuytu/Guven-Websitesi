'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import { SectionWrapper, FadeIn, SlideIn } from '@/components/ui/section-wrapper';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    details: ['0 (216) 314 12 94', '0 (532) 297 58 13'],
    href: ['tel:+902163141294', 'tel:+905322975813'],
  },
  {
    icon: Mail,
    title: 'E-posta',
    details: ['info@guvenismakina.com'],
    href: ['mailto:info@guvenismakina.com'],
  },
  {
    icon: MapPin,
    title: 'Adres',
    details: ['Esenşehir Mahallesi, Gündeş Sokak No:14', '34776 Ümraniye / İstanbul'],
    href: [null, null],
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    details: ['Pazartesi - Cumartesi', '08:00 - 18:00'],
    href: [null, null],
  },
];

const initialForm = { name: '', phone: '', email: '', message: '' };

export function ContactSection() {
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
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="iletisim" className="py-24 lg:py-32 bg-[#F2F1ED]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
            İletişim
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] mt-3">
            Bizimle İletişime Geçin
          </h2>
          <p className="mt-4 text-lg text-[#2B2B2B]/70 max-w-2xl mx-auto">
            Sorularınız için bizimle iletişime geçin veya şirketimizi ziyaret edin.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Map + Contact Info */}
          <SlideIn direction="left">
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-lg overflow-hidden h-[280px] shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.271!2d29.10588!3d41.01789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac97e5b45b5b5%3A0x0!2sG%C3%BCnde%C5%9F+Sk.+No%3A14%2C+Esen%C5%9Fehir%2C+34776+%C3%9Cmraniye%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Güven İş ve İstif Makinaları Konum"
                />
              </div>

              {/* Contact Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="bg-white p-5 rounded-lg border border-[#E5E5E5] flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-[#1E5AA8]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2B2B2B] mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        info.href[i] ? (
                          <a
                            key={detail}
                            href={info.href[i]!}
                            className="block text-sm text-[#2B2B2B]/70 hover:text-[#1E5AA8] transition-colors"
                          >
                            {detail}
                          </a>
                        ) : (
                          <p key={detail} className="text-sm text-[#2B2B2B]/70">{detail}</p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>

          {/* Right: Contact Form */}
          <SlideIn direction="right" delay={0.2}>
            <div className="bg-white p-8 rounded-lg border border-[#E5E5E5] shadow-sm">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EEF3FB] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-[#1E5AA8]" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#2B2B2B] mb-2">Mesajınız Alındı!</h3>
                  <p className="text-[#2B2B2B]/70">En kısa sürede sizinle iletişime geçeceğiz.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-heading text-2xl text-[#2B2B2B]">Bize Ulaşın</h3>

                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-sm font-medium text-[#2B2B2B]">Ad Soyad *</Label>
                    <Input
                      id="contact-name"
                      placeholder="Adınız ve soyadınız"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="border-[#E5E5E5] focus:border-[#1E5AA8]"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-sm font-medium text-[#2B2B2B]">Telefon *</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="border-[#E5E5E5] focus:border-[#1E5AA8]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-sm font-medium text-[#2B2B2B]">E-posta *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="border-[#E5E5E5] focus:border-[#1E5AA8]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-sm font-medium text-[#2B2B2B]">Mesaj *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Mesajınızı yazın..."
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="border-[#E5E5E5] focus:border-[#1E5AA8] resize-none min-h-[120px]"
                      required
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-[52px] bg-[#1E5AA8] hover:bg-[#164a8a] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Gönderiliyor...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Gönder
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
