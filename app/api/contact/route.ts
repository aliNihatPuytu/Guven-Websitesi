import { NextRequest, NextResponse } from 'next/server';
import net from 'node:net';
import tls from 'node:tls';
import { Buffer } from 'node:buffer';

export const runtime = 'nodejs';

type SmtpMail = {
  fromName: string;
  fromEmail: string;
  envelopeFrom?: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

const DEFAULT_TO_EMAIL = 'info@guvenismakine.com';

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function encodeHeader(value: string) {
  const cleanValue = sanitizeHeader(value);
  return /[^\x20-\x7E]/.test(cleanValue)
    ? `=?UTF-8?B?${Buffer.from(cleanValue, 'utf8').toString('base64')}?=`
    : cleanValue;
}

function formatAddress(name: string, email: string) {
  return `${encodeHeader(name)} <${sanitizeHeader(email)}>`;
}

function isValidEmail(email: unknown) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getSmtpConfig(toEmail: string): SmtpConfig | null {
  const pass =
    process.env.SMTP_PASS ||
    process.env.SMTP_PASSWORD ||
    process.env.TITAN_SMTP_PASSWORD ||
    process.env.TITAN_PASSWORD ||
    '';

  if (!pass) return null;

  const port = Number(process.env.SMTP_PORT || process.env.TITAN_SMTP_PORT || 465);
  const secureValue = String(
    process.env.SMTP_SECURE ||
      process.env.TITAN_SMTP_SECURE ||
      (port === 465 ? 'true' : 'false'),
  ).toLowerCase();

  return {
    host: process.env.SMTP_HOST || process.env.TITAN_SMTP_HOST || 'smtp.titan.email',
    port,
    secure: secureValue === 'true' || secureValue === '1' || secureValue === 'yes',
    user:
      process.env.SMTP_USER ||
      process.env.SMTP_USERNAME ||
      process.env.TITAN_SMTP_USER ||
      process.env.TITAN_EMAIL ||
      toEmail,
    pass,
  };
}

async function sendSmtpMail(config: SmtpConfig, mail: SmtpMail) {
  let socket: net.Socket | tls.TLSSocket;

  const connectOptions = {
    host: config.host,
    port: config.port,
    servername: config.host,
  };

  socket = await new Promise<net.Socket | tls.TLSSocket>((resolve, reject) => {
    const client = config.secure ? tls.connect(connectOptions) : net.connect(connectOptions);

    const cleanup = () => {
      client.off('error', onError);
      client.off('timeout', onTimeout);
      client.off('connect', onConnect);
      client.off('secureConnect', onConnect);
    };

    const onConnect = () => {
      cleanup();
      resolve(client);
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onTimeout = () => {
      cleanup();
      reject(new Error('SMTP connection timeout'));
    };

    client.setTimeout(30000);
    client.once(config.secure ? 'secureConnect' : 'connect', onConnect);
    client.once('error', onError);
    client.once('timeout', onTimeout);
  });

  const readResponse = () =>
    new Promise<string>((resolve, reject) => {
      let response = '';

      const cleanup = () => {
        socket.off('data', onData);
        socket.off('error', onError);
        socket.off('timeout', onTimeout);
      };

      const onData = (chunk: Buffer) => {
        response += chunk.toString('utf8');
        const lines = response.split(/\r?\n/).filter(Boolean);
        const lastLine = lines[lines.length - 1] || '';

        if (/^\d{3} /.test(lastLine)) {
          cleanup();
          resolve(response);
        }
      };

      const onError = (error: Error) => {
        cleanup();
        reject(error);
      };

      const onTimeout = () => {
        cleanup();
        reject(new Error('SMTP response timeout'));
      };

      socket.on('data', onData);
      socket.once('error', onError);
      socket.once('timeout', onTimeout);
    });

  const command = async (line: string, expectedCodes: number[] = [250], logLabel = line) => {
    socket.write(`${line}\r\n`);
    const response = await readResponse();
    const code = Number(response.slice(0, 3));

    if (!expectedCodes.includes(code)) {
      throw new Error(`SMTP command failed (${logLabel}): ${response}`);
    }

    return response;
  };

  try {
    await readResponse();
    let ehloResponse = await command('EHLO guvenismakine.com');

    if (!config.secure && /STARTTLS/i.test(ehloResponse)) {
      await command('STARTTLS', [220]);
      socket = await new Promise<tls.TLSSocket>((resolve, reject) => {
        const secureSocket = tls.connect({
          socket,
          servername: config.host,
        });

        secureSocket.setTimeout(30000);
        secureSocket.once('secureConnect', () => resolve(secureSocket));
        secureSocket.once('error', reject);
      });
      ehloResponse = await command('EHLO guvenismakine.com');
    }

    if (!/AUTH/i.test(ehloResponse)) {
      throw new Error('SMTP server does not advertise AUTH support.');
    }

    await command('AUTH LOGIN', [334]);
    await command(Buffer.from(config.user, 'utf8').toString('base64'), [334], 'AUTH USER');
    await command(Buffer.from(config.pass, 'utf8').toString('base64'), [235], 'AUTH PASS');

    await command(`MAIL FROM:<${mail.envelopeFrom || mail.fromEmail}>`);

    for (const recipient of mail.to) {
      await command(`RCPT TO:<${recipient}>`, [250, 251]);
    }

    await command('DATA', [354]);

    const boundary = `----=_GuvenForm_${Date.now()}`;
    const headers = [
      `From: ${formatAddress(mail.fromName, mail.fromEmail)}`,
      `To: ${mail.to.join(', ')}`,
      mail.replyTo ? `Reply-To: ${sanitizeHeader(mail.replyTo)}` : '',
      `Subject: ${encodeHeader(mail.subject)}`,
      `Date: ${new Date().toUTCString()}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ].filter(Boolean);

    const message = [
      ...headers,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      mail.text,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      mail.html,
      '',
      `--${boundary}--`,
      '',
    ]
      .join('\r\n')
      .replace(/^\./gm, '..');

    socket.write(`${message}\r\n.\r\n`);
    const dataResponse = await readResponse();
    const dataCode = Number(dataResponse.slice(0, 3));

    if (dataCode !== 250) {
      throw new Error(`SMTP DATA failed: ${dataResponse}`);
    }

    await command('QUIT', [221]);
  } finally {
    socket.end();
  }
}

async function sendSmtpMailWithFallback(config: SmtpConfig, mail: SmtpMail) {
  const candidates: SmtpConfig[] = [config];

  // Titan genelde 465 SSL ile çalışır; bazı serverless ortamlarda 587 STARTTLS daha stabil olabilir.
  const fallbackConfigs: SmtpConfig[] = [
    { ...config, port: 465, secure: true },
    { ...config, port: 587, secure: false },
  ];

  for (const fallbackConfig of fallbackConfigs) {
    if (!candidates.some((item) => item.port === fallbackConfig.port && item.secure === fallbackConfig.secure)) {
      candidates.push(fallbackConfig);
    }
  }

  let lastError: unknown;

  for (const candidate of candidates) {
    try {
      await sendSmtpMail(candidate, mail);
      return;
    } catch (error) {
      lastError = error;
      console.error(
        `SMTP send failed on ${candidate.host}:${candidate.port} secure=${candidate.secure}`,
        error instanceof Error ? error.message : error,
      );
    }
  }

  throw lastError instanceof Error ? lastError : new Error('SMTP send failed');
}

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

    if (!name || !phone || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Missing or invalid form fields' }, { status: 400 });
    }

    const TO_EMAIL = process.env.MAIL_TO || process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
    const FROM_EMAIL = process.env.MAIL_FROM || process.env.SMTP_FROM || TO_EMAIL;
    const FROM_NAME = process.env.MAIL_FROM_NAME || 'Güven Web Sitesi';
    const isQuote = formType === 'quote';

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMachineType = escapeHtml(machineType || '—');
    const safeDuration = escapeHtml(duration || '—');
    const safeLocation = escapeHtml(location || '—');
    const safeMessage = escapeHtml(message || '');
    const safeEstimatedPrice = escapeHtml(estimatedPrice || 'Belirlenecek');

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
    const headerStyle = 'background: linear-gradient(135deg,#0B2545,#1E5AA8);padding:28px 32px;';
    const bodyStyle = 'background:#ffffff;padding:28px 32px;';
    const rowStyle = 'padding:10px 0;border-bottom:1px solid #F0F4F8;display:flex;';
    const labelStyle = 'font-weight:600;color:#4A5568;min-width:160px;font-size:14px;';
    const valueStyle = 'color:#1A202C;font-size:14px;';

    const priceRow = estimatedPrice
      ? `<div style="${rowStyle}"><span style="${labelStyle}">Tahmini Fiyat</span><span style="color:#1E5AA8;font-weight:700;font-size:18px;">${safeEstimatedPrice}${estimatedPrice === 'Belirlenecek' ? '' : ' ₺'} <small style="font-size:11px;font-weight:400;color:#718096;">${estimatedPrice === 'Belirlenecek' ? '' : '(KDV hariç)'}</small></span></div>`
      : '';

    const quoteRows = `
      <div style="${rowStyle}"><span style="${labelStyle}">Ad Soyad</span><span style="${valueStyle}">${safeName}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Telefon</span><span style="${valueStyle}"><a href="tel:${safePhone}" style="color:#1E5AA8;">${safePhone}</a></span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">E-posta</span><span style="${valueStyle}"><a href="mailto:${safeEmail}" style="color:#1E5AA8;">${safeEmail}</a></span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Makina Türü</span><span style="${valueStyle}">${safeMachineType}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Kiralama Süresi</span><span style="${valueStyle}">${safeDuration}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Proje Lokasyonu</span><span style="${valueStyle}">${safeLocation}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Operatör</span><span style="${valueStyle}">${operatorRequired ? 'Gerekli' : 'Gerekmez'}</span></div>
      ${priceRow}
      ${message ? `<div style="padding:10px 0;"><span style="${labelStyle}">Ek Mesaj</span><p style="color:#4A5568;font-size:14px;margin:6px 0 0;">${safeMessage}</p></div>` : ''}
    `;

    const contactRows = `
      <div style="${rowStyle}"><span style="${labelStyle}">Ad Soyad</span><span style="${valueStyle}">${safeName}</span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">Telefon</span><span style="${valueStyle}"><a href="tel:${safePhone}" style="color:#1E5AA8;">${safePhone}</a></span></div>
      <div style="${rowStyle}"><span style="${labelStyle}">E-posta</span><span style="${valueStyle}"><a href="mailto:${safeEmail}" style="color:#1E5AA8;">${safeEmail}</a></span></div>
      <div style="padding:10px 0;"><span style="${labelStyle}">Mesaj</span><p style="color:#4A5568;font-size:14px;margin:6px 0 0;">${safeMessage}</p></div>
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

    const textContent = stripHtml(htmlContent);
    const smtpConfig = getSmtpConfig(TO_EMAIL);

    if (smtpConfig) {
      const smtpFromEmail = FROM_EMAIL || smtpConfig.user;

      try {
        await sendSmtpMailWithFallback(smtpConfig, {
          fromName: FROM_NAME,
          fromEmail: smtpFromEmail,
          envelopeFrom: smtpConfig.user,
          to: [TO_EMAIL],
          replyTo: isValidEmail(email) ? String(email).trim() : undefined,
          subject,
          html: htmlContent,
          text: textContent,
        });
      } catch (error) {
        console.error('Titan SMTP gönderim hatası:', error instanceof Error ? error.message : error);
        return NextResponse.json(
          {
            error: 'SMTP_SEND_FAILED',
            message:
              'Mail gönderilemedi. Titan SMTP kullanıcı adı, şifre ve Vercel Environment Variables ayarlarını kontrol edin.',
          },
          { status: 500 },
        );
      }
    } else if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        subject,
        html: htmlContent,
        replyTo: email,
      });
    } else {
      console.error('SMTP configuration is missing. Set SMTP_PASS / TITAN_SMTP_PASSWORD in Vercel.');
      return NextResponse.json(
        {
          error: 'SMTP_NOT_CONFIGURED',
          message:
            'Mail gönderilemedi. Vercel Environment Variables alanına SMTP_USER ve SMTP_PASS değerlerini ekleyip yeniden deploy edin.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: 'Mesaj başarıyla gönderildi.' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        error: 'FAILED_TO_SEND',
        message: 'Mail gönderimi sırasında beklenmeyen bir hata oluştu.',
      },
      { status: 500 },
    );
  }
}
