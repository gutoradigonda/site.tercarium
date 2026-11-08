'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCard({ product }: { product: any }) {
  const [imgIndex, setImgIndex] = useState(0);

  const imagesArray = Array.isArray(product.imagens_galeria) && product.imagens_galeria.length > 0 
    ? product.imagens_galeria 
    : [product.image || product.imageUrl].filter(Boolean);

  const hasMultipleImages = imagesArray.length > 1;
  const currentImage = imagesArray[imgIndex];

  // Lógica exata de preços idêntica à página de detalhes do produto
  const precoAntigo = Number(product.sale_price) || 0;
  const precoPromo = Number(product.preco_promocional) || 0;
  const precoExibicao = precoPromo > 0 ? precoPromo : precoAntigo;
  const hasDiscount = precoPromo > 0 && precoPromo < precoAntigo;

  // Cálculo da percentagem de desconto para o selo
  const descontoPercentual = hasDiscount ? Math.round(((precoAntigo - precoPromo) / precoAntigo) * 100) : 0;

  // Cálculos comerciais adicionais (Parcelamento em até 3x e Estimativa Pix com 5% de desconto)
  const valorParcela = (precoExibicao / 3).toFixed(2).replace('.', ',');
  const valorPix = (precoExibicao * 0.95).toFixed(2).replace('.', ',');

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % imagesArray.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };

  return (
    <Link 
      href={`/produto/${product.code || product.id}`}
      className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 sm:p-5 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group flex flex-col justify-between cursor-pointer h-full relative overflow-hidden"
    >
      <div>
        {/* Cabeçalho do Card: Oculto no mobile, visível no desktop (sm:flex) */}
        <div className="hidden sm:flex justify-between items-start mb-3">
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">
            {product.subcategory || product.category || 'Linha'}
          </span>
          <span className="text-[8px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
            {product.code || product.id}
          </span>
        </div>

        {/* Container da Imagem com Carrossel e Selo de Desconto */}
        <div className="relative aspect-square rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center overflow-hidden mb-3 sm:mb-4 group-hover:border-amber-500/40 transition-colors duration-300 group/img">
          
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-red-600 text-white font-black text-[9px] px-2 py-1 rounded-md uppercase tracking-wider z-20 shadow-md">
              -{descontoPercentual}% OFF
            </span>
          )}

          {currentImage ? (
            <>
              <img 
                src={currentImage} 
                alt={product.model || product.name} 
                className="w-full h-full object-cover transition-transform duration-500"
              />
              
              {hasMultipleImages && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-950/80 p-1.5 rounded-full text-slate-300 opacity-0 group-hover/img:opacity-100 hover:bg-amber-500 hover:text-slate-950 transition-all z-10 shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-950/80 p-1.5 rounded-full text-slate-300 opacity-0 group-hover/img:opacity-100 hover:bg-amber-500 hover:text-slate-950 transition-all z-10 shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {imagesArray.map((_: string, idx: number) => (
                      <div 
                        key={idx} 
                        className={`transition-all duration-300 rounded-full ${
                          idx === imgIndex ? 'w-3 h-1.5 bg-amber-500' : 'w-1.5 h-1.5 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-slate-600 text-xs tracking-widest uppercase font-bold text-center px-2">
              [ Foto ]
            </div>
          )}
        </div>

        {/* Nome do Produto: Fonte ajustada para mobile (text-xs) e mantida robusta no desktop (sm:text-base) */}
        <h3 className="text-xs sm:text-base font-black uppercase text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 leading-tight">
          {product.model || product.name}
        </h3>
      </div>
      
      {/* Rodapé do Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-800/80 gap-2">
        <div>
          <span className="hidden sm:block text-[9px] text-slate-400 uppercase tracking-wider">Valor</span>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            {hasDiscount && (
              <span className="text-[10px] sm:text-xs text-slate-500 line-through font-medium">
                R$ {precoAntigo.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-sm sm:text-lg font-black text-amber-400">
              R$ {precoExibicao.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Informações sutis de Parcelamento e Pix */}
          <div className="text-[10px] text-slate-400 mt-0.5 space-y-0.5">
            <p className="text-slate-300">ou 3x de R$ {valorParcela}</p>
            <p className="text-emerald-400 font-medium">R$ {valorPix} no Pix</p>
          </div>
        </div>

        {/* Botão Ver Peça: Oculto no telemóvel (já que o card todo é clicable), visível apenas no desktop */}
        <span className="hidden sm:inline-block bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 text-center">
          Ver Peça
        </span>
      </div>
    </Link>
  );
}
