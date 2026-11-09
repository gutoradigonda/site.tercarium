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

  // 1. Busca os metadados (slogan, descricao, colecao, subcategoria)
  const { data: metadados } = await supabase
    .from('categorias_metadata')
    .select('subcategoria, colecao, descricao, slogan');

  // 2. Busca os produtos
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

  // Fallbacks
  let sloganDinamico = "Nossa Linha Premium de Combate Espiritual"; 
  let descricaoDinamica = "Terços robustos e imponentes, forjados para resistir ao uso diário mais intenso."; 
  
  if (metadados) {
    const termoBuscaNormalizado = normalizarTexto(termoBusca);
    const nomeLinhaNormalizado = normalizarTexto(nomeLinha);
    
    const metaEncontrado = metadados.find(m => {
      // Se a página atual for uma COLEÇÃO, procura na coluna colecao do metadata
      if (colunaFiltro === 'colecao' && m.colecao) {
        const colNormalizada = normalizarTexto(m.colecao);
        return colNormalizada.includes(termoBuscaNormalizado) || termoBuscaNormalizado.includes(colNormalizada);
      } 
      // Se a página for uma SUBCATEGORIA (Linha), procura na subcategoria do metadata
      else if (colunaFiltro === 'subcategory' && m.subcategoria) {
        const subCatNormalizada = normalizarTexto(m.subcategoria);
        return (
          subCatNormalizada === nomeLinhaNormalizado || 
          subCatNormalizada.includes(nomeLinhaNormalizado) ||
          nomeLinhaNormalizado.includes(subCatNormalizada)
        );
      }
      return false;
    });

    if (metaEncontrado) {
      if (metaEncontrado.descricao) descricaoDinamica = metaEncontrado.descricao;
      if (metaEncontrado.slogan) sloganDinamico = metaEncontrado.slogan;
    }
  }

  return (
    <>
      <div className={`text-center pt-32 pb-10 px-6 ${montserrat.className}`}>
        <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] uppercase block mb-6">
          {sloganDinamico}
        </span>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
          {nomeLinha}
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

export default function LinhaPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className={`min-h-screen bg-slate-950 text-white flex flex-col ${montserrat.className}`}>
      <div className="flex-1">
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
    </main>
  );
}