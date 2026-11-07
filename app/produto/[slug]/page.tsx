'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/src/lib/supabase';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, ShieldCheck, Truck, RotateCcw, ShoppingBag, MapPin } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { CartDrawer } from '@/src/components/CartDrawer';
import { Footer } from '@/src/components/Footer';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

function ProductDetailContent() {
  const router = useRouter();
  const params = useParams();
  const id = params?.slug ? String(params.slug) : '';

  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para o cálculo de frete
  const [cep, setCep] = useState('');
  const [freteResults, setFreteResults] = useState<any[] | null>(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!id || id === 'undefined') return;
      
      setLoading(true);

      // 1. Busca o produto atual
      const { data: productData, error: productError } = await supabase
        .from('produtos')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (productError) console.error('Erro ao buscar produto:', productError.message);

      if (productData) {
        setProduct({
          ...productData,
          price: productData.sale_price || 0,
        });
      }

      // 2. Busca produtos variados para o "Você também pode gostar" (excluindo o atual)
      const { data: relatedData, error: relatedError } = await supabase
        .from('produtos')
        .select('*')
        .neq('id', id)
        .limit(4); // Limita a 4 produtos para ficar alinhado na grelha

      if (relatedError) console.error('Erro ao buscar relacionados:', relatedError.message);
      
      if (relatedData) {
        setRelatedProducts(relatedData);
      }
      
      setLoading(false);
    }

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsCartOpen(true);
    }
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, '').length !== 8) {
      alert('Por favor, insira um CEP válido com 8 dígitos.');
      return;
    }

    setCalculating(true);
    
    setTimeout(() => {
      setFreteResults([
        { name: 'SEDEX', price: 24.90, deadline: '3 a 5 dias úteis' },
        { name: 'PAC', price: 16.50, deadline: '7 a 11 dias úteis' },
      ]);
      setCalculating(false);
    }, 600);
  };

  const handleGoBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <main className={`min-h-screen bg-slate-950 text-white flex items-center justify-center ${montserrat.className}`}>
        <div className="text-center space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-widest text-xs animate-pulse">
            Carregando peça do arsenal...
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className={`min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 ${montserrat.className}`}>
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-black uppercase text-white">Peça não encontrada</h2>
          <p className="text-slate-400 text-sm">O terço correspondente (ID: {id}) não foi localizado na base de dados.</p>
          <Link href="/" className="inline-block bg-amber-500 text-slate-950 font-black uppercase tracking-widest text-xs py-3 px-6 rounded-xl">
            Voltar ao Início
          </Link>
        </div>
      </main>
    );
  }

  const salePrice = Number(product.sale_price || 0);
  const installmentValue = (salePrice / 3).toFixed(2).replace('.', ',');
  const pixPrice = (salePrice * 0.95).toFixed(2).replace('.', ',');

  return (
    <main className={`min-h-screen bg-slate-950 text-white flex flex-col ${montserrat.className}`}>
      
      {/* Container que empurra o Footer para o fundo se a página for curta */}
      <div className="flex-grow w-full px-6 md:px-12 lg:px-20 pt-28 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Botão Voltar */}
          <div className="mb-6">
            <button 
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors cursor-pointer bg-transparent border-none"
            >
              <ChevronLeft className="w-4 h-4" /> Voltar
            </button>
          </div>

          {/* GRELHA PRINCIPAL DO PRODUTO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Coluna Esquerda: Imagem e Selos */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="relative aspect-square rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center overflow-hidden shadow-inner">
                <span className="absolute top-4 left-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                  {product.category || 'Arsenal'}
                </span>
                <div className="text-slate-600 text-xs tracking-widest uppercase font-bold">
                  [ Foto do Produto ]
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl text-center space-y-1.5">
                  <ShieldCheck className="w-5 h-5 text-amber-500 mx-auto" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Alta Resistência</span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl text-center space-y-1.5">
                  <Truck className="w-5 h-5 text-amber-500 mx-auto" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Envio Seguro</span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl text-center space-y-1.5">
                  <RotateCcw className="w-5 h-5 text-amber-500 mx-auto" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Feito à Mão</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Informações */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold tracking-[0.2em] text-xs uppercase bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/25">
                    {product.category || 'Arsenal'}
                  </span>
                  <span className="text-slate-500 text-xs font-mono">
                    REF: {product.code || product.id}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  {product.name}
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed pt-1">
                  {product.description || 'Terço de alta resistência forjado artesanalmente para o combate espiritual diário.'}
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-2 shadow-inner">
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  R$ {salePrice.toFixed(2).replace('.', ',')}
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  em até <strong className="text-white">3x de R$ {installmentValue}</strong> sem juros
                </div>
                <div className="pt-1.5 border-t border-slate-800/80 flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <span>✦</span>
                  <span>R$ {pixPrice} no Pix · <span className="text-emerald-300 font-semibold">5% de desconto à vista</span></span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-amber-500 mb-2">
                  Especificações Técnicas
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  {product.specifications && typeof product.specifications === 'object' && Object.keys(product.specifications).length > 0 ? (
                    (() => {
                      const desiredOrder = [
                        'CONTAS AVE MARIA', 
                        'CONTAS PAI NOSSO', 
                        'CORDÃO', 
                        'ENTREMEIO', 
                        'MEDALHA', 
                        'CRUCIFIXO',
                        'USO', 
                        'OBSERVAÇÕES'
                      ];

                      const specs = product.specifications;
                      const keys = Object.keys(specs);

                      const sortedKeys = keys.sort((a, b) => {
                        const indexA = desiredOrder.indexOf(a.toUpperCase());
                        const indexB = desiredOrder.indexOf(b.toUpperCase());

                        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                        if (indexA !== -1) return -1;
                        if (indexB !== -1) return 1;
                        return a.localeCompare(b);
                      });

                      return sortedKeys.map((key) => (
                        <div key={key} className="border-b border-slate-800/40 pb-2.5 leading-relaxed">
                          <span className="text-slate-400 font-bold uppercase text-[11px] tracking-wider mr-2">
                            {key}:
                          </span>
                          <span className="text-white font-medium text-left">
                            {String(specs[key])}
                          </span>
                        </div>
                      ));
                    })()
                  ) : (
                    <div className="border-b border-slate-800/40 pb-2.5 leading-relaxed">
                      <span className="text-slate-400 font-bold uppercase text-[11px] tracking-wider mr-2">Garantia:</span>
                      <span className="text-white font-medium text-left">Vitalícia contra defeitos</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                  <MapPin className="w-4 h-4" /> Calcular Frete e Prazo
                </div>
                
                <form onSubmit={handleCalculateShipping} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Digite seu CEP" 
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength={9}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 flex-1 font-mono tracking-wider"
                  />
                  <button 
                    type="submit"
                    disabled={calculating}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    {calculating ? 'Calculando...' : 'OK'}
                  </button>
                </form>

                {freteResults && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {freteResults.map((opt, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/50">
                        <div>
                          <span className="font-bold text-white uppercase">{opt.name}</span>
                          <span className="text-[10px] text-slate-400 block">{opt.deadline}</span>
                        </div>
                        <span className="font-bold text-amber-400">
                          R$ {opt.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest text-xs sm:text-sm py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <ShoppingBag className="w-4 h-4" /> Adicionar ao Carrinho
                </button>
                
                <div className="text-center pt-1">
                  <span className="text-[11px] text-slate-500">
                    Dúvidas sobre o produto? <a href="https://wa.me/554396831654" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline font-bold">Fale connosco no WhatsApp</a>
                  </span>
                </div>
              </div>

            </div>
          </div>

{/* SECÇÃO: VOCÊ TAMBÉM PODE GOSTAR */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-4">
              
              {/* IMAGEM DE QUEBRA DE PÁGINA */}
              <div className="w-full flex justify-center mb-10 pointer-events-none select-none">
                <img 
                  src="/quebra.png" 
                  alt="Quebra de página" 
                  className="w-full max-w-3xl opacity-80 object-contain" 
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase text-white mb-8 text-center tracking-widest">
                Você também pode gostar
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((item: any) => {
                  const itemPrice = Number(item.sale_price || item.price || 0);

                  return (
                    <Link 
                      key={item.id} 
                      href={`/produto/${item.id}`}
                      className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[8px] sm:text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                            {item.subcategory || 'Linha'}
                          </span>
                        </div>

                        <div className="relative aspect-square rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center overflow-hidden mb-4 group-hover:border-amber-500/40 transition-colors duration-300">
                          <div className="text-slate-600 text-[10px] sm:text-xs tracking-widest uppercase font-bold text-center px-2">
                            [ Foto do Produto ]
                          </div>
                        </div>

                        <h3 className="text-sm sm:text-base font-black uppercase text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 mt-4 border-t border-slate-800/80 gap-2">
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Valor</span>
                          <span className="text-sm sm:text-lg font-black text-amber-400">
                            R$ {itemPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <span className="bg-amber-500/10 text-amber-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 text-center">
                          Ver Peça
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* COMPONENTE DO FOOTER ADICIONADO AQUI, BEM NO FINAL DA PÁGINA */}
      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-bold tracking-widest uppercase text-xs text-amber-500">A carregar peça...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}