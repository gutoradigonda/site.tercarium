import { Suspense } from 'react';
import { supabase } from '@/src/lib/supabase';
import SortableGrid from '@/src/components/SortableGrid';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

const normalizarTexto = (texto: string) => {
  return texto
    ? texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
    : '';
};

async function AcessorioContent({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const resolvedParams = await paramsPromise;
  
  const slugLimpo = resolvedParams.slug.toLowerCase().trim();
  const termoSlugNormalizado = normalizarTexto(slugLimpo.replace(/-/g, ' '));
  
  let nomeAcessorio = resolvedParams.slug.replace(/-/g, ' ').replace(/^./, str => str.toUpperCase());

  // 1. Busca os metadados incluindo o slogan
  const { data: metadados } = await supabase
    .from('categorias_metadata')
    .select('subcategoria, descricao, slogan')
    .ilike('categoria', 'Acessórios'); 

  // 2. Busca os produtos
  const { data: produtos } = await supabase
    .from('produtos')
    .select('*')
    .ilike('category', 'acessórios')
    .or(`ativo_no_site.is.null,ativo_no_site.eq.true`);

  const produtosFiltrados = (produtos || []).filter(p => {
    const subCatNormalizada = normalizarTexto(p.subcategory || '');
    return (
      subCatNormalizada.includes(termoSlugNormalizado) ||
      termoSlugNormalizado.includes(subCatNormalizada) ||
      subCatNormalizada.replace(/s$/, '') === termoSlugNormalizado.replace(/s$/, '')
    );
  });

  const safeProducts = produtosFiltrados.map(p => ({
    ...p,
    model: p.name || p.model || 'Sem Nome',
    image: p.imagens_galeria && p.imagens_galeria.length > 0 ? p.imagens_galeria[0] : (p.image || null),
    imageUrl: p.imagens_galeria && p.imagens_galeria.length > 0 ? p.imagens_galeria[0] : (p.imageUrl || null)
  }));

  // Variáveis com valores padrão (fallbacks)
  let sloganDinamico = "Ateliê Terçarium • Acessórios Exclusivos"; 
  let descricaoDinamica = "Peças artesanais complementares de altíssima qualidade, criadas com o mesmo rigor e beleza do nosso ateliê."; 
  
  if (metadados) {
    const metaEncontrado = metadados.find(m => {
      const subCatNormalizada = normalizarTexto(m.subcategoria || '');
      return (
        subCatNormalizada.includes(termoSlugNormalizado) ||
        termoSlugNormalizado.includes(subCatNormalizada) ||
        subCatNormalizada.replace(/s$/, '') === termoSlugNormalizado.replace(/s$/, '')
      );
    });

    if (metaEncontrado) {
      if (metaEncontrado.descricao) descricaoDinamica = metaEncontrado.descricao;
      if (metaEncontrado.slogan) sloganDinamico = metaEncontrado.slogan;
      if (metaEncontrado.subcategoria) nomeAcessorio = metaEncontrado.subcategoria;
    }
  }

  return (
    <>
      <div className={`text-center pt-32 pb-10 px-6 ${montserrat.className}`}>
        <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] uppercase block mb-6">
          {sloganDinamico}
        </span>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
          {nomeAcessorio}
        </h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm leading-relaxed font-medium">
          {descricaoDinamica}
        </p>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 mb-20">
        <SortableGrid products={safeProducts} />
      </div>
    </>
  );
}

export default function AcessorioPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className={`min-h-screen bg-slate-950 text-white flex flex-col ${montserrat.className}`}>
      <div className="flex-1">
        <Suspense fallback={
          <div className="py-32 flex flex-col items-center justify-center">
            <div className="text-amber-500 font-bold uppercase tracking-widest text-sm animate-pulse">
              A carregar acessórios...
            </div>
          </div>
        }>
          <AcessorioContent paramsPromise={params} />
        </Suspense>
      </div>
    </main>
  );
}