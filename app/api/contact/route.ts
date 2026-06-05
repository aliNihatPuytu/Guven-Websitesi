import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const DEFAULT_TO_EMAIL = 'info@guvenismakine.com';
const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/ajax';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  machineType?: string;
  duration?: string;
  location?: string;
  operatorRequired?: boolean;
  estimatedPrice?: string;
  message?: string;
  formType?: 'quote' | 'contact' | string;
};

type ProviderResult = {
  provider: 'web3forms' | 'formsubmit';
  response?: unknown;
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

async function readProviderResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json().catch(() => null);
  }

  return response.text().catch(() => '');
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
    fields['Tahmini Fiyat'] = asText(body.estimatedPrice, 'Belirlenecek');
  }

  return { isQuote, subject, fields };
}

async function sendWithWeb3Forms(body: ContactBody, subject: string, fields: Record<string, string>) {
  const accessKey = getEnv('WEB3FORMS_ACCESS_KEY', 'NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY');

  if (!accessKey) {
    throw new Error('WEB3FORMS_ACCESS_KEY eksik.');
  }

  const payload = {
    access_key: accessKey,
    subject,
    from_name: 'Güven Web Sitesi',
    name: asText(body.name),
    email: asText(body.email),
    phone: asText(body.phone),
    message: Object.entries(fields)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
    ...fields,
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const result = await readProviderResponse(response);

  if (!response.ok || (typeof result === 'object' && result && 'success' in result && result.success === false)) {
    const message =
      typeof result === 'object' && result && 'message' in result
        ? String(result.message)
        : `Web3Forms gönderimi başarısız oldu. HTTP ${response.status}`;

    throw new Error(message);
  }

  return result;
}

async function sendWithFormSubmit(
  body: ContactBody,
  toEmail: string,
  subject: string,
  fields: Record<string, string>,
) {
  const formData = new URLSearchParams();

  formData.set('_subject', subject);
  formData.set('_template', 'table');
  formData.set('_captcha', 'false');
  formData.set('_replyto', asText(body.email, toEmail));
  formData.set('_blacklist', 'casino,bitcoin,crypto,loan,porn,viagra');

  Object.entries(fields).forEach(([key, value]) => {
    formData.set(key, value);
  });

  const response = await fetch(`${FORM_SUBMIT_ENDPOINT}/${encodeURIComponent(toEmail)}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formData.toString(),
    cache: 'no-store',
  });

  const result = await readProviderResponse(response);

  if (!response.ok || (typeof result === 'object' && result && 'success' in result && result.success === false)) {
    const message =
      typeof result === 'object' && result && 'message' in result
        ? String(result.message)
        : `FormSubmit gönderimi başarısız oldu. HTTP ${response.status}`;

    throw new Error(message);
  }

  return result;
}

async function sendForm(body: ContactBody, toEmail: string, subject: string, fields: Record<string, string>) {
  const preferredProvider = getEnv('CONTACT_PROVIDER', 'FORM_PROVIDER').toLowerCase();
  const hasWeb3FormsKey = Boolean(getEnv('WEB3FORMS_ACCESS_KEY', 'NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY'));
  const errors: string[] = [];

  if (preferredProvider === 'web3forms' || (!preferredProvider && hasWeb3FormsKey)) {
    try {
      const response = await sendWithWeb3Forms(body, subject, fields);
      return { provider: 'web3forms', response } satisfies ProviderResult;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  try {
    const response = await sendWithFormSubmit(body, toEmail, subject, fields);
    return { provider: 'formsubmit', response } satisfies ProviderResult;
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  if (preferredProvider === 'formsubmit' || !hasWeb3FormsKey) {
    throw new Error(errors.join(' | ') || 'Ücretsiz form servisi gönderimi başarısız oldu.');
  }

  // Web3Forms denendi ve başarısız olduysa FormSubmit fallback de başarısız olmuştur.
  throw new Error(errors.join(' | ') || 'Ücretsiz form servisi gönderimi başarısız oldu.');
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

    const toEmail = getEnv('MAIL_TO', 'CONTACT_TO_EMAIL') || DEFAULT_TO_EMAIL;
    const { isQuote, subject, fields } = createSubmissionFields(body);

    const result = await sendForm(body, toEmail, subject, fields);

    return NextResponse.json({
      success: true,
      provider: result.provider,
      activationNotice:
        result.provider === 'formsubmit'
          ? 'FormSubmit ilk kullanımda info@guvenismakine.com adresine aktivasyon maili gönderebilir. Aktivasyon bir kez onaylandıktan sonra formlar direkt mail olarak gelir.'
          : undefined,
      message: isQuote
        ? 'Teklif talebiniz başarıyla gönderildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.'
        : 'Mesajınız başarıyla gönderildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
    });
  } catch (error) {
    console.error('Ücretsiz form mail gönderim hatası:', error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        error: 'FREE_FORM_SERVICE_FAILED',
        message:
          'Mail gönderilemedi. Ücretsiz form servisi yanıt vermedi. FormSubmit aktivasyon mailini info@guvenismakine.com gelen kutusunda onaylayın veya Web3Forms access key ekleyip yeniden deploy edin.',
      },
      { status: 500 },
    );
  }
}
