import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      machineType,
      duration,
      location,
      operatorRequired,
      estimatedPrice,
      message,
      formType,
    } = body;

    const TO_EMAIL = 'info@guvenismakina.com';
    const isQuote = formType === 'quote';

    const subject = isQuote
      ? `Yeni Teklif Talebi - ${name}`
      : `Yeni İletişim Mesajı - ${name}`;

    const htmlContent = isQuote
      ? `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1E5AA8; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Yeni Teklif Talebi</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Ad Soyad</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">E-posta</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">Makina Türü</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${machineType || '-'}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">Kiralama Süresi</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${duration || '-'}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">Lokasyon</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${location || '-'}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">Operatör</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${operatorRequired ? 'Gerekli' : 'Gerekmez'}</td></tr>
              ${estimatedPrice ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">Tahmini Fiyat</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee; color: #1E5AA8; font-weight: bold;">${estimatedPrice} ₺ (KDV hariç)</td></tr>` : ''}
              ${message ? `<tr><td style="padding: 10px 8px; font-weight: bold;">Ek Mesaj</td><td style="padding: 10px 8px;">${message}</td></tr>` : ''}
            </table>
          </div>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1E5AA8; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Yeni İletişim Mesajı</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Ad Soyad</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
              <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eee; font-weight: bold;">E-posta</td><td style="padding: 10px 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 10px 8px; font-weight: bold;">Mesaj</td><td style="padding: 10px 8px;">${message}</td></tr>
            </table>
          </div>
        </div>
      `;

    // Try Resend if API key available
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
      // Dev fallback
      console.log('📧 EMAIL (no RESEND_API_KEY configured)');
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
