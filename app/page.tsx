import { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { QuoteBanner } from '@/src/components/QuoteBanner';
import { FlashSale } from '@/src/components/FlashSale';
import { CategoryBento } from '@/src/components/CategoryBento';
import { CatalogShowcase } from '@/src/components/CatalogShowcase';
import { NewReleases } from '@/src/components/NewReleases';
import { HistorySection } from '@/src/components/HistorySection';
import { Testimonials } from '@/src/components/Testimonials';
import { Footer } from '@/src/components/Footer';
import { WhatsAppButton } from '@/src/components/WhatsAppButton';
import { supabase } from '@/src/lib/supabase';

// Sub-componente que carrega os produtos em background
async function ProductsSection() {
  const { data: produtos } = await supabase.from('produtos').select('*');
  const safeProducts = produtos || [];

  return (
    <>
      <FlashSale products={safeProducts} />
      <NewReleases products={safeProducts} />
      <CategoryBento />
      <CatalogShowcase products={safeProducts} />
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-white">
      {/* Menu Superior */}
      <Navbar />

      {/* Secção Principal (Hero) */}
      <Hero />

      {/* Citação */}
      <QuoteBanner />
      
      {/* Produtos e Linhas carregados do Supabase */}
      <Suspense fallback={
        <div className="py-20 text-center text-amber-500 font-bold uppercase tracking-widest text-xs animate-pulse">
          A forjar o arsenal...
        </div>
      }>
        <ProductsSection />
      </Suspense>
      
      <HistorySection />
      
      <Testimonials />

      {/* Rodapé e Botão Flutuante do WhatsApp */}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}