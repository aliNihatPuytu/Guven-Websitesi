import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_TO_EMAIL = 'info@guvenismakine.com';
const DEFAULT_FROM_EMAIL = 'Güven Web Sitesi <noreply@guvenismakine.com>';

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  machineType?: string;
  duration?: string;
  location?: string;
  operatorRequired?: boolean;
  message?: string;
  formType?: 'quote' | 'contact' | string;
};

function cleanEnv(value: string | undefined) {
  if (!value) return '';

  const trimmed = value.trim();
  const isQuoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));

  return isQuoted ? trimmed.slice(1, -1).trim() : trimmed;
}

function getEnv(...names: string[]) {
  for (const name of names) {
    const value = cleanEnv(process.env[name]);
    if (value) return value;
  }

  return '';
}

function isValidEmail(email: unknown) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function asText(value: unknown, fallback = '—') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function escapeHtml(value: unknown) {
  return asText(value, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createSubmissionFields(body: ContactBody) {
  const isQuote = body.formType === 'quote';
  const subject = isQuote
    ? `Yeni Teklif Talebi — ${asText(body.name, 'İsimsiz')}`
    : `Yeni İletişim Mesajı — ${asText(body.name, 'İsimsiz')}`;

  const fields: Record<string, string> = {
    'Form Türü': isQuote ? 'Teklif Talebi' : 'İletişim Formu',
    'Ad Soyad': asText(body.name),
    Telefon: asText(body.phone),
    'E-posta': asText(body.email),
    Mesaj: asText(body.message, ''),
    'Gönderim Tarihi': new Date().toLocaleString('tr-TR', {
      timeZone: 'Europe/Istanbul',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    Site: 'guvenismakine.com',
  };

  if (isQuote) {
    fields['Makina Türü'] = asText(body.machineType);
    fields['Kiralama Süresi'] = asText(body.duration);
    fields['Proje Lokasyonu'] = asText(body.location);
    fields.Operatör = body.operatorRequired ? 'Gerekli' : 'Gerekmez';
  }

  return { isQuote, subject, fields };
}

function createPlainText(fields: Record<string, string>) {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}

function createHtml(subject: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#0b1929;width:190px;vertical-align:top;">${escapeHtml(key)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#334155;white-space:pre-line;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  return `
    <!doctype html>
    <html lang="tr">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(subject)}</title>
      </head>
      <body style="margin:0;padding:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
          <div style="background:#ffffff;border:1px solid #e8ecf0;border-radius:18px;overflow:hidden;">
            <div style="background:#1E5AA8;padding:24px 28px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;line-height:1.35;">${escapeHtml(subject)}</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,.8);font-size:14px;">guvenismakine.com form bildirimi</p>
            </div>
            <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
              ${rows}
            </table>
            <div style="padding:18px 28px;color:#64748b;font-size:13px;background:#f8fafc;">
              Bu e-posta guvenismakine.com üzerindeki formdan otomatik oluşturulmuştur.
            </div>
          </div>
        </div>
      </body>
    </html>`;
}

function createResendErrorMessage(error: unknown) {
  const rawMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error && 'message' in error
        ? String(error.message)
        : String(error || 'Bilinmeyen Resend hatası');

  const lower = rawMessage.toLowerCase();

  if (lower.includes('api key') || lower.includes('unauthorized') || lower.includes('401')) {
    return 'Mail gönderilemedi. RESEND_API_KEY hatalı veya Vercel Production ortamına eklenmemiş görünüyor. API key değerini kontrol edip yeniden deploy edin.';
  }

  if (lower.includes('domain') || lower.includes('verify') || lower.includes('validation') || lower.includes('sender')) {
    return 'Mail gönderilemedi. Resend içinde guvenismakine.com domaini doğrulanmalı ve RESEND_FROM doğrulanmış domaine ait olmalı. Domain DNS kayıtlarını tamamlayıp yeniden deneyin.';
  }

  return `Mail gönderilemedi. Resend hatası: ${rawMessage}`;
}

async function sendWithResend(body: ContactBody, subject: string, fields: Record<string, string>) {
  const apiKey = getEnv('RESEND_API_KEY');
  const toEmail = getEnv('MAIL_TO', 'RESEND_TO', 'CONTACT_TO_EMAIL') || DEFAULT_TO_EMAIL;
  const fromEmail = getEnv('RESEND_FROM', 'MAIL_FROM') || DEFAULT_FROM_EMAIL;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY eksik. Vercel Environment Variables alanına RESEND_API_KEY ekleyip yeniden deploy edin.');
  }

  const resend = new Resend(apiKey);
  const replyTo = isValidEmail(body.email) ? body.email!.trim() : undefined;

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo,
    subject,
    html: createHtml(subject, fields),
    text: createPlainText(fields),
  });

  if (error) {
    throw new Error(error.message || JSON.stringify(error));
  }

  return data;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    if (!body.name || !body.phone || !isValidEmail(body.email)) {
      return NextResponse.json(
        {
          error: 'INVALID_FORM_FIELDS',
          message: 'Lütfen ad soyad, telefon ve geçerli e-posta alanlarını doldurun.',
        },
        { status: 400 },
      );
    }

    const { isQuote, subject, fields } = createSubmissionFields(body);
    const result = await sendWithResend(body, subject, fields);

    return NextResponse.json({
      success: true,
      provider: 'resend',
      id: result?.id,
      message: isQuote
        ? 'Teklif talebiniz başarıyla gönderildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.'
        : 'Mesajınız başarıyla gönderildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
    });
  } catch (error) {
    console.error('Resend mail gönderim hatası:', error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        error: 'RESEND_MAIL_FAILED',
        message: createResendErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
