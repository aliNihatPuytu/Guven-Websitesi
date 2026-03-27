export type TeamMember = {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: 'kurucu',
    name: 'Ad Soyad',
    title: 'Kurucu & Genel Müdür',
    email: 'info@guvenismakina.com',
    phone: '0 (216) 314 12 94',
    image: '/team/kurucu.jpg',
    bio: 'Güven İş ve İstif Makinaları\'nın 1978 yılındaki kuruluşundan bu yana şirketin vizyonuna ve büyümesine yön veren Kurucumuz, iş ve istif makineleri sektöründe 45 yılı aşkın deneyime sahiptir. Güçlü liderlik anlayışı, sektör bilgisi ve müşteri odaklı yaklaşımıyla firmamızı Türkiye\'nin güvenilir makina çözüm ortaklarından biri haline getirmiştir.',
    expertise: ['Stratejik Liderlik', 'Sektör Deneyimi', 'Kurumsal Yönetim', 'İş Geliştirme', 'Müşteri İlişkileri', 'Proje Yönetimi'],
    linkedin: 'https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/',
  },
  {
    id: 'genel-mudur',
    name: 'Ad Soyad',
    title: 'Genel Müdür Yardımcısı',
    email: 'info@guvenismakina.com',
    phone: '0 (532) 297 58 13',
    image: '/team/genel-mudur.jpg',
    bio: 'Şirketimizin operasyonel süreçlerini yöneten Genel Müdür Yardımcımız, iş makineleri sektöründe geniş bir deneyim birikimine sahiptir. Verimlilik odaklı yaklaşımı ve güçlü organizasyon becerileriyle tüm departmanların uyum içinde çalışmasını sağlamakta, müşteri memnuniyetini en üst düzeyde tutmaktadır.',
    expertise: ['Operasyon Yönetimi', 'İş Makineleri', 'Tedarik Zinciri', 'Ekip Yönetimi', 'Süreç Optimizasyonu', 'Kalite Kontrol'],
    linkedin: 'https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/',
  },
  {
    id: 'satis-muduru',
    name: 'Ad Soyad',
    title: 'Satış ve Kiralama Müdürü',
    email: 'info@guvenismakina.com',
    phone: '0 (216) 314 12 94',
    image: '/team/satis-muduru.jpg',
    bio: 'Satış ve Kiralama Müdürümüz, iş ve istif makineleri satış ile kiralama süreçlerinde uzmanlaşmış deneyimli bir profesyoneldir. Müşteri ihtiyaçlarını derinlemesine anlayan ve en uygun çözümü sunan yaklaşımıyla firmamızın satış performansını sürekli olarak artırmaktadır.',
    expertise: ['Satış Yönetimi', 'Kiralama Çözümleri', 'Müşteri İlişkileri', 'Pazar Analizi', 'Teknik Danışmanlık', 'Fiyatlandırma'],
    linkedin: 'https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/',
  },
  {
    id: 'teknik-mudur',
    name: 'Ad Soyad',
    title: 'Teknik Servis Müdürü',
    email: 'info@guvenismakina.com',
    phone: '0 (216) 314 12 94',
    image: '/team/teknik-mudur.jpg',
    bio: 'Teknik Servis Müdürümüz, iş ve istif makinelerinin bakım, onarım ve teknik destek süreçlerini yönetmektedir. Deneyimli teknik kadromuzu yöneten müdürümüz, makinelerin en yüksek performansta çalışmasını sağlamak ve yedek parça temininde hızlı çözümler sunmak için durmaksızın çalışmaktadır.',
    expertise: ['Teknik Servis', 'Bakım & Onarım', 'Yedek Parça', 'Makine Teşhisi', 'Teknik Eğitim', 'Kalite Güvencesi'],
    linkedin: 'https://www.linkedin.com/company/güven-i̇ş-ve-i̇stif-makinaları/',
  },
];
