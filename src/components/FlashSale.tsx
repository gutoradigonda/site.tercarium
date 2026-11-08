'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const FlashSale = ({ products }: { products: any[] }) => {
  const [imgIndex, setImgIndex] = useState(0);
  
  const product = products?.find(p => {
    const base = Number(p.sale_price || p.price || 0);
    const promo = Number(p.preco_promocional || 0);
    return promo > 0 && promo < base;
  });

  if (!product) return null;

  const imagesArray = Array.isArray(product.imagens_galeria) && product.imagens_galeria.length > 0 
    ? product.imagens_galeria 
    : [product.image || product.imageUrl].filter(Boolean);
  
  const hasMultipleImages = imagesArray.length > 1;
  const currentImage = imagesArray[imgIndex];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgIndex((prev) => (prev + 1) % imagesArray.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };

  const precoAntigo = Number(product.sale_price || product.price || 0);
  const precoPromo = Number(product.preco_promocional || 0);
  const precoExibicao = precoPromo; 
  const descontoPercentual = Math.round(((precoAntigo - precoPromo) / precoAntigo) * 100);
  const descontoPix = precoExibicao * 0.95;

  return (
    <section className={`w-full bg-slate-950 py-10 px-6 md:px-12 lg:px-20 ${montserrat.className}`}>
      
      <div className="flex flex-col items-center justify-center mb-8 text-center space-y-1.5">
        <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] uppercase flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 fill-amber-500" />
          Oferta por Tempo Limitado
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Promoção Relâmpago
        </h2>
        <div className="w-12 h-1 bg-amber-500 mt-1"></div>
      </div>

      <div className="max-w-4xl mx-auto bg-[#0B101E] border border-amber-500/30 rounded-3xl overflow-hidden hover:border-amber-500/60 transition-all duration-500 shadow-2xl flex flex-col md:flex-row group">
        
        {/* CORREÇÃO: Removida a altura fixa. Adicionado min-h-[350px] para telemóvel e absolute inset-0 na imagem */}
        <div className="w-full md:w-1/2 relative min-h-[350px] bg-slate-900/50 border-b md:border-b-0 md:border-r border-slate-800/60 group/img overflow-hidden">
          
          <span className="absolute top-5 left-5 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-widest z-20 shadow-lg">
            -{descontoPercentual}% OFF
          </span>
          
          {currentImage ? (
            <>
              <img 
                src={currentImage} 
                alt={product.model || product.name} 
                /* CORREÇÃO AQUI: absolute inset-0 força a imagem a colar nos 4 cantos perfeitos do espaço */
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              
              {hasMultipleImages && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-950/80 p-1.5 rounded-full text-slate-300 opacity-0 group-hover/img:opacity-100 hover:bg-amber-500 hover:text-slate-950 transition-all z-20 shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-950/80 p-1.5 rounded-full text-slate-300 opacity-0 group-hover/img:opacity-100 hover:bg-amber-500 hover:text-slate-950 transition-all z-20 shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                    {imagesArray.map((_: string, idx: number) => (
                      <div 
                        key={idx} 
                        className={`transition-all duration-300 rounded-full ${
                          idx === imgIndex ? 'w-3 h-1 bg-amber-500' : 'w-1.5 h-1 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center text-slate-700 font-bold tracking-widest uppercase text-xs">
              [ FOTO DO PRODUTO ]
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          
          <div className="mb-3">
            <span className="text-amber-500 text-[9px] font-black uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 inline-block">
              O Campeão de Devoção
            </span>
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-black uppercase text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors duration-300">
            {product.model || product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-slate-400 text-[10px] ml-1.5 font-medium uppercase tracking-wider">Oferta Especial</span>
          </div>

          {product.description && (
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-6">
              {product.description}
            </p>
          )}

          <div className="mt-auto bg-slate-950/50 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-4">
            
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">Valor Promocional</span>
              
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-3xl font-black text-amber-500 whitespace-nowrap">
                  R$ {precoExibicao.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm text-slate-500 line-through font-medium whitespace-nowrap">
                  R$ {precoAntigo.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <p className="text-slate-400 text-[10px] mb-1">
                em até <strong className="text-white">3x de R$ {(precoExibicao / 3).toFixed(2).replace('.', ',')}</strong> sem juros
              </p>
              <p className="text-emerald-400 text-[10px] font-bold">
                ✦ R$ {descontoPix.toFixed(2).replace('.', ',')} no Pix (5% OFF)
              </p>
            </div>

            <Link 
              href={`/produto/${product.code || product.id}`}
              className="w-full flex items-center justify-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 text-center"
            >
              Ver Detalhes
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
};