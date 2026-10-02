// ─── Referans (müşteri) verileri ────────────────────────────────────────────────
//
// Bu dosyada Güven İş ve İstif Makineleri'nin uzun yıllardır birlikte çalıştığı
// firmaların referans logoları tanımlanır. Hem ana sayfadaki sonsuz dönen
// referans şeridi, hem de /referanslar sayfasındaki grid bu listeyi kullanır.
//
// Yeni bir referans eklemek için:
//   1. public/images/references/ klasörüne logoyu ekleyin (SVG önerilir).
//   2. Aşağıdaki diziye yeni bir nesne ekleyin.
//
// Şu an mevcut görseller PLACEHOLDER'dır; gerçek logolarla değiştirilmelidir.
// Detay için: public/images/references/README.md
//
export type Reference = {
  id: string;
  name: string;            // Görselsel okunabilirlik için (alt text vs.)
  image: string;           // /public altındaki yol
};

export const references: Reference[] = [
  { id: 'ref-01', name: 'Referans 1',  image: '/images/references/1-.png' },
  { id: 'ref-02', name: 'Referans 2',  image: '/images/references/2-.png' },
  { id: 'ref-03', name: 'Referans 3',  image: '/images/references/3-.png' },
  { id: 'ref-04', name: 'Referans 4',  image: '/images/references/4-.png' },
  { id: 'ref-05', name: 'Referans 5',  image: '/images/references/5-.png' },
  { id: 'ref-06', name: 'Referans 6',  image: '/images/references/6-.png' },
  { id: 'ref-07', name: 'Referans 7',  image: '/images/references/7-.png' },
  { id: 'ref-08', name: 'Referans 8',  image: '/images/references/8-.png' },
  { id: 'ref-09', name: 'Referans 9',  image: '/images/references/9-.png' },
  { id: 'ref-10', name: 'Referans 10', image: '/images/references/10-.png' },
  { id: 'ref-11', name: 'Referans 11', image: '/images/references/11-.png' },
  { id: 'ref-12', name: 'Referans 12', image: '/images/references/12-1.png' }
];
