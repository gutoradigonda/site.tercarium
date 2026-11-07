'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
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
    <header 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isSolid 
          ? 'bg-slate-950/95 backdrop-blur-md py-4 border-b border-slate-800/50 shadow-xl' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        
        {/* LOGÓTIPO COM CINZEL DECORATIVE E RESET AO TOPO (Permanece como está) */}
        <a 
          href="/" 
          onClick={handleLogoClick}
          className={`${cinzelDecorative.className} text-amber-400 font-bold text-xl md:text-2xl tracking-[0.10em] uppercase cursor-pointer select-none`}
        >
          Terçarium
        </a>

        {/* MENU COM MONTSERRAT SEMIBOLD */}
        <nav className={`hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-slate-300 ${montserrat.className}`}>
          
          <div className="relative group py-4">
            <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer outline-none font-semibold uppercase">
              Terços <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full left-0 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Link href="/linha/raizes" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Linha Raízes</Link>
              <Link href="/linha/essencia" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Linha Essência</Link>
              <Link href="/linha/fidelis" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Linha Fidelis</Link>
            </div>
          </div>

          <div className="relative group py-4">
            <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer outline-none font-semibold uppercase">
              Coleções Especiais <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Link href="/linha/colecao-sao-bento" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Coleção São Bento</Link>
              <Link href="/linha/colecao-sao-miguel" className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold">Coleção São Miguel</Link>
            </div>
          </div>

          <Link href="/catalogo" className="hover:text-amber-400 transition-colors py-4 font-semibold uppercase">Acessórios</Link>
        </nav>

        <Cart />

      </div>
    </header>
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