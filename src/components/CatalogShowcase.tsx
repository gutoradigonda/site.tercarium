'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../app/components/ProductCard';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const CatalogShowcase = ({ products }: { products: any[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const featuredProducts = products.slice(0, 8);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className={`w-full bg-slate-950 pb-10 pt-0 px-6 md:px-12 lg:px-20 relative overflow-hidden ${montserrat.className}`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="w-full flex justify-center items-center pb-10 -mt-2 sm:-mt-4 z-10 relative">
        <img 
          src="/quebra.png" 
          alt="Divisor Minimalista" 
          className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] object-contain" 
        />
      </div>

      <div className="flex flex-col items-center justify-center mb-10 text-center space-y-2">
        <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">
          Seleção de Elite
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Os Mais Vendidos
        </h2>
        <div className="w-16 h-1 bg-amber-500 mt-1"></div>
      </div>

      {featuredProducts.length === 0 ? (
        <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
          O arsenal está vazio.
        </div>
      ) : (
        <div className="relative group/carousel -mx-4 px-4 sm:mx-0 sm:px-0">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-5 z-30 bg-slate-900/90 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-500 p-3 rounded-full shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-all cursor-pointer backdrop-blur-sm hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-2 pt-2 scroll-smooth hide-scrollbar"
          >
            {featuredProducts.map((product) => {
              const safeProduct = {
                ...product,
                model: product.model || product.name || 'Sem Nome',
                image: product.imagens_galeria && product.imagens_galeria.length > 0 
                  ? product.imagens_galeria[0] 
                  : (product.image || product.imageUrl)
              };

              return (
                <div 
                  key={product.id} 
                  className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.33rem)] lg:w-[calc(25%-1.5rem)] 2xl:w-[calc(20%-1.6rem)]"
                >
                  <ProductCard product={safeProduct} />
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-5 z-30 bg-slate-900/90 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-amber-500 p-3 rounded-full shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-all cursor-pointer backdrop-blur-sm hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      )}
    </section>
  );
};