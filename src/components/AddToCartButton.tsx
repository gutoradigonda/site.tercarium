'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    estoqueMax: number;
    imageUrl?: string;
    category?: string;    // Ex: "TERÇOS", "ACESSORIOS"
    line?: string;        // Ex: "LINHA RAIZES"
    subcategory?: string; // Ex: "Cordões", "Pulseiras", "Dezenas" (ajuste para o nome exato da sua coluna no Supabase, ex: product.subcategory ou product.subcategoria)
  };
}

export function AddToCartButton({ product }: AddToCartProps) {
  const { addItem } = useCartStore();
  const isOutOfStock = product.estoqueMax <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      quantity: 1,
      estoqueMax: product.estoqueMax,
      imageUrl: product.imageUrl,
      category: product.category,
      line: product.line,
      subcategory: product.subcategory, // Passa a subcategoria para o estado
    });
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={`w-full font-black text-sm uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg ${
        isOutOfStock 
          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-amber-500/10 hover:shadow-amber-500/20'
      }`}
    >
      <ShoppingBag className="w-5 h-5" />
      {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
    </button>
  );
}