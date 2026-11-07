'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SortableGrid({ products }: { products: any[] }) {
  // Alterado o estado inicial para 'alfabetica'
  const [sort, setSort] = useState('alfabetica');

  // Proteção: Se não houver produtos, mostra o ecrã vazio
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 border border-slate-800/50 rounded-2xl bg-slate-900/20">
        <p className="text-slate-500 text-sm uppercase tracking-wider font-bold">
          Nenhum produto encontrado nesta linha no momento.
        </p>
      </div>
    );
  }

  // Lógica para ordenar os produtos baseada na seleção do utilizador
  const getSortedProducts = () => {
    let sorted = [...products];

    switch (sort) {
      case 'alfabetica':
        // Ordenação Alfabética (A-Z) pelo nome do produto
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'menor-preco':
        sorted.sort((a, b) => Number(a.sale_price || a.price || 0) - Number(b.sale_price || b.price || 0));
        break;
      case 'maior-preco':
        sorted.sort((a, b) => Number(b.sale_price || b.price || 0) - Number(a.sale_price || a.price || 0));
        break;
      case 'recentes':
      default:
        // Assume que IDs maiores são os produtos mais recentes inseridos no banco
        sorted.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }
    return sorted;
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="w-full">
      {/* Barra de Ordenação */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-slate-800/80 pb-4 gap-4">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          {products.length} Produtos
        </span>
        
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-bold">
            Ordenar por:
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-xs py-2.5 px-3 rounded-xl focus:outline-none focus:border-amber-500 uppercase tracking-wider cursor-pointer transition-colors"
          >
            {/* Novas opções de ordenação com Alfabética como padrão */}
            <option value="alfabetica">Ordem Alfabética (A-Z)</option>
            <option value="recentes">Mais Recentes</option>
            <option value="menor-preco">Preço: Menor para Maior</option>
            <option value="maior-preco">Preço: Maior para Menor</option>
          </select>
        </div>
      </div>

      {/* Grelha de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((item: any) => {
          const productPrice = Number(item.sale_price || item.price || 0);

          return (
            <Link 
              key={item.id} 
              href={`/produto/${item.id}`}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                    {item.subcategory || 'Linha'}
                  </span>
                  <span className="text-[8px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                    {item.code || item.id}
                  </span>
                </div>

                <div className="relative aspect-square rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center overflow-hidden mb-4 group-hover:border-amber-500/40 transition-colors duration-300">
                  <div className="text-slate-600 text-xs tracking-widest uppercase font-bold text-center px-2">
                    [ Foto do Produto ]
                  </div>
                </div>

                <h3 className="text-base font-black uppercase text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 leading-tight">
                  {item.name}
                </h3>
              </div>
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Valor</span>
                  <span className="text-lg font-black text-amber-400">
                    R$ {productPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  Ver Peça
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}