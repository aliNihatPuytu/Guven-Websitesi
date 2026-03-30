export type Machine = {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
  usageAreas: string[];
  sahibindenUrl?: string;
};

export const machines: Machine[] = [
  {
    id: 'ekskavatorler',
    title: 'Ekskavatörler',
    shortDesc: 'Kazı ve hafriyat işleri için güçlü ekskavatörler. 20-80 ton arası çeşitli kapasiteler.',
    fullDesc: 'Ekskavatörlerimiz, büyük ve küçük ölçekli tüm kazı, hafriyat ve yıkım projelerinde üstün performans sunar. Düzenli bakımlı ve sigortalı filomuzda farklı kapasitelerde ekskavatör bulunmaktadır. Operatörlü veya operatörsüz kiralama seçenekleriyle hizmetinizdeyiz. Satılık ikinci el ekskavatörlerimizi sahibinden.com mağazamızdan inceleyebilirsiniz.',
    image: '/images/machines/excavator.jpg',
    specs: [
      { label: 'Kapasite', value: '20 - 80 ton' },
      { label: 'Kova Kapasitesi', value: '0.5 - 4.0 m³' },
      { label: 'Kazı Derinliği', value: '5 - 10 m' },
      { label: 'Ulaşma Mesafesi', value: '8 - 14 m' },
    ],
    features: [
      'Düzenli bakımlı ve sigortalı',
      'Operatörlü/operatörsüz kiralama',
      'Kısa ve uzun süreli kiralama',
      'Çeşitli kapasite seçenekleri',
      'Hızlı teslimat imkânı',
    ],
    usageAreas: ['İnşaat', 'Hafriyat', 'Yıkım', 'Altyapı', 'Maden', 'Liman'],
    sahibindenUrl: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 'forkliftler',
    title: 'Forkliftler',
    shortDesc: 'Depo ve şantiye için yük taşıma çözümleri. Elektrikli ve dizel seçenekler mevcut.',
    fullDesc: 'Forklift filomuz, depo yönetiminden şantiye operasyonlarına kadar her türlü yük taşıma ihtiyacınıza çözüm sunar. Elektrikli, LPG\'li ve dizel modellerimizle kapalı ve açık alan kullanımına uygun geniş bir yelpazeye sahibiz. Satılık ve kiralık seçeneklerimiz için sahibinden.com mağazamızı ziyaret edin.',
    image: '/images/machines/forklift.jpg',
    specs: [
      { label: 'Taşıma Kapasitesi', value: '1.5 - 16 ton' },
      { label: 'Kaldırma Yüksekliği', value: '3 - 7 m' },
      { label: 'Yakıt Tipi', value: 'Elektrik / LPG / Dizel' },
      { label: 'Lastik Tipi', value: 'Dolu / Pnömatik' },
    ],
    features: [
      'Geniş kapasite yelpazesi',
      'İç ve dış mekan modelleri',
      'Dar alan manevra kabiliyeti',
      'Ergonomik sürücü kabini',
      'Güvenlik sistemleri',
    ],
    usageAreas: ['Depo', 'Lojistik', 'Fabrika', 'Şantiye', 'Liman', 'Soğuk Depo'],
    sahibindenUrl: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 'istif-makineleri',
    title: 'İstif Makineleri',
    shortDesc: 'Dar alanlarda yüksek verimlilikle çalışan istif makineleri ve reach truck\'lar.',
    fullDesc: 'İstif makinelerimiz, dar depo alanlarında maksimum verimlilik sağlar. Elektrikli istif makinelerinden reach truck\'lara kadar geniş yelpazede ürünlerimiz, yüksek raf sistemleriyle uyumlu çalışarak depolama kapasitenizi artırır. Güncel satılık ilanlarımız için sahibinden.com mağazamızı inceleyin.',
    image: '/images/machines/loader.jpg',
    specs: [
      { label: 'Taşıma Kapasitesi', value: '1.0 - 3.0 ton' },
      { label: 'Kaldırma Yüksekliği', value: '3 - 12 m' },
      { label: 'Yakıt Tipi', value: 'Elektrik' },
      { label: 'Geçiş Genişliği', value: '2.5 - 3.5 m' },
    ],
    features: [
      'Dar koridor kabiliyeti',
      'Yüksek kaldırma kapasitesi',
      'Sıfır emisyon (elektrikli)',
      'Sessiz çalışma',
      'Akıllı batarya yönetimi',
    ],
    usageAreas: ['Depo', 'E-Ticaret', 'Üretim', 'Soğuk Zincir', 'Perakende'],
    sahibindenUrl: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 'yukleyiciler',
    title: 'Yükleyiciler',
    shortDesc: 'Malzeme taşıma ve yükleme işleri için güvenilir yükleyiciler. Her ölçeğe uygun.',
    fullDesc: 'Yükleyicilerimiz, inşaat ve hafriyat projelerinde toprak, taş ve malzeme taşımada vazgeçilmez ekipmanlardır. Güçlü motorları ve dayanıklı yapılarıyla zorlu arazi koşullarında üstün performans sunarlar. Satılık ve kiralık yükleyici ilanlarımız için sahibinden.com mağazamızı ziyaret edin.',
    image: '/images/machines/mini-excavator.jpg',
    specs: [
      { label: 'Kova Kapasitesi', value: '1.5 - 4.5 m³' },
      { label: 'Motor Gücü', value: '100 - 250 HP' },
      { label: 'Çalışma Ağırlığı', value: '8 - 25 ton' },
      { label: 'Max. Hız', value: '35 - 45 km/h' },
    ],
    features: [
      'Güçlü hidrolik sistem',
      'Dört çeker sürüş',
      'Eklemeli şasi seçeneği',
      'Geniş kabin görüşü',
      'Ağır hizmet tipi gövde',
    ],
    usageAreas: ['İnşaat', 'Hafriyat', 'Maden', 'Tarım', 'Yol Yapımı'],
    sahibindenUrl: 'https://guvenismakine.sahibinden.com/',
  },
  {
    id: 'mini-ekskavatorler',
    title: 'Mini Ekskavatörler',
    shortDesc: 'Dar alanlarda kazı işleri için kompakt ve manevra kabiliyeti yüksek modeller.',
    fullDesc: 'Mini ekskavatörlerimiz, büyük makinelerin ulaşamadığı dar ve sınırlı alanlarda ideal çözüm sunar. Kentsel peyzaj çalışmalarından altyapı onarımına kadar pek çok farklı projede kullanılabilirler. Satılık mini ekskavatör ilanlarımız için sahibinden.com mağazamızı ziyaret edin.',
    image: '/images/machines/site-equipment.jpg',
    specs: [
      { label: 'Kapasite', value: '1 - 8 ton' },
      { label: 'Kova Kapasitesi', value: '0.02 - 0.25 m³' },
      { label: 'Kazı Derinliği', value: '2 - 4 m' },
      { label: 'Çalışma Genişliği', value: '0.8 - 2.0 m' },
    ],
    features: [
      'Kompakt boyut avantajı',
      'Yüksek manevra kabiliyeti',
      'Sıfır kuyruk salınımı',
      'Çeşitli ataşman uyumluluğu',
      'Düşük zemin baskısı',
    ],
    usageAreas: ['Kentsel İnşaat', 'Peyzaj', 'Altyapı', 'Tesisat', 'Tadilat'],
    sahibindenUrl: 'https://guvenismakine.sahibinden.com/',
  },
];
