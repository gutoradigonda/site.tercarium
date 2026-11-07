import React from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const Footer: React.FC = () => {
  return (
    <footer className={`w-full bg-white text-slate-800 pt-16 pb-12 px-6 md:px-12 lg:px-20 border-t border-slate-200 relative overflow-hidden ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Caixa de Newsletter / Clube Terçarium */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-xl space-y-2">
            <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
              Clube Terçarium
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Receba Novidades e <span className="text-amber-400">10% OFF</span> na 1ª Compra
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Cadastre-se para garantir acesso antecipado a lançamentos e peças exclusivas de combate espiritual.
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="O seu melhor e-mail" 
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-800-500 w-full sm:w-72"
            />
            <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all shadow-lg cursor-pointer whitespace-nowrap">
              Garantir Cupom
            </button>
          </div>
        </div>

        {/* Links e Informações do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Coluna 1: Marca (2 colunas em lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-lg font-black tracking-[0.2em] uppercase text-slate-950">
              Terçarium
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Terços artesanais de alta resistência. Forjados com Paracord 550, pedras naturais e metais maciços para acompanhar a sua armadura espiritual todos os dias.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-white flex items-center justify-center text-slate-700 transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://wa.me/554396831654" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-white flex items-center justify-center text-slate-700 transition-colors" title="WhatsApp">
                <span className="text-xs font-bold">W</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Arsenal */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-950">Arsenal</h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><Link href="/linha/raizes" className="hover:text-amber-600 transition-colors">Linha Raízes</Link></li>
              <li><Link href="/linha/fidelis" className="hover:text-amber-600 transition-colors">Linha Fidelis</Link></li>
              <li><Link href="/linha/essencia" className="hover:text-amber-600 transition-colors">Linha Essência</Link></li>
              <li><Link href="/catalogo" className="hover:text-amber-600 transition-colors">Catálogo Completo</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-950">Atendimento</h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><Link href="/rastreio" className="hover:text-amber-600 transition-colors">Rastrear Pedido</Link></li>
              <li><Link href="/garantia" className="hover:text-amber-600 transition-colors">Compra Garantida</Link></li>
              <li><Link href="/trocas" className="hover:text-amber-600 transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="/contato" className="hover:text-amber-600 transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Ateliê */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-950">Ateliê</h5>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p className="font-bold text-slate-900">Londrina, PR - Brasil</p>
              <p>Envios seguros para todo o país via Correios e Transportadoras.</p>
              <p className="text-[11px] text-slate-500 pt-1">Atendimento via WhatsApp de Seg. a Sex. das 9h às 18h.</p>
            </div>
          </div>

        </div>

        {/* Linha Divisória e Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Terçarium Ateliê. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacidade" className="hover:text-slate-900 transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-slate-900 transition-colors">Termos de Serviço</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};