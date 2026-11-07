'use client';

import { useState } from 'react';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { useCartStore } from '../../src/store/cartStore';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem } = useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = items.reduce((acc, item) => acc + (item.basePrice + (item.extraPrice || 0)) * item.quantity, 0);

  return (
    <>
      {/* Botão do Cabeçalho com cor visível garantida (text-slate-300) */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5 text-amber-500" />
        <span>Carrinho ({totalItems})</span>
      </button>

      {/* Fundo escuro quando a gaveta abre */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* A Gaveta (Sidebar) com o tema escuro da Terçarium */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-slate-950 text-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col border-l border-slate-800 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <ShoppingBag className="w-6 h-6 text-amber-500" />
            Seu Pedido
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-amber-500 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-slate-500 mt-10 text-sm uppercase tracking-wider font-bold">
              O seu carrinho está vazio.
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-slate-800 pb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-white uppercase text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">Qtd: {item.quantity}</p>
                    {item.observacao && <p className="text-xs text-amber-500 mt-1">Obs: {item.observacao}</p>}
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <span className="font-black text-amber-400 text-sm">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.basePrice * item.quantity)}
                    </span>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-500 text-sm flex justify-end cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé da Gaveta */}
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-medium uppercase text-xs tracking-wider">Total</span>
            <span className="text-2xl font-black text-amber-400">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
            </span>
          </div>
          <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-xl transition-all cursor-pointer text-sm uppercase tracking-widest shadow-lg">
            Finalizar Compra via WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}