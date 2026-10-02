import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <>
      <Header solid />
      <main className="min-h-[70vh] bg-ink text-white flex items-center" style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-x py-24 text-center">
          <p className="font-heading font-bold text-7xl sm:text-8xl text-brand-light">404</p>
          <h1 className="mt-4 font-heading font-bold text-3xl sm:text-4xl">Sayfa bulunamadı</h1>
          <p className="mt-4 text-white/60 max-w-md mx-auto">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
          <div className="mt-8 flex flex-col xs:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-white text-ink font-semibold hover:bg-brand-light hover:text-white transition-colors">Ana Sayfa</Link>
            <Link href="/makineler" className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 text-white font-medium hover:bg-white/10 transition-colors">Makineler</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
