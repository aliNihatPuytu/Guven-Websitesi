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

Tarayıcıda `http://localhost:3000` adresini açın.

---

## E-posta Kurulumu — Titan SMTP

Vercel panelinde **Project > Settings > Environment Variables** alanına aşağıdaki değerleri tek tek ekleyin. Değerleri tırnaksız yazın ve kaydettikten sonra mutlaka yeniden deploy edin.

```env
SMTP_HOST=smtp.titan.email
SMTP_HOSTS=smtp.titan.email,smtp0101.titan.email
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@guvenismakine.com
SMTP_PASS=BURAYA_TITAN_MAIL_SIFRESI
MAIL_FROM=info@guvenismakine.com
MAIL_FROM_NAME=Güven Web Sitesi
MAIL_TO=info@guvenismakine.com
```

Önemli kontroller:

- `SMTP_PASS` alanına `info@guvenismakine.com` hesabının Titan webmail giriş şifresi yazılmalıdır.
- `SMTP_USER`, `MAIL_FROM` ve `MAIL_TO` tam adres olmalıdır: `info@guvenismakine.com`.
- Titan Webmail içinde **Settings > Enable Titan on other apps** açık olmalıdır.
- Titan hesabında 2FA açıksa üçüncü parti SMTP erişimi engellenebilir; SMTP için 2FA kapalı olmalı veya sağlayıcınız destekliyorsa uygulama şifresi kullanılmalıdır.
- Bu sürüm otomatik olarak `smtp.titan.email`, `smtp0101.titan.email`, `465 SSL` ve `587 STARTTLS` kombinasyonlarını dener.
- Domain maili Titan değil de GoDaddy/SecureServer üzerinde kalmışsa Vercel'e ayrıca `SMTP_GODADDY_FALLBACK=true` ekleyebilirsiniz.

## Sık Yapılan Güncellemeler

Tüm iletişim ve marka bilgileri **tek dosyadan** yönetilir: `lib/site-config.ts`

| Ne değişecek? | Nerede? |
|---|---|
| Telefon numaraları | `lib/site-config.ts` → `phones` dizisi (iletişim, footer, mobil menü ve Google yapısal verisi otomatik güncellenir) |
| E-posta, adres, çalışma saatleri | `lib/site-config.ts` → `email`, `address`, `hours` |
| Instagram / YouTube / LinkedIn / Sahibinden adresleri | `lib/site-config.ts` → `social` |
| Tanıtım filmi | `lib/site-config.ts` → `video.youtubeId` (katalogdaki QR koddan alınan YouTube videosu; boş bırakılırsa `video.file` oynatılır) |
| Makine grupları (isim, tonaj, görsel, teknik özellikler) | `lib/machine-data.ts` — görseller `public/images/machines/` |
| Referans logoları | `lib/references-data.ts` — görseller `public/images/references/` |
| Menü ve metinler (TR/EN) | `contexts/language-context.tsx` |

### Kataloğu güncellemek

Katalog sayfası (`/katalog`) basılı kataloğun PDF'ini sayfa görselleri olarak gösterir ve çevirme animasyonuyla sunar.

1. Yeni PDF'i `public/katalog/guven-katalog.pdf` olarak kaydedin.
2. Sayfa görsellerini yeniden üretin (Poppler `pdftoppm` ile):
   ```bash
   cd public/katalog
   pdftoppm -jpeg -r 150 -jpegopt quality=82 guven-katalog.pdf pages/page
   pdftoppm -jpeg -r 20 guven-katalog.pdf thumbs/page
   # Dosya adları page-01.jpg … page-16.jpg biçiminde olmalıdır (gerekirse yeniden adlandırın)
   ```
3. Sayfa sayısı değiştiyse `lib/site-config.ts` → `catalogPages` değerini ve
   `components/catalog-view.tsx` → `catalogSections` (bölüm → sayfa) listesini güncelleyin.

## Sayfa Yapısı

| Adres | İçerik |
|---|---|
| `/` | Ana sayfa (hero, hizmetler, makineler, katalog, referanslar, teklif, hakkımızda, iletişim) |
| `/hizmetler` | Kiralama, satış, yedek parça, servis |
| `/makineler` ve `/makineler/[grup]` | Makine grupları ve detay sayfaları |
| `/katalog` | Tam katalog + PDF indirme |
| `/referanslar` | Referans logoları |
| `/hakkimizda` | Tanıtım filmi, misyon, vizyon |
| `/iletisim` | İletişim bilgileri, harita, mesaj ve teklif formu |
| `/sitemap.xml`, `/robots.txt` | Otomatik üretilir |

Eski adresler (`/makinalar/...`, `/projeler`, `/ekip`) kalıcı olarak yeni sayfalara yönlendirilir (`next.config.mjs`).

## Google Görünümü (SEO) — Yayından Sonra Yapılacaklar

Site kodunda başlık/açıklama, Organization + LocalBusiness + WebSite + Breadcrumb + Product yapısal verileri, sitemap ve OG görseli hazırdır. Google'daki eski "GoDaddy" metninin temizlenmesi ve sitelink'lerin çıkması için:

1. [Google Search Console](https://search.google.com/search-console) → mülk ekleyin (`https://www.guvenismakine.com`).
2. **Sitemaps** bölümüne `https://www.guvenismakine.com/sitemap.xml` ekleyin.
3. **URL Denetimi** ile ana sayfa ve alt sayfalar için "Dizine eklenmesini iste" yapın.
4. Google İşletme Profili'nde web sitesi adresinin `https://www.guvenismakine.com` olduğundan emin olun.

Sitelink'ler Google tarafından otomatik oluşturulur; net menü yapısı ve ayrı sayfalar bunun için hazırlandı. Genellikle birkaç hafta içinde görünür.

## Yazı Tipleri

Archivo (başlıklar) ve Plus Jakarta Sans (gövde) `public/fonts/` altında yerel olarak barındırılır (SIL OFL lisansı, lisans dosyaları aynı klasörde). Google Fonts'a bağımlılık yoktur; derleme internet erişimi gerektirmez.
