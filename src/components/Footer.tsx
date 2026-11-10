import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import { NAV_LINKS } from '@/src/lib/navigation';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const Footer: React.FC = () => {
  return (
    <footer className={`w-full bg-slate-950 text-slate-300 pt-16 pb-6 px-6 md:px-12 lg:px-20 border-t border-slate-900 relative overflow-hidden ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto">

        {/* Grid de 6 colunas alinhadas horizontalmente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          
          {/* 1. Logomarca e Redes */}
          <div className="space-y-4">
            <Link href="/" className="flex justify-center -mt-10">
              <Image 
                src="/logo.png" 
                alt="Terçarium" 
                width={546} 
                height={156} 
                className="h-32 w-auto object-contain"
                priority
              />
            </Link>
            
            <p className="-mt-5 text-slate-400 text-xs leading-relaxed text-center">
              Exclusividade em cada oração
            </p>

            <div className="flex items-center justify-center gap-3 pt-1">
              {/* Instagram Oficial */}
              <a 
                href="https://instagram.com/tercarium" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#E4405F] hover:text-white flex items-center justify-center text-slate-300 transition-all duration-300 border border-slate-800 shadow-sm hover:scale-105" 
                title="Instagram"
                aria-label="Instagram da Terçarium"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook Oficial */}
              <a 
                href="https://facebook.com/tercarium" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-slate-300 transition-all duration-300 border border-slate-800 shadow-sm hover:scale-105" 
                title="Facebook"
                aria-label="Facebook da Terçarium"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 2, 3 e 4. Colunas de Navegação */}
          {NAV_LINKS.map((section: any, idx: number) => (
            <div key={idx} className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-white">
                {section.title}
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {section.items.map((item: any, itemIdx: number) => (
                  <li key={itemIdx}>
                    <Link href={item.href} className="hover:text-amber-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 5. Atendimento */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-white">Atendimento</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/trocas" className="hover:text-amber-400 transition-colors">Trocas e Devoluções</Link></li>
              <li>
                <a 
                  href="https://wa.me/554396831654?text=Ol%C3%A1%20Ter%C3%A7arium%2C%20tudo%20bem%3F%20Vim%20atrav%C3%A9s%20do%20FALE%20CONOSCO%20do%20site." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors"
                >
                  Fale Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* 6. Ateliê */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-white">Ateliê</h5>
            <div className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
              <p className="font-bold text-slate-200">Londrina, PR</p>
              <p>Envios seguros para todo o Brasil.</p>
              
              <div className="pt-2 space-y-0.5">
                <p className="font-bold text-slate-200 text-xs">Atendimento WhatsApp</p>
                <p className="text-[11px] text-slate-500">Seg. a Sex. das 9h às 18h.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Linha Divisória e Barra Inferior */}
        <div className="pt-5 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          {/* Copyright à esquerda */}
          <p className="order-2 md:order-1 text-center md:text-left">
            © 2026 Terçarium. Todos os direitos reservados.
          </p>

          {/* Bandeiras dos Meios de Pagamento */}
          <div className="order-1 md:order-2 flex items-center justify-center flex-wrap gap-2.5">
            <Image 
              src="/pix.png" 
              alt="Pix" 
              width={96} 
              height={58} 
              className="h-[29px] w-auto object-contain rounded-[5px] shadow-sm" 
            />
            <Image 
              src="/visa.png" 
              alt="Visa" 
              width={96} 
              height={58} 
              className="h-[29px] w-auto object-contain rounded-[5px] shadow-sm" 
            />
            <Image 
              src="/master.png" 
              alt="Mastercard" 
              width={96} 
              height={58} 
              className="h-[29px] w-auto object-contain rounded-[5px] shadow-sm" 
            />
            <Image 
              src="/elo.png" 
              alt="Elo" 
              width={96} 
              height={58} 
              className="h-[29px] w-auto object-contain rounded-[5px] shadow-sm" 
            />
            <Image 
              src="/hipercard.png" 
              alt="Hipercard" 
              width={96} 
              height={58} 
              className="h-[29px] w-auto object-contain rounded-[5px] shadow-sm" 
            />
            <Image 
              src="/amex.png" 
              alt="American Express" 
              width={96} 
              height={58} 
              className="h-[29px] w-auto object-contain rounded-[5px] shadow-sm" 
            />
          </div>

          {/* Políticas à direita */}
          <div className="order-3 flex items-center gap-6">
            <Link href="/privacidade" className="hover:text-slate-300 transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-slate-300 transition-colors">Termos de Serviço</Link>
          </div>

        </div>

      </div>
    </footer>
  );
};