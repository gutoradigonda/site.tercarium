'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingBag, X, Trash2, Plus, Minus, MapPin, Ticket } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
});

export default function Cart() {
  const { items, removeItem, updateQuantity, isOpen, openCart, closeCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const formatarTitulo = (category?: string, line?: string, name?: string, subcategory?: string) => {
    const catLower = category ? category.toLowerCase().trim() : '';

    if (catLower.includes('acessorio') || catLower.includes('acessórios')) {
      let subLimpa = subcategory ? subcategory.toLowerCase().trim() : '';
      
      if (subLimpa === 'cordões' || subLimpa === 'cordoes') subLimpa = 'Cordão';
      else if (subLimpa === 'pulseiras') subLimpa = 'Pulseira';
      else if (subLimpa === 'dezenas') subLimpa = 'Dezena';
      else if (subLimpa) {
        subLimpa = subLimpa.charAt(0).toUpperCase() + subLimpa.slice(1);
      } else {
        subLimpa = 'Cordão';
      }

      const modeloFormatado = name ? name.toLowerCase().split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ') : '';
      
      return [subLimpa, modeloFormatado].filter(Boolean).join(' ');
    }

    const linhaLimpa = line ? line.replace(/linha/gi, '').trim() : '';
    const linhaFormatada = linhaLimpa ? linhaLimpa.charAt(0).toUpperCase() + linhaLimpa.slice(1).toLowerCase() : '';
    const modeloFormatado = name ? name.toLowerCase().split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ') : '';

    return ['Terço', linhaFormatada, modeloFormatado].filter(Boolean).join(' ');
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + (item.basePrice + (item.extraPrice || 0)) * item.quantity, 0);
  
  const frete = 0; 
  const desconto = 0;
  const total = subtotal + frete - desconto;

  const cartDrawer = mounted ? createPortal(
    <div className={montserrat.className}>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-[9998] transition-opacity"
          onClick={closeCart}
        />
      )}

      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-[#050810] border-l border-slate-800/60 flex flex-col transform transition-transform duration-300 z-[9999] shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        
        {/* CABEÇALHO */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60 bg-[#0B101E] shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Seu Carrinho</h2>
          </div>
          <button onClick={closeCart} className="text-slate-500 hover:text-amber-500 transition-colors p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ÁREA ROLÁVEL */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-10 h-10 text-slate-800 mx-auto" />
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">O seu carrinho está vazio.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-transparent border-b border-slate-800/40 pb-4 items-start">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover border border-slate-800 shrink-0" />
                    ) : (
                      <div className="w-16 h-16 bg-slate-900/50 rounded-md flex items-center justify-center border border-slate-800 shrink-0">
                        <span className="text-[9px] text-slate-600 font-bold uppercase">Foto</span>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-slate-200 tracking-wide">
                          {formatarTitulo(item.category, item.line, item.name, item.subcategory)}
                        </h4>
                        <button onClick={() => removeItem(item.id)} className="text-slate-600 hover:text-red-500 transition-colors cursor-pointer shrink-0 mt-0.5">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <span className="text-xs text-amber-500 font-black block mt-1">
                        R$ {item.basePrice.toFixed(2).replace('.', ',')}
                      </span>
                      {item.observacao && <p className="text-[10px] text-slate-500 mt-1 truncate">Obs: {item.observacao}</p>}
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-3 bg-[#0B101E] border border-slate-800/60 rounded px-2 py-0.5">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-500 hover:text-white cursor-pointer"><Minus className="w-3 h-3" /></button>
                          <span className="text-[11px] font-bold text-slate-300 w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-white cursor-pointer"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* MÓDULOS DE FRETE E CUPÃO */}
                <div className="pt-4 space-y-5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> Meios de envio
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Seu CEP" 
                        maxLength={9}
                        className="flex-1 bg-[#0B101E] border border-slate-800/60 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors uppercase" 
                      />
                      <button className="bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold px-5 rounded-lg transition-colors cursor-pointer uppercase tracking-wider">
                        Calcular
                      </button>
                    </div>
                    {/* Link corrigido para o Buscador de CEP oficial dos Correios */}
                    <a 
                      href="http://www.buscacep.correios.com.br/sistemas/buscacep/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-slate-500 hover:text-amber-500 underline mt-2 inline-block transition-colors"
                    >
                      Não sei meu CEP
                    </a>
                  </div>

                  <div className="border-t border-slate-800/40 pt-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Ticket className="w-3.5 h-3.5" /> Cupom de Desconto
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Código do cupom" 
                        className="flex-1 bg-[#0B101E] border border-slate-800/60 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors uppercase" 
                      />
                      <button className="bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold px-5 rounded-lg transition-colors cursor-pointer uppercase tracking-wider">
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RODAPÉ */}
        {items.length > 0 && (
          <div className="p-6 bg-[#0B101E] border-t border-slate-800/60 shrink-0">
            <div className="space-y-2.5 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Subtotal (sem frete):</span>
                <span className="text-slate-200 font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Frete:</span>
                <span className="text-slate-500 italic">Calcule para ver</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-800/40 mt-2">
                <span className="text-slate-300 font-bold uppercase tracking-wider">Total:</span>
                <span className="text-amber-500 font-black text-lg">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-right text-[10px] text-emerald-400 font-medium mt-1">
                Ou R$ {(total * 0.95).toFixed(2).replace('.', ',')} no Pix
              </p>
            </div>

            <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest py-3.5 rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center gap-2 text-xs cursor-pointer">
              Finalizar Compra
            </button>
            <button className="w-full mt-3 text-[10px] text-slate-400 hover:text-white uppercase tracking-widest underline cursor-pointer pb-2" onClick={closeCart}>
              Ver mais produtos
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className={montserrat.className}>
      <button onClick={openCart} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer">
        <ShoppingBag className="w-5 h-5 text-amber-500" />
        <span>Carrinho ({totalItems})</span>
      </button>

      {cartDrawer}
    </div>
  );
}