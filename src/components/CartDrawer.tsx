'use client';

import React from 'react';
import { useCart } from '@/src/context/CartContext';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fundo escurecido */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl">
          
          {/* Cabeçalho da Gaveta */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black uppercase tracking-wider text-white">Seu Carrinho</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lista de Produtos no Carrinho */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="text-slate-400 text-sm">O seu carrinho está vazio.</p>
                <button 
                  onClick={onClose}
                  className="inline-block bg-slate-800 hover:bg-slate-700 text-amber-500 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-colors"
                >
                  Continuar a Comprar
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl items-center">
                  <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 shrink-0">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Terço</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">{item.category}</span>
                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                    <span className="text-xs text-amber-400 font-bold block mt-1">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé com Totais e Botão de Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/40 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">Subtotal:</span>
                <span className="text-2xl font-black text-amber-400">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <Link 
                href="/checkout"
                onClick={onClose}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 text-center"
              >
                Avançar para o Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};