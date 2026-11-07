import { Suspense } from 'react';
import { supabase } from '@/src/lib/supabase';
import Navbar from '@/app/components/Navbar';
import SortableGrid from '@/src/components/SortableGrid';

async function LinhaContent({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const resolvedParams = await paramsPromise;
  
  const slugFormatado = resolvedParams.slug.toLowerCase().replace('-', ' ');
  let nomeLinha = '';
  
  if (slugFormatado.includes('raizes')) nomeLinha = 'Linha Raízes';
  else if (slugFormatado.includes('essencia')) nomeLinha = 'Linha Essência';
  else if (slugFormatado.includes('fidelis')) nomeLinha = 'Linha Fidelis';
  else if (slugFormatado.includes('sao-bento')) nomeLinha = 'Coleção São Bento';
  else if (slugFormatado.includes('sao-miguel')) nomeLinha = 'Coleção São Miguel';
  else nomeLinha = resolvedParams.slug;

  const { data: produtos } = await supabase
    .from('produtos')
    .select('*')
    .ilike('subcategory', `%${nomeLinha}%`);

  const safeProducts = produtos || [];

  return (
    <>
      <div className="text-center pt-32 pb-10 px-6">
        <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] uppercase block mb-3">
          Nossa Linha Premium de Combate Espiritual
        </span>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
          {nomeLinha}
        </h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm leading-relaxed">
          Terços robustos e imponentes, forjados para resistir ao uso diário mais intenso. 
          Oferecendo firmeza incomparável na oração e durabilidade para toda a vida.
        </p>
      </div>

      {/* ALINHAMENTO CORRIGIDO: Mesma classe do Navbar (w-full px-6 md:px-12 lg:px-20) */}
      <div className="w-full px-6 md:px-12 lg:px-20">
        <SortableGrid products={safeProducts} />
      </div>
    </>
  );
}

export default function LinhaPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white pb-20">
      
      <Navbar />

      <Suspense fallback={
        <div className="py-32 flex flex-col items-center justify-center">
          <div className="text-amber-500 font-bold uppercase tracking-widest text-sm animate-pulse">
            A preparar arsenal da linha...
          </div>
        </div>
      }>
        <LinhaContent paramsPromise={params} />
      </Suspense>
      
    </main>
  );
}