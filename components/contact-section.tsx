'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import { SectionWrapper, FadeIn, SlideIn } from '@/components/ui/section-wrapper';

// Phone numbers — add/remove entries here easily
const phoneNumbers = [
  { number: '0 (216) 314 12 94', href: 'tel:+902163141294' },
  { number: '0 (532) 297 58 13', href: 'tel:+905322975813' },
  // Add additional phone numbers below:
  // { number: '0 (5XX) XXX XX XX', href: 'tel:+90XXXXXXXXXX' },
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
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin veya bizi telefonla arayın.');
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="iletisim" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-medium text-[#1E5AA8] tracking-widest uppercase">
            İletişim
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2B2B2B] mt-3">
            Bizimle İletişime Geçin
          </h2>
          <p className="mt-4 text-lg text-[#2B2B2B]/60 max-w-2xl mx-auto">
            Sorularınız ve talepleriniz için bize ulaşın. En kısa sürede yanıt veririz.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info + Map */}
          <SlideIn direction="left">
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="bg-[#F6F8FB] p-5 rounded-xl border border-[#E8ECF0] sm:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1E5AA8] flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#2B2B2B] mb-2">Telefon</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        {phoneNumbers.map((p) => (
                          <a
                            key={p.href}
                            href={p.href}
                            className="text-sm text-[#2B2B2B]/70 hover:text-[#1E5AA8] transition-colors font-medium"
                          >
                            {p.number}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-[#F6F8FB] p-5 rounded-xl border border-[#E8ECF0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E5AA8] flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2B2B2B] mb-1">E-posta</h3>
                      <a href="mailto:info@guvenismakina.com" className="text-sm text-[#2B2B2B]/70 hover:text-[#1E5AA8] transition-colors">
                        info@guvenismakina.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-[#F6F8FB] p-5 rounded-xl border border-[#E8ECF0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E5AA8] flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2B2B2B] mb-1">Çalışma Saatleri</h3>
                      <p className="text-sm text-[#2B2B2B]/70">Pzt – Cmt: 08:00 – 18:00</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-[#F6F8FB] p-5 rounded-xl border border-[#E8ECF0] sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E5AA8] flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2B2B2B] mb-1">Adres</h3>
                      <p className="text-sm text-[#2B2B2B]/70">
                        Esenşehir Mahallesi, Gündeş Sokak No:14<br />
                        34776 Ümraniye / İstanbul
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden h-[260px] shadow-md border border-[#E8ECF0]">
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
            </div>
          </SlideIn>

          {/* Right: Contact Form */}
          <SlideIn direction="right" delay={0.2}>
            <div className="bg-[#F6F8FB] p-8 rounded-2xl border border-[#E8ECF0]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-[#EEF3FB] flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-10 w-10 text-[#1E5AA8]" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#2B2B2B] mb-3">Mesajınız Alındı!</h3>
                  <p className="text-[#2B2B2B]/65 leading-relaxed">
                    En kısa sürede sizinle iletişime geçeceğiz.<br />Bizi tercih ettiğiniz için teşekkür ederiz.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-heading text-2xl text-[#2B2B2B] mb-1">Bize Ulaşın</h3>
                    <p className="text-sm text-[#2B2B2B]/50">Formu doldurun, size hemen dönelim.</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-name" className="text-sm font-medium text-[#2B2B2B]">Ad Soyad *</Label>
                    <Input
                      id="c-name"
                      placeholder="Adınız ve soyadınız"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="bg-white border-[#E8ECF0] focus:border-[#1E5AA8] h-11"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone" className="text-sm font-medium text-[#2B2B2B]">Telefon *</Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="bg-white border-[#E8ECF0] focus:border-[#1E5AA8] h-11"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email" className="text-sm font-medium text-[#2B2B2B]">E-posta *</Label>
                      <Input
                        id="c-email"
                        type="email"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="bg-white border-[#E8ECF0] focus:border-[#1E5AA8] h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-message" className="text-sm font-medium text-[#2B2B2B]">Mesaj *</Label>
                    <Textarea
                      id="c-message"
                      placeholder="Mesajınızı yazın..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="bg-white border-[#E8ECF0] focus:border-[#1E5AA8] resize-none min-h-[130px]"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">{error}</div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-[52px] bg-[#1E5AA8] hover:bg-[#164a8a] text-white text-base"
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
