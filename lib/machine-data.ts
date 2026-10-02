// ─── Makine Grupları ─────────────────────────────────────────────────────────
//
// Ana sayfadaki "Makineler" bölümü, /makineler listesi, /makineler/[id] detay
// sayfaları ve /katalog bu listeyi kullanır. Görseller public/images/machines
// klasöründedir. Yeni grup eklemek için diziye nesne ekleyin ve görseli koyun.

export type Machine = {
  id: string;
  title: string;
  titleEn: string;
  /** Kısa grup adı (teklif formu vb.) */
  group: string;
  groupEn: string;
  /** Ağırlık / kapasite aralığı. Yoksa boş bırakın. */
  tonnage?: string;
  shortDesc: string;
  shortDescEn: string;
  fullDesc: string;
  image: string;
  /** Basılı katalogda yer aldığı sayfa */
  catalogPage?: number;
  specs: { label: string; value: string }[];
  features: string[];
  usageAreas: string[];
  sahibindenUrl?: string;
};

const SAHIBINDEN = 'https://guvenismakine.sahibinden.com/';

export const machines: Machine[] = [
  {
    id: 'ekskavator-grubu',
    title: 'Ekskavatör Grubu',
    titleEn: 'Excavator Group',
    group: 'Ekskavatör',
    groupEn: 'Excavator',
    tonnage: '10 – 70 ton',
    shortDesc: 'Kazı, hafriyat ve yıkım işleri için 10–70 ton arası paletli ekskavatörler.',
    shortDescEn: 'Crawler excavators from 10 to 70 tons for excavation, earthworks and demolition.',
    fullDesc:
      'Ekskavatörlerimiz, büyük ve küçük ölçekli tüm kazı, hafriyat ve yıkım projelerinde üstün performans sunar. Düzenli bakımlı filomuzda 10 tondan 70 tona kadar farklı kapasitelerde ekskavatör bulunmaktadır. Operatörlü veya operatörsüz kiralama seçenekleriyle hizmetinizdeyiz.',
    image: '/images/machines/ekskavator.jpg',
    catalogPage: 6,
    specs: [
      { label: 'Çalışma Ağırlığı', value: '10 – 70 ton' },
      { label: 'Kova Kapasitesi', value: '0,4 – 4,0 m³' },
      { label: 'Kazı Derinliği', value: '5 – 10 m' },
      { label: 'Ulaşma Mesafesi', value: '8 – 14 m' },
    ],
    features: [
      'Düzenli bakımlı ve sigortalı',
      'Operatörlü / operatörsüz kiralama',
      'Kısa ve uzun süreli kiralama',
      'Kırıcı ve ataşman seçenekleri',
      'Hızlı teslimat imkânı',
    ],
    usageAreas: ['İnşaat', 'Hafriyat', 'Yıkım', 'Altyapı', 'Maden', 'Liman'],
    sahibindenUrl: SAHIBINDEN,
  },
  {
    id: 'mini-ekskavator-grubu',
    title: 'Mini Ekskavatör Grubu',
    titleEn: 'Mini Excavator Group',
    group: 'Mini Ekskavatör',
    groupEn: 'Mini Excavator',
    tonnage: '1,5 – 6 ton',
    shortDesc: 'Dar alanlarda kazı ve altyapı işleri için 1,5–6 ton kompakt mini ekskavatörler.',
    shortDescEn: 'Compact mini excavators from 1.5 to 6 tons for excavation in confined spaces.',
    fullDesc:
      'Mini ekskavatörlerimiz, büyük makinelerin ulaşamadığı dar ve sınırlı alanlarda ideal çözüm sunar. Kentsel peyzaj çalışmalarından altyapı onarımına kadar pek çok farklı projede kullanılabilirler. 1,5–6 ton arası modellerimiz düzenli bakımlı ve kiralamaya hazırdır.',
    image: '/images/machines/mini-ekskavator.jpg',
    catalogPage: 7,
    specs: [
      { label: 'Çalışma Ağırlığı', value: '1,5 – 6 ton' },
      { label: 'Kova Kapasitesi', value: '0,04 – 0,25 m³' },
      { label: 'Kazı Derinliği', value: '2 – 4 m' },
      { label: 'Palet Tipi', value: 'Lastik Palet' },
    ],
    features: [
      'Kompakt boyut avantajı',
      'Yüksek manevra kabiliyeti',
      'Sıfır kuyruk salınımlı modeller',
      'Çeşitli ataşman uyumluluğu',
      'Düşük zemin baskısı',
    ],
    usageAreas: ['Kentsel İnşaat', 'Peyzaj', 'Altyapı', 'Tesisat', 'Tadilat'],
    sahibindenUrl: SAHIBINDEN,
  },
  {
    id: 'toprak-silindir-grubu',
    title: 'Toprak Silindir Grubu',
    titleEn: 'Soil Compactor Group',
    group: 'Toprak Silindiri',
    groupEn: 'Soil Compactor',
    tonnage: '13 – 20 ton',
    shortDesc: 'Zemin sıkıştırma ve dolgu işleri için 13–20 ton titreşimli toprak silindirleri.',
    shortDescEn: 'Vibratory soil compactors from 13 to 20 tons for ground compaction and fill works.',
    fullDesc:
      'Toprak silindirlerimiz, zemin sıkıştırma ve tesviye çalışmalarında yüksek performans ve verimlilik sunar. Yol yapımından altyapı ve saha düzenleme çalışmalarına kadar pek çok farklı projede güçlü ve güvenilir bir çözüm sağlar. 13–20 ton arası modeller, uzun ve kısa süreli kiralanabilir.',
    image: '/images/machines/toprak-silindiri.jpg',
    catalogPage: 8,
    specs: [
      { label: 'Çalışma Ağırlığı', value: '13 – 20 ton' },
      { label: 'Tambur Genişliği', value: '2,1 m' },
      { label: 'Tambur Tipi', value: 'Düz / Keçi Ayağı' },
      { label: 'Titreşim Frekansı', value: '28 – 35 Hz' },
    ],
    features: [
      'Yüksek sıkıştırma kuvveti',
      'Düz ve keçi ayağı tambur seçeneği',
      'Geniş görüş açılı kabin',
      'Düşük yakıt tüketimi',
      'Operatörlü kiralama imkânı',
    ],
    usageAreas: ['Yol Yapımı', 'Altyapı', 'Dolgu', 'Zemin İyileştirme', 'Baraj'],
    sahibindenUrl: SAHIBINDEN,
  },
  {
    id: 'lastikli-yukleyici-grubu',
    title: 'Lastikli Yükleyici Grubu',
    titleEn: 'Wheel Loader Group',
    group: 'Lastikli Yükleyici',
    groupEn: 'Wheel Loader',
    tonnage: '18 – 28 ton',
    shortDesc: 'Malzeme yükleme ve taşıma işleri için 18–28 ton lastikli yükleyiciler.',
    shortDescEn: 'Wheel loaders from 18 to 28 tons for material loading and handling.',
    fullDesc:
      'Yükleyicilerimiz, inşaat ve hafriyat projelerinde toprak, taş ve malzeme taşımada vazgeçilmez ekipmanlardır. Güçlü motorları ve dayanıklı yapılarıyla zorlu arazi koşullarında üstün performans sunarlar. 18–28 ton arası lastikli yükleyicilerimiz operatörlü veya operatörsüz kiralanabilir.',
    image: '/images/machines/lastikli-yukleyici.jpg',
    catalogPage: 10,
    specs: [
      { label: 'Çalışma Ağırlığı', value: '18 – 28 ton' },
      { label: 'Kova Kapasitesi', value: '3,0 – 5,0 m³' },
      { label: 'Motor Gücü', value: '180 – 300 HP' },
      { label: 'Maks. Hız', value: '35 – 40 km/sa' },
    ],
    features: [
      'Güçlü hidrolik sistem',
      'Dört çeker sürüş',
      'Farklı kova ve çatal seçenekleri',
      'Geniş kabin görüşü',
      'Ağır hizmet tipi gövde',
    ],
    usageAreas: ['İnşaat', 'Hafriyat', 'Maden', 'Agrega Tesisi', 'Yol Yapımı'],
    sahibindenUrl: SAHIBINDEN,
  },
  {
    id: 'greyder-grubu',
    title: 'Greyder Grubu',
    titleEn: 'Motor Grader Group',
    group: 'Greyder',
    groupEn: 'Motor Grader',
    shortDesc: 'Yol tesviye, reglaj ve kar küreme işleri için motor greyderler.',
    shortDescEn: 'Motor graders for road levelling, finishing and snow clearing.',
    fullDesc:
      'Greyderlerimiz, zemin tesviyesi ve yüzey düzenleme çalışmalarında yüksek hassasiyet ve güçlü performans sunar. Yol yapımından arazi düzenleme ve altyapı çalışmalarına kadar pek çok farklı projede ideal çözüm sağlar. Deneyimli operatörlerimizle birlikte kiralama imkânı mevcuttur.',
    image: '/images/machines/greyder.jpg',
    catalogPage: 9,
    specs: [
      { label: 'Bıçak Genişliği', value: '3,7 – 4,3 m' },
      { label: 'Motor Gücü', value: '140 – 220 HP' },
      { label: 'Çalışma Ağırlığı', value: '14 – 19 ton' },
      { label: 'Ataşman', value: 'Riper / Ön Bıçak' },
    ],
    features: [
      'Hassas tesviye kabiliyeti',
      'Tam hidrolik bıçak kontrolü',
      'Mafsallı şasi',
      'Riper ve ön bıçak seçeneği',
      'Operatörlü kiralama imkânı',
    ],
    usageAreas: ['Yol Yapımı', 'Yol Bakımı', 'Altyapı', 'Havalimanı', 'Kar Küreme'],
    sahibindenUrl: SAHIBINDEN,
  },
  {
    id: 'forklift-grubu',
    title: 'Forklift Grubu',
    titleEn: 'Forklift Group',
    group: 'Forklift',
    groupEn: 'Forklift',
    shortDesc: 'Depo ve şantiye yük taşıma ihtiyaçları için dizel, LPG ve elektrikli forkliftler.',
    shortDescEn: 'Diesel, LPG and electric forklifts for warehouse and site load handling.',
    fullDesc:
      'Forkliftlerimiz, yük taşıma ve istifleme çalışmalarında yüksek performans ve güvenilir kullanım sunar. Depolama ve lojistik operasyonlarından üretim tesislerine kadar pek çok farklı çalışma alanında verimli ve pratik bir çözüm sağlar. Elektrikli ve dizel modellerimizle kapalı ve açık alan kullanımına uygun geniş bir yelpazeye sahibiz.',
    image: '/images/machines/forklift.jpg',
    catalogPage: 11,
    specs: [
      { label: 'Taşıma Kapasitesi', value: '1,5 – 10 ton' },
      { label: 'Kaldırma Yüksekliği', value: '3 – 7 m' },
      { label: 'Yakıt Tipi', value: 'Dizel / LPG / Elektrik' },
      { label: 'Lastik Tipi', value: 'Dolu / Pnömatik' },
    ],
    features: [
      'Geniş kapasite yelpazesi',
      'İç ve dış mekân modelleri',
      'Dar alan manevra kabiliyeti',
      'Ergonomik sürücü kabini',
      'Satılık ve kiralık seçenekler',
    ],
    usageAreas: ['Depo', 'Lojistik', 'Fabrika', 'Şantiye', 'Liman', 'Soğuk Depo'],
    sahibindenUrl: SAHIBINDEN,
  },
  {
    id: 'istif-grubu',
    title: 'İstif Grubu',
    titleEn: 'Stacker Group',
    group: 'İstif Makinesi',
    groupEn: 'Stacker',
    shortDesc: 'Dar alanlarda paletli yüklerin taşınması ve raflara istiflenmesi için elektrikli istif makineleri.',
    shortDescEn: 'Electric stackers for moving palletised loads and racking in confined warehouse spaces.',
    fullDesc:
      'Elektrikli istif makinelerimiz, dar alanlarda paletli ürünlerin taşınması ve raflara istiflenmesi için pratik bir depo ekipmanıdır. 3,50 m kaldırma yüksekliğiyle orta yoğunluktaki iç saha operasyonlarına ekonomik çözüm sunar. Elektrikli yapısı sayesinde sessiz çalışma, kolay manevra ve düşük işletme maliyeti avantajı sağlar; depo, market, üretim alanı ve lojistik merkezlerinde yüklerin güvenli şekilde kaldırılması ve taşınması için tercih edilebilir.',
    image: '/images/machines/istif.jpg',
    catalogPage: 12,
    specs: [
      { label: 'Taşıma Kapasitesi', value: '1,2 – 2,0 ton' },
      { label: 'Kaldırma Yüksekliği', value: '3,50 m' },
      { label: 'Yakıt Tipi', value: 'Elektrik' },
      { label: 'Kullanım', value: 'Yaya kumandalı / Platformlu' },
    ],
    features: [
      'Sessiz çalışma',
      'Düşük işletme maliyeti',
      'Kolay manevra',
      'Uzun ve kısa süreli kiralama',
      'Çeşitli kapasite seçenekleri',
    ],
    usageAreas: ['Depo', 'Market', 'Üretim Alanı', 'Lojistik Merkezi', 'Soğuk Depo'],
    sahibindenUrl: SAHIBINDEN,
  },
];

export function getMachine(id: string) {
  return machines.find((m) => m.id === id);
}
