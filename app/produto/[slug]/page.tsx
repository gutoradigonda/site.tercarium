import React, { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/src/lib/supabase';
import { notFound } from 'next/navigation';
import { ShoppingBag, MapPin, Loader2 } from 'lucide-react';
import ProductGallery from '@/src/components/ProductGallery';
import ProductCard from '@/app/components/ProductCard';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

async function RelatedProducts({ category, currentId }: { category: string, currentId: number }) {
  const { data: related } = await supabase
    .from('produtos')
    .select('*')
    .eq('category', category)
    .neq('id', currentId)
    .limit(4);

  if (!related || related.length === 0) return null;

  return (
    <div className={`mt-20 pt-6 ${montserrat.className}`}>
      {/* Imagem Divisoria quebra.png */}
      <div className="w-full flex justify-center items-center pb-12">
        <img 
          src="/quebra.png" 
          alt="Divisor Minimalista" 
          className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] object-contain opacity-80" 
        />
      </div>

      <div className="flex flex-col items-center mb-12 text-center">
        <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] uppercase mb-2">
          Complete seu Arsenal
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Produtos Similares
        </h2>
        <div className="w-12 h-1 bg-amber-500 mt-3"></div>
      </div>

      {/* Grelha idêntica à da Home */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((item: any) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: product, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('code', slug)
    .single();

  if (error || !product) {
    notFound();
  }

  const imagesArray = Array.isArray(product.imagens_galeria) && product.imagens_galeria.length > 0
    ? product.imagens_galeria
    : [product.image || product.imageUrl].filter(Boolean);

  const precoAntigo = Number(product.sale_price) || 0;
  const precoPromo = Number(product.preco_promocional) || 0;
  const precoExibicao = precoPromo > 0 ? precoPromo : precoAntigo;
  const descontoPix = precoExibicao * 0.95;
  const hasDiscount = precoPromo > 0 && precoPromo < precoAntigo;

  return (
    <div className={montserrat.className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductGallery images={imagesArray} category={product.category || 'TERÇOS'} />

        <div className="flex flex-col py-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="border border-amber-500 text-amber-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md bg-transparent">
              {product.category || 'TERÇOS'}
            </span>
            <span className="text-slate-500 text-[10px] tracking-widest uppercase">
              REF: {product.code}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">
            {product.model || product.name}
          </h1>

          {product.description && (
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {product.description}
            </p>
          )}

          <div className="bg-[#0B101E] border border-slate-800/60 rounded-2xl p-5 mb-6">
            <div className="flex items-baseline gap-3 mb-1">
              {hasDiscount && (
                <span className="text-slate-500 text-lg line-through font-medium">
                  R$ {precoAntigo.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="text-4xl font-black text-amber-500">
                R$ {precoExibicao.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-3">
              em até <strong className="text-white">3x de R$ {(precoExibicao / 3).toFixed(2).replace('.', ',')}</strong> sem juros
            </p>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
              <span>✦</span> R$ {descontoPix.toFixed(2).replace('.', ',')} no Pix • 5% de desconto à vista
            </div>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-[#0B101E] border border-slate-800/60 rounded-2xl p-5 mb-6">
              <h3 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4">
                Especificações Técnicas
              </h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="text-[11px] sm:text-xs">
                    <span className="text-slate-500 font-bold uppercase mr-2">{key}:</span>
                    <span className="text-slate-200 font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO DE CÁLCULO DE FRETE */}
          <div className="bg-[#0B101E] border border-slate-800/60 rounded-2xl p-5 mb-6">
            <h3 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Calcular Frete e Prazo
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite seu CEP"
                maxLength={9}
                className="flex-1 bg-[#050810] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors uppercase"
              />
              <button className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer">
                OK
              </button>
            </div>
          </div>

          <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20">
            <ShoppingBag className="w-5 h-5" />
            Adicionar ao Carrinho
          </button>
          
          <p className="text-center text-slate-500 text-[10px] mt-4">
            Dúvidas sobre o produto? <a href="#" className="text-amber-500 font-bold hover:underline">Fale conosco no WhatsApp</a>
          </p>
        </div>
      </div>

      <RelatedProducts category={product.category} currentId={product.id} />
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen flex flex-col bg-[#050810] text-white">
      <Navbar />
      <section className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            <p className="text-amber-500 font-bold uppercase tracking-widest text-xs animate-pulse">
              Forjando detalhes da peça...
            </p>
          </div>
        }>
          <ProductDetails params={params} />
        </Suspense>
      </section>
    </main>
  );
}