import { Suspense } from 'react';
import { supabase } from '@/src/lib/supabase';
import Navbar from '@/app/components/Navbar';
import SortableGrid from '@/src/components/SortableGrid';
import { Footer } from '../../../src/components/Footer';

async function LinhaContent({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const resolvedParams = await paramsPromise;
  
  const slugLimpo = resolvedParams.slug.toLowerCase().trim();
  let nomeLinha = '';
  let colunaFiltro = 'subcategory';
  let termoBusca = '';

  if (slugLimpo.includes('colecao-') || slugLimpo.includes('sao-bento') || slugLimpo.includes('sao-miguel')) {
    colunaFiltro = 'colecao';
    if (slugLimpo.includes('sao-bento')) {
      termoBusca = 'São Bento';
      nomeLinha = 'Coleção São Bento';
    } else if (slugLimpo.includes('sao-miguel')) {
      termoBusca = 'São Miguel';
      nomeLinha = 'Coleção São Miguel';
    } else {
      termoBusca = slugLimpo.replace('colecao-', '').replace(/-/g, ' ');
      nomeLinha = `Coleção ${termoBusca.charAt(0).toUpperCase() + termoBusca.slice(1)}`;
    }
  } else {
    colunaFiltro = 'subcategory';
    if (slugLimpo.includes('raizes')) {
      termoBusca = 'Linha Raízes';
      nomeLinha = 'Linha Raízes';
    } else if (slugLimpo.includes('essencia')) {
      termoBusca = 'Linha Essência';
      nomeLinha = 'Linha Essência';
    } else if (slugLimpo.includes('fidelis')) {
      termoBusca = 'Linha Fidelis';
      nomeLinha = 'Linha Fidelis';
    } else {
      termoBusca = resolvedParams.slug.replace(/-/g, ' ');
      nomeLinha = termoBusca;
    }
  }

  const { data: produtos } = await supabase
    .from('produtos')
    .select('*')
    .or(`ativo_no_site.is.null,ativo_no_site.eq.true`)
    .ilike(colunaFiltro, `%${termoBusca}%`);

  const safeProducts = (produtos || []).map(p => ({
    ...p,
    model: p.name || p.model || 'Sem Nome',
    image: p.imagens_galeria && p.imagens_galeria.length > 0 ? p.imagens_galeria[0] : (p.image || null),
    imageUrl: p.imagens_galeria && p.imagens_galeria.length > 0 ? p.imagens_galeria[0] : (p.imageUrl || null)
  }));

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

      <div className="w-full px-6 md:px-12 lg:px-20 mb-20">
        <SortableGrid products={safeProducts} />
      </div>
    </>
  );
}

export default function LinhaPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <div>
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
      </div>

      <Footer />
    </main>
  );
}