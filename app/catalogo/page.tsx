'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/src/lib/supabase';
import Link from 'next/link';
import { ChevronLeft, Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialSub = searchParams.get('linha') || 'todos';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSub);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('produtos')
        .select('*');

      if (error) {
        console.error('Erro ao buscar produtos:', error.message);
      }

      if (data) {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // Extrai dinamicamente as subcategorias únicas do Supabase
  const subcategories = ['todos', ...Array.from(new Set(products.map(p => p.subcategory).filter(Boolean)))];

  // Filtra os produtos com base na aba selecionada
  const filteredProducts = selectedSubcategory === 'todos' 
    ? products 
    : products.filter(p => p.subcategory === selectedSubcategory);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-10">
      
      {/* Título e Seletor de Subcategorias (Abas / Pílulas) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800/80">
        <div>
          <span className="text-amber-500 font-bold tracking-[0.2em] text-xs uppercase block mb-1">
            Arsenal Completo
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">
            {selectedSubcategory === 'todos' ? 'Todas as Peças' : selectedSubcategory}
          </h2>
        </div>

        {/* Abas de Filtro */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500 mr-1 hidden sm:inline" />
          {subcategories.map((sub) => {
            const isActive = selectedSubcategory === sub;
            const label = sub === 'todos' ? 'Todos' : sub;

            return (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Estado de Carregamento */}
      {loading ? (
        <div className="text-center py-20">
          <div className="text-amber-500 font-bold uppercase tracking-widest text-xs animate-pulse">
            Carregando arsenal do ateliê...
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-sm uppercase tracking-wider font-bold">Nenhuma peça encontrada nesta linha.</p>
        </div>
      ) : (
        /* Grelha de Produtos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((item: any) => {
            const productPrice = Number(item.sale_price || item.price || 0);

            return (
              <Link 
                key={item.id} 
                href={`/produto/${item.id}`}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-800-500/50 transition-all group flex flex-col justify-between shadow-xl cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                      {item.subcategory || item.category || 'Arsenal'}
                    </span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                      {item.code || item.id}
                    </span>
                  </div>

                  {/* Placeholder da Foto */}
                  <div className="relative aspect-square rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center overflow-hidden mb-4 group-hover:border-slate-800-500/35 transition-colors">
                    <div className="text-slate-600 text-xs tracking-widest uppercase font-bold text-center px-2">
                      [ Foto do Produto ]
                    </div>
                  </div>

                  <h3 className="text-lg font-black uppercase text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Valor</span>
                    <span className="text-xl font-black text-amber-400">
                      R$ {productPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  
                  <span className="bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    Ver Peça
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Cabeçalho */}
      <header className="bg-slate-950/90 backdrop-blur-md py-6 px-6 md:px-12 lg:px-20 border-b border-slate-800/50 sticky top-0 z-40">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Início
          </Link>
          <h1 className="text-lg font-black tracking-widest text-amber-500 uppercase">
            Catálogo • Terçarium
          </h1>
          <span className="text-xs text-slate-400 uppercase tracking-widest hidden sm:inline">
            Alta Resistência
          </span>
        </div>
      </header>

      {/* Envolve o conteúdo que usa useSearchParams num Suspense boundary */}
      <Suspense fallback={<div className="text-center py-20 text-amber-500 font-bold uppercase tracking-widest text-xs">A carregar catálogo...</div>}>
        <CatalogContent />
      </Suspense>
    </main>
  );
}