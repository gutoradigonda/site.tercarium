'use client';

import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export default function ProductGallery({ images, category }: { images: string[], category: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeImages = images.length > 0 ? images : [''];

  return (
    <div className={`bg-[#0B101E] rounded-3xl border border-slate-800/60 p-4 sm:p-6 flex flex-col h-full ${montserrat.className}`}>
      {/* Selo Categoria */}
      <div className="flex items-center justify-between mb-4">
        <span className="border border-amber-500 text-amber-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-transparent">
          {category}
        </span>
      </div>
      
      {/* Imagem Principal */}
      <div className="aspect-square bg-[#050810] rounded-2xl border border-slate-800/40 overflow-hidden mb-4 relative">
        {safeImages[currentIndex] ? (
          <img 
            src={safeImages[currentIndex]} 
            alt="Produto" 
            className="w-full h-full object-cover transition-opacity duration-300" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-700 text-xs font-bold tracking-widest uppercase">
            [ Foto do Produto ]
          </div>
        )}
      </div>

      {/* Miniaturas ajustadas para ocupar toda a largura */}
      {images.length > 1 && (
        <div className="grid gap-2.5 mb-6" style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}>
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)} 
              className={`aspect-square rounded-xl border-2 overflow-hidden transition-all cursor-pointer w-full ${
                currentIndex === idx ? 'border-amber-500 opacity-100 scale-[1.02] shadow-lg shadow-amber-500/20' : 'border-slate-800/60 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Bloco de Rigor Artesanal (Sem menção a garantia vitalícia) */}
      <div className="bg-[#050810]/70 border border-slate-800/60 rounded-2xl p-4 mb-6 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h4 className="text-amber-500 text-xs font-black uppercase tracking-wider mb-0.5">
            Tradição e Rigor Artesanal
          </h4>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Cada peça passa por um rigoroso processo de montagem manual para assegurar firmeza e imponência.
          </p>
        </div>
      </div>

      {/* Ícones Inferiores */}
      <div className="grid grid-cols-3 gap-3 mt-auto">
        <div className="bg-transparent border border-slate-800/60 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/30 transition-colors">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Alta Resistência</span>
        </div>
        <div className="bg-transparent border border-slate-800/60 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/30 transition-colors">
          <Truck className="w-5 h-5 text-amber-500" />
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Envio Seguro</span>
        </div>
        <div className="bg-transparent border border-slate-800/60 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:border-amber-500/30 transition-colors">
          <RotateCcw className="w-5 h-5 text-amber-500" />
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Feito à Mão</span>
        </div>
      </div>
    </div>
  );
}