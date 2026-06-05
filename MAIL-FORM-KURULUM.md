# Güven İş Makine - Ücretsiz Form Mail Kurulumu

Bu sürümde Titan SMTP devre dışı bırakıldı. Form gönderimleri ücretsiz form servisleriyle yapılır.

## Yöntem 1: FormSubmit (varsayılan, ücretsiz, SMTP şifresi gerektirmez)

Vercel > Project > Settings > Environment Variables alanına şunu ekleyin:

```env
MAIL_TO=info@guvenismakine.com
CONTACT_PROVIDER=formsubmit
```

Sonra Vercel'de yeniden deploy edin.

İlk test gönderiminden sonra FormSubmit, `info@guvenismakine.com` adresine aktivasyon/onay maili gönderebilir. Bu maildeki onay bağlantısına bir kez tıklayın. Onaydan sonra teklif ve iletişim formu gönderimleri direkt bu adrese gelir.

## Yöntem 2: Web3Forms (opsiyonel, ücretsiz planlı)

Web3Forms'tan `info@guvenismakine.com` için ücretsiz access key alın. Ardından Vercel'e şunları ekleyin:

```env
MAIL_TO=info@guvenismakine.com
CONTACT_PROVIDER=web3forms
WEB3FORMS_ACCESS_KEY=BURAYA_WEB3FORMS_ACCESS_KEY
```

Sonra yeniden deploy edin.

## Not

SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_SECURE gibi Titan SMTP değişkenleri bu sürümde gerekli değildir.
