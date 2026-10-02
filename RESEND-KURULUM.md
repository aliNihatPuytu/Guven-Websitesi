# Resend ile Form Mail Kurulumu

Bu sürümde teklif ve iletişim formları `/api/contact` üzerinden Resend API ile mail gönderir.
Titan SMTP, FormSubmit ve Web3Forms kullanılmaz.

## 1) Resend'de domain doğrulama

Resend panelinde `guvenismakine.com` domainini ekleyin ve Resend'in verdiği DNS kayıtlarını domain DNS yönetimine girin.
Domain doğrulanmadan `noreply@guvenismakine.com` gibi gönderici adresleri çalışmaz.

## 2) API key oluşturma

Resend panelinde API Keys bölümünden yeni bir API key oluşturun.
Key genelde `re_...` ile başlar.

## 3) Vercel Environment Variables

Vercel > Project > Settings > Environment Variables alanına şu değerleri ekleyin:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM=Güven Web Sitesi <noreply@guvenismakine.com>
MAIL_TO=info@guvenismakine.com
```

Production seçili olmalı. Preview ve Development için de eklemek isterseniz hepsini işaretleyebilirsiniz.

## 4) Redeploy

Environment Variables eklendikten sonra eski deployment bunu kullanmaz.
Vercel > Deployments > son deployment > Redeploy yapın.

## 5) Test

Sitedeki Teklif veya İletişim formunu gönderin.
Başarılıysa ekranda uyarı çıkar ve mail `info@guvenismakine.com` adresine gelir.

## Notlar

- `RESEND_FROM` mutlaka Resend'de doğrulanmış domaine ait olmalı.
- `MAIL_TO` alıcı adrestir, Titan webmail hesabı olabilir.
- Kullanıcının forma yazdığı e-posta `replyTo` olarak eklenir; gelen maile cevap verince müşteriye cevap yazabilirsiniz.
