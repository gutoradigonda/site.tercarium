'use client';

import React, { useState } from 'react';
import ProductCard from '@/app/components/ProductCard'; // <-- Importamos o card oficial aqui!

export default function SortableGrid({ products }: { products: any[] }) {
  const [sort, setSort] = useState('alfabetica');

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 border border-slate-800/50 rounded-2xl bg-slate-900/20">
        <p className="text-slate-500 text-sm uppercase tracking-wider font-bold">
          Nenhum produto encontrado nesta linha no momento.
        </p>
      </div>
    );
  }

  const getSortedProducts = () => {
    let sorted = [...products];

    switch (sort) {
      case 'alfabetica':
        sorted.sort((a, b) => (a.model || a.name || '').localeCompare(b.model || b.name || ''));
        break;
      case 'menor-preco':
        sorted.sort((a, b) => Number(a.sale_price || a.price || 0) - Number(b.sale_price || b.price || 0));
        break;
      case 'maior-preco':
        sorted.sort((a, b) => Number(b.sale_price || b.price || 0) - Number(a.sale_price || a.price || 0));
        break;
      case 'recentes':
      default:
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
            <option value="alfabetica">Ordem Alfabética (A-Z)</option>
            <option value="recentes">Mais Recentes</option>
            <option value="menor-preco">Preço: Menor para Maior</option>
            <option value="maior-preco">Preço: Maior para Menor</option>
          </select>
        </div>
      </div>

      {/* Grelha de Produtos com o Card Oficial (que já tem promoções!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((item: any) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}