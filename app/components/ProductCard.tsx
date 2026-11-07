'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      price: product.sale_price || 0,
    });
  };

  return (
    <Link 
      href={`/produto/${product.id}`}
      className={`bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 block cursor-pointer h-full group/card flex flex-col justify-between ${montserrat.className}`}
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
            {product.category || 'Arsenal'}
          </span>
          <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
            {product.code || product.id}
          </span>
        </div>

        {/* Imagem / Placeholder do Produto */}
        <div className="relative aspect-square rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center overflow-hidden mb-4 group-hover/card:border-amber-500/40 transition-colors duration-300">
          <div className="text-slate-600 text-xs tracking-widest uppercase font-bold text-center px-2">
            [ Foto do Produto ]
          </div>
        </div>

        <h3 className="text-base font-black uppercase text-white group-hover/card:text-amber-400 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
      </div>
      
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Valor</span>
          <span className="text-lg font-black text-amber-400">
            R$ {Number(product.sale_price || 0).toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <button 
          onClick={handleQuickAdd}
          className="bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider p-2.5 rounded-xl hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          title="Adicionar ao Carrinho"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </Link>
  );
}