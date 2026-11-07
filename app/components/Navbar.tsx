'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ShoppingBag } from 'lucide-react';
import Cart from './Cart';
import { Cinzel_Decorative, Montserrat } from 'next/font/google';

// Importando a fonte Cinzel Decorative para o logótipo
const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['700', '900'],
});

// Importando a fonte Montserrat para os menus
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
});

// Componente interno que lida com o estado e rotas
function NavbarContent() {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao mudar de página
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isSolid = isHovered || isScrolled;

  // Função para resetar e voltar ao topo da Home
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <header 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isSolid 
            ? 'bg-slate-950/95 backdrop-blur-md py-4 border-b border-slate-800/50 shadow-xl' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">
          
          {/* Lado Esquerdo: Botão Mobile Hambúrguer + Logótipo + Menu Desktop Alinhado à Esquerda */}
          <div className="flex items-center gap-6 lg:gap-10">
            
            {/* Botão Hambúrguer (Visível apenas no Telemóvel) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-amber-400 p-1 hover:text-amber-300 transition-colors focus:outline-none"
              aria-label="Abrir Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* LOGÓTIPO */}
            <a 
              href="/" 
              onClick={handleLogoClick}
              className={`${cinzelDecorative.className} text-amber-400 font-bold text-lg sm:text-xl md:text-2xl tracking-[0.10em] uppercase cursor-pointer select-none shrink-0`}
            >
              Terçarium
            </a>

            {/* MENU DESKTOP (Alinhado harmoniosamente à esquerda, logo após o logo) */}
            <nav className={`hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold tracking-widest text-slate-300 ${montserrat.className}`}>
              
              {/* Dropdown Terços */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer outline-none font-semibold uppercase">
                  Terços <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <div className="absolute top-full left-0 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Link href="/linha/raizes" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Linha Raízes</Link>
                  <Link href="/linha/essencia" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Linha Essência</Link>
                  <Link href="/linha/fidelis" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Linha Fidelis</Link>
                </div>
              </div>

              {/* Dropdown Coleções Especiais */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer outline-none font-semibold uppercase">
                  Coleções Especiais <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Link href="/linha/colecao-sao-bento" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Coleção São Bento</Link>
                  <Link href="/linha/colecao-sao-miguel" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Coleção São Miguel</Link>
                </div>
              </div>

              <Link href="/catalogo" className="hover:text-amber-400 transition-colors py-2 font-semibold uppercase">Acessórios</Link>
            </nav>

          </div>

          {/* Lado Direito: Carrinho */}
          <div className="flex items-center">
            <Cart />
          </div>

        </div>
      </header>

      {/* --- MENU MOBILE (GAVETA LATERAL / DRAWER) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Fundo escuro transparente (ao clicar fora, fecha o menu) */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Conteúdo da Gaveta */}
          <div className="relative w-4/5 max-w-xs bg-slate-950 border-r border-slate-800 h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            
            {/* Topo do Menu Mobile */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <span className={`${cinzelDecorative.className} text-amber-400 font-bold text-lg uppercase tracking-wider`}>
                Terçarium
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/80 border border-slate-800"
                aria-label="Fechar Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links de Navegação Mobile */}
            <div className={`flex flex-col gap-6 pt-6 text-xs font-semibold tracking-wider text-slate-300 ${montserrat.className}`}>
              
              <div className="space-y-3">
                <span className="text-amber-400 text-[10px] uppercase tracking-widest block font-bold">Terços</span>
                <div className="flex flex-col pl-3 space-y-3 border-l border-slate-800">
                  <Link href="/linha/raizes" className="hover:text-amber-400 transition-colors uppercase">Linha Raízes</Link>
                  <Link href="/linha/essencia" className="hover:text-amber-400 transition-colors uppercase">Linha Essência</Link>
                  <Link href="/linha/fidelis" className="hover:text-amber-400 transition-colors uppercase">Linha Fidelis</Link>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-amber-400 text-[10px] uppercase tracking-widest block font-bold">Coleções Especiais</span>
                <div className="flex flex-col pl-3 space-y-3 border-l border-slate-800">
                  <Link href="/linha/colecao-sao-bento" className="hover:text-amber-400 transition-colors uppercase">Coleção São Bento</Link>
                  <Link href="/linha/colecao-sao-miguel" className="hover:text-amber-400 transition-colors uppercase">Coleção São Miguel</Link>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <Link href="/catalogo" className="block py-2 hover:text-amber-400 transition-colors uppercase">Acessórios</Link>
              </div>

            </div>

            {/* Rodapé do Menu Mobile */}
            <div className="mt-auto pt-6 border-t border-slate-800/80 text-center text-[10px] text-slate-500 font-mono">
              Ateliê & E-commerce Terçarium
            </div>

          </div>
        </div>
      )}
    </>
  );
}

// Exportação principal protegida com Suspense para satisfazer o Next.js App Router
export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-20 w-full bg-slate-950" />}>
      <NavbarContent />
    </Suspense>
  );
}
