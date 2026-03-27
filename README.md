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

## E-posta Kurulumu

Form gönderimlerinde (teklif formu ve iletişim formu) e-postalar `info@guvenismakina.com`
adresine otomatik olarak iletilir. **Herhangi bir harici sayfaya yönlendirme yapılmaz.**

### Resend ile kurulum (önerilen, ücretsiz tier mevcut)

1. [resend.com](https://resend.com) adresinde hesap açın
2. Alan adınızı (`guvenismakina.com`) doğrulayın
3. API anahtarı oluşturun
4. Proje kök dizininde `.env.local` dosyası oluşturun:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

5. `app/api/contact/route.ts` dosyasındaki `from` satırını güncelleyin:
```ts
from: 'Güven Web Sitesi <noreply@guvenismakina.com>',
```

### Geliştirme modu

`RESEND_API_KEY` tanımlanmamışsa form verileri konsola yazdırılır, mail gönderilmez.

---

## Telefon Numarası Eklemek

İki dosyada güncelleme yapın:

**`components/contact-section.tsx`** — `phoneNumbers` dizisi:
```ts
const phoneNumbers = [
  { number: '0 (216) 314 12 94', href: 'tel:+902163141294' },
  { number: '0 (532) 297 58 13', href: 'tel:+905322975813' },
  { number: '0 (5XX) XXX XX XX', href: 'tel:+90XXXXXXXXXX' }, // ← yeni numara
];
```

**`components/footer.tsx`** — aynı `phoneNumbers` dizisi:
```ts
const phoneNumbers = [
  { number: '0 (216) 314 12 94', href: 'tel:+902163141294' },
  { number: '0 (532) 297 58 13', href: 'tel:+905322975813' },
  { number: '0 (5XX) XXX XX XX', href: 'tel:+90XXXXXXXXXX' }, // ← yeni numara
];
```

---

## Ekip Üyesi Düzenlemek

`lib/team-data.ts` dosyasını açın. Her üye için:

```ts
{
  id: 'benzersiz-id',             // URL'de kullanılır: /ekip/benzersiz-id
  name: 'Ad Soyad',
  title: 'Unvan',
  email: 'email@guvenismakina.com',
  phone: '0 (216) 314 12 94',
  image: '/team/foto.jpg',        // public/team/ klasörüne yükleyin
  bio: 'Uzun biyografi metni...',
  expertise: ['Uzmanlık 1', 'Uzmanlık 2', ...],
  linkedin: 'https://linkedin.com/in/...',
}
```

Fotoğrafı `public/team/` klasörüne yükleyin (önerilen: 600×800 px, JPEG).

---

## Makina Bilgileri Düzenlemek

`lib/machine-data.ts` dosyasını düzenleyin. Her makina için:
- `shortDesc`: Kart görünümündeki kısa açıklama
- `fullDesc`: Detay sayfasındaki uzun açıklama  
- `specs`: Teknik özellikler tablosu
- `features`: Özellikler ve avantajlar
- `usageAreas`: Kullanım alanı etiketleri

---

## Görseller (`public/images/`)

Yer tutucu görselleri gerçek fotoğraflarla değiştirin:

| Dosya | Boyut | Açıklama |
|-------|-------|---------|
| `hero-construction.jpg` | 1920×1080 | Hero arka plan |
| `about-company.jpg` | 1200×900 | Hakkımızda görseli |
| `logo-blue.png` | 400×120 | Mavi logo (header) |
| `logo-white.png` | 400×120 | Beyaz logo (loading, footer) |
| `og-image.jpg` | 1200×630 | Sosyal medya paylaşım görseli |
| `machines/excavator.jpg` | 800×600 | Ekskavatör |
| `machines/forklift.jpg` | 800×600 | Forklift |
| `machines/loader.jpg` | 800×600 | İstif makinesi |
| `machines/mini-excavator.jpg` | 800×600 | Yükleyici |
| `machines/site-equipment.jpg` | 800×600 | Mini ekskavatör |
| `projects/metro-construction.jpg` | 800×600 | Metro projesi |
| `projects/residential-excavation.jpg` | 800×600 | Konut projesi |
| `projects/industrial-facility.jpg` | 800×600 | Endüstriyel tesis |

**Ekip fotoğrafları** → `public/team/` klasörüne yükleyin (600×800 px önerilir):
`kurucu.jpg`, `genel-mudur.jpg`, `satis-muduru.jpg`, `teknik-mudur.jpg`

---

## Vercel Deployment

1. Projeyi GitHub'a push edin
2. [vercel.com](https://vercel.com) → **Import Project**
3. **Environment Variables** bölümüne `RESEND_API_KEY` ekleyin
4. **Deploy** edin — otomatik `https://guvenismakina.com` adresine bağlanır

---

## Sayfa Yapısı

```
/                   → Ana sayfa
/ekip               → Ekibimiz listesi
/ekip/[id]          → Ekip üyesi detay
/makinalar/[id]     → Makina detay sayfası
/projeler           → Tüm projeler
/projeler/[id]      → Proje detayı
```

---

## Tanıtım Videosu Kurulumu

Site açıldığında loading screen'den sonra tanıtım videosu gösterilir. Video bir kez izlendikten sonra oturum boyunca tekrar gösterilmez.

### MP4 video kullanımı

`public/videos/tanitim.mp4` dosyasını projeye ekleyin:

```
public/
  videos/
    tanitim.mp4   ← videonuzu buraya yükleyin
```

**Önerilen format:** MP4 (H.264), 1920×1080, 50MB altı

### YouTube videosu kullanımı

`components/video-intro.tsx` dosyasını açın, `<video>` elementini kaldırıp yerine şunu ekleyin:

```tsx
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&controls=1&rel=0"
  className="absolute inset-0 w-full h-full"
  allow="autoplay; fullscreen"
  allowFullScreen
/>
```

`VIDEO_ID` yerine YouTube URL'sindeki video ID'yi yazın.

---

## Sahibinden.com Entegrasyonu

`components/sahibinden-listings.tsx` dosyasında:

- **`sahibindenCategories`** dizisi: Kategori kartları
- **`featuredListings`** dizisi: Öne çıkan ilan örnekleri

Gerçek sahibinden ilanlarınızı eklemek için `link` alanlarını güncelleyin ya da doğrudan sahibinden.com'dan kopyaladığınız ilan URL'lerini kullanın.

**Mağaza sayfanız:** [guvenismakine.sahibinden.com](https://guvenismakine.sahibinden.com/)
