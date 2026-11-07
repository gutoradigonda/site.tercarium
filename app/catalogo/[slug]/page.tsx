import { supabase } from '@/src/lib/supabase';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const instant = false;

// Dicionário com as descrições detalhadas de cada linha
const categoryDetails: Record<string, { subtitle: string; description: string }> = {
  raizes: {
    subtitle: 'Nossa Linha Premium de Combate Espiritual',
    description: 'Terços robustos e imponentes, forjados com Paracord 550 original, pedras naturais selecionadas de alta densidade e metais maciços. Projetados para resistir ao uso diário mais intenso, oferecendo firmeza incomparável na oração e durabilidade para toda a vida.'
  },
  fidelis: {
    subtitle: 'Tradição, Firmeza e Leveza',
    description: 'Peças clássicas e intemporais que equilibram elegância e resistência. Confeccionadas com cordissomos de alta performance, contas selecionadas e acabamentos refinados para acompanhar a sua devoção em todos os momentos.'
  },
  essencia: {
    subtitle: 'A Pureza e o Foco no Essencial',
    description: 'Modelos de design minimalista com forte apelo devocional. Focados na simplicidade estrutural sem abrir mão da alta resistência dos materiais do ateliê.'
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Formata o título da categoria para exibição (ex: 'raizes' -> 'Linha Raízes')
  const formattedCategoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Busca os detalhes explicativos da linha ou usa um texto padrão se não encontrar
  const currentCategoryInfo = categoryDetails[slug.toLowerCase()] || {
    subtitle: 'Coleção Exclusiva Terçarium',
    description: 'Peças artesanais exclusivas desenvolvidas com rigorosos padrões de qualidade e resistência.'
  };

  // Busca os produtos da categoria específica no Supabase
  const { data: products, error } = await supabase
    .from('produtos')
    .select('*')
    .ilike('category', `%${slug}%`)
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar produtos da categoria:', error);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-20">
      
      {/* Cabeçalho Interno */}
      <header className="bg-slate-950/90 backdrop-blur-md py-6 px-6 md:px-12 lg:px-20 border-b border-slate-800/50 sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Voltar ao Início
          </Link>
          <h1 className="text-lg font-black tracking-widest text-amber-500 uppercase">
            Terçarium
          </h1>
        </div>
      </header>

      {/* Conteúdo da Categoria */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-12">
        
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-amber-500 font-bold tracking-[0.25em] text-xs uppercase">
            {currentCategoryInfo.subtitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Linha {formattedCategoryName}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-2 mb-4"></div>
          
          {/* Texto Explicativo de Materiais e Tamanhos */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {currentCategoryInfo.description}
          </p>
        </div>

        {/* Grelha de Produtos */}
        {!products || products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl text-slate-500">
            Nenhum produto encontrado nesta linha no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}