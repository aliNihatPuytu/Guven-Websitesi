import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TeamPageClient } from './team-page-client';

export const metadata: Metadata = {
  title: 'Ekibimiz | Güven İş ve İstif Makineleri',
  description: 'Güven İş ve İstif Makineleri\'nin deneyimli ve uzman ekibi. 1978\'den bu yana sektöre değer katan profesyonellerimizle tanışın.',
};

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TeamPageClient />
      <Footer />
    </main>
  );
}
