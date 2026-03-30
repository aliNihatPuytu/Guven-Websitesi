import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, phone, email,
      machineType, duration, location,
      operatorRequired, estimatedPrice,
      message, formType,
    } = body;

    const TO_EMAIL = 'info@guvenismakine.com';
    const isQuote = formType === 'quote';

    const subject = isQuote
      ? `Yeni Teklif Talebi — ${name}`
      : `Yeni İletişim Mesajı — ${name}`;

    const sharedStyle = `
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 620px;
      margin: 0 auto;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #E8ECF0;
    `;
    const headerStyle = `background: linear-gradient(135deg,#0B2545,#1E5AA8);padding:28px 32px;`;
    const bodyStyle = `background:#ffffff;padding:28px 32px;`;
    const rowStyle = `padding:10px 0;border-bottom:1px solid #F0F4F8;display:flex;`;
    const labelStyle = `font-weight:600;color:#4A5568;min-width:160px;font-size:14px;`;
    const valueStyle = `color:#1A202C;font-size:14px;`;

    const quoteRows = `
      <div style="${rowStyle}"><span style="${labelStyle}">Ad Soyad</span><span style="${valueStyle}">${name}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Telefon</span><span style="${valueStyle}"><a href="tel:${phone}" style="color:#1E5AA8;">${phone}</a></span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">E-posta</span><span style="${valueStyle}"><a href="mailto:${email}" style="color:#1E5AA8;">${email}</a></span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Makina Türü</span><span style="${valueStyle}">${machineType || '—'}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Kiralama Süresi</span><span style="${valueStyle}">${duration || '—'}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Proje Lokasyonu</span><span style="${valueStyle}">${location || '—'}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Operatör</span><span style="${valueStyle}">${operatorRequired ? 'Gerekli' : 'Gerekmez'}</span></div>
      ${estimatedPrice ? `<div style="${rowStyle}"><span style="${labelStyle}">Tahmini Fiyat</span><span style="color:#1E5AA8;font-weight:700;font-size:18px;">${estimatedPrice} ₺ <small style="font-size:11px;font-weight:400;color:#718096;">(KDV hariç)</small></span></div>` : ''}
      ${message ? `<div style="padding:10px 0;"><span style="${labelStyle}">Ek Mesaj</span><p style="color:#4A5568;font-size:14px;margin:6px 0 0;">${message}</p></div>` : ''}
    `;

    const contactRows = `
      <div style="${rowStyle}"><span style="${labelStyle}">Ad Soyad</span><span style="${valueStyle}">${name}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Telefon</span><span style="${valueStyle}"><a href="tel:${phone}" style="color:#1E5AA8;">${phone}</a></span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">E-posta</span><span style="${valueStyle}"><a href="mailto:${email}" style="color:#1E5AA8;">${email}</a></span></div>
      <div style="padding:10px 0;"><span style="${labelStyle}">Mesaj</span><p style="color:#4A5568;font-size:14px;margin:6px 0 0;">${message}</p></div>
    `;

    const htmlContent = `
      <div style="${sharedStyle}">
        <div style="${headerStyle}">
          <h1 style="color:white;margin:0;font-size:20px;font-weight:700;">
            ${isQuote ? '📋 Yeni Teklif Talebi' : '✉️ Yeni İletişim Mesajı'}
          </h1>
          <p style="color:rgba(255,255,255,0.65);font-size:13px;margin:6px 0 0;">
            Güven İş ve İstif Makinaları — guvenismakine.com
          </p>
        </div>
        <div style="${bodyStyle}">
          ${isQuote ? quoteRows : contactRows}
        </div>
        <div style="background:#F6F8FB;padding:16px 32px;border-top:1px solid #E8ECF0;">
          <p style="font-size:12px;color:#A0AEC0;margin:0;">
            Bu e-posta guvenismakine.com web sitesi iletişim formu aracılığıyla otomatik olarak gönderilmiştir.
          </p>
        </div>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Güven Web Sitesi <onboarding@resend.dev>',
        to: [TO_EMAIL],
        subject,
        html: htmlContent,
        replyTo: email,
      });
    } else {
      console.log('📧 EMAIL (RESEND_API_KEY not configured)');
      console.log('To:', TO_EMAIL);
      console.log('Subject:', subject);
      console.log('Body:', JSON.stringify(body, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
