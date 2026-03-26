# Güven İş ve İstif Makinaları — Web Sitesi

## Kurulum

```bash
npm install
# veya
pnpm install
```

## Geliştirme

```bash
npm run dev
```

## E-posta Kurulumu (Teklif ve İletişim Formları)

Formlar `/api/contact` rotasına POST atar ve oradan `info@guvenismakina.com` adresine mail gönderilir.

### Seçenek 1: Resend ile (Önerilen)

1. [resend.com](https://resend.com) adresinde ücretsiz hesap açın
2. Alan adınızı doğrulayın (`guvenismakina.com`)
3. Bir API anahtarı oluşturun
4. Proje kök dizininde `.env.local` dosyası oluşturun:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

5. `app/api/contact/route.ts` dosyasındaki `from` alanını kendi doğrulanmış adresinizle güncelleyin:
   ```ts
   from: 'Güven Web Sitesi <noreply@guvenismakina.com>',
   ```

### Seçenek 2: Geliştirme / Test

`RESEND_API_KEY` olmadan uygulama çalışmaya devam eder — form verileri konsola yazdırılır, gerçek mail gönderilmez.

## Vercel Deployment

1. Projeyi GitHub'a push edin
2. [vercel.com](https://vercel.com) üzerinden import edin
3. Environment Variables bölümüne `RESEND_API_KEY` ekleyin
4. Deploy edin

## Görseller

`public/images/` klasöründeki yer tutucu görselleri gerçek fotoğraflarla değiştirin:

- `hero-construction.jpg` — Hero bölümü arkaplan görseli
- `about-company.jpg` — Hakkımızda bölümü görseli
- `logo-blue.png` — Mavi logonuz
- `logo-white.png` — Beyaz logonuz
- `machines/excavator.jpg`, `machines/forklift.jpg`, vb. — Makine görselleri
- `projects/metro-construction.jpg`, vb. — Proje görselleri

## LinkedIn

Footer'daki LinkedIn linki şu anda:
`https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/`

Eğer sayfa URL'si farklıysa `components/footer.tsx` dosyasından güncelleyebilirsiniz.
