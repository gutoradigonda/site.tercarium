'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ShoppingBag } from 'lucide-react';
import Cart from './Cart';
import { Cinzel_Decorative, Montserrat } from 'next/font/google';
import { supabase } from '../../src/lib/supabase';

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

interface PublicProduct {
  category: string;
  subCategory?: string;
  colecao?: string | null;
  ativo_no_site?: boolean;
}

// Componente interno que lida com o estado, dados do Supabase e rotas
function NavbarContent() {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estados para dados dinâmicos do Supabase
  const [products, setProducts] = useState<PublicProduct[]>([]);
  
  const router = useRouter();
  const pathname = usePathname();

  // Buscar produtos do Supabase para montar a navbar dinamicamente
  useEffect(() => {
    const fetchNavProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('category, subcategory, colecao, ativo_no_site');

        if (!error && data) {
          const mapped = data.map((p: any) => ({
            category: p.category || 'Terços',
            subCategory: p.subcategory || p.subCategory || '',
            colecao: p.colecao || null,
            ativo_no_site: p.ativo_no_site ?? true,
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Erro ao buscar dados para a Navbar dinâmica:', err);
      }
    };

    fetchNavProducts();
  }, []);

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

  // --- PROCESSAMENTO DINÂMICO DOS DADOS (Excluindo Componentes e itens inativos) ---
  const activeProducts = useMemo(() => {
    return products.filter(p => p.ativo_no_site !== false && p.category !== 'Componentes');
  }, [products]);

  // Subcategorias exclusivas da categoria 'Terços'
  const dynamicTercosLines = useMemo(() => {
    const lines = activeProducts
      .filter(p => p.category === 'Terços' && p.subCategory)
      .map(p => p.subCategory as string);
    
    const unique = Array.from(new Set(lines));
    return unique.length > 0 ? unique.sort() : ['Linha Raízes', 'Linha Essência', 'Linha Fidelis'];
  }, [activeProducts]);

  // Subcategorias exclusivas da categoria 'Acessórios'
  const dynamicAcessoriosLines = useMemo(() => {
    const lines = activeProducts
      .filter(p => p.category === 'Acessórios' && p.subCategory)
      .map(p => p.subCategory as string);
    
    const unique = Array.from(new Set(lines));
    return unique.length > 0 ? unique.sort() : ['Cordão', 'Dezenas', 'Pulseira', 'Chaveiro', 'Terço de Carro'];
  }, [activeProducts]);

  // Coleções especiais cadastradas nos produtos
  const dynamicCollections = useMemo(() => {
    const cols = activeProducts
      .map(p => p.colecao)
      .filter(Boolean) as string[];

    const unique = Array.from(new Set(cols));
    return unique.length > 0 ? unique.sort() : ['São Bento', 'São Miguel'];
  }, [activeProducts]);

  // Helper para criar slugs amigáveis para as URLs
  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
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
          
          {/* Lado Esquerdo: Botão Mobile Hambúrguer + Logótipo + Menu Desktop Dinâmico */}
          <div className="flex items-center gap-6 lg:gap-10">
            
           {/* Botão Hambúrguer (Visível apenas no Telemóvel) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white p-1 hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
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

            {/* MENU DESKTOP 100% DINÂMICO */}
            <nav className={`hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold tracking-widest text-slate-300 ${montserrat.className}`}>
              
              {/* Dropdown Dinâmico: Terços */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer outline-none font-semibold uppercase">
                  Terços <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <div className="absolute top-full left-0 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {dynamicTercosLines.map((line) => (
                    <Link 
                      key={line} 
                      href={`/linha/${createSlug(line)}`} 
                      className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold uppercase"
                    >
                      {line}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Dropdown Dinâmico: Acessórios */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer outline-none font-semibold uppercase">
                  Acessórios <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                <div className="absolute top-full left-0 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {dynamicAcessoriosLines.map((sub) => (
                    <Link 
                      key={sub} 
                      href={`/acessorios/${createSlug(sub)}`} 
                      className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold uppercase"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Dropdown Dinâmico: Coleções Especiais */}
              {dynamicCollections.length > 0 && (
                <div className="relative group py-2">
                  <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer outline-none font-semibold uppercase">
                    Coleções Especiais <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {dynamicCollections.map((col) => (
                      <Link 
                        key={col} 
                        href={`/linha/colecao-${createSlug(col)}`} 
                        className="px-4 py-2.5 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-colors font-semibold uppercase"
                      >
                        Coleção {col}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>

          </div>

          {/* Lado Direito: Carrinho */}
          <div className="flex items-center">
            <Cart />
          </div>

        </div>
      </header>

      {/* --- MENU MOBILE DINÂMICO (GAVETA LATERAL / DRAWER) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Fundo escuro transparente */}
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
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/80 border border-slate-800 cursor-pointer"
                aria-label="Fechar Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links de Navegação Mobile Dinâmicos */}
            <div className={`flex flex-col gap-6 pt-6 text-xs font-semibold tracking-wider text-slate-300 ${montserrat.className}`}>
              
              {/* Terços e Linhas */}
              <div className="space-y-3">
                <span className="text-amber-400 text-[10px] uppercase tracking-widest block font-bold">Terços</span>
                <div className="flex flex-col pl-3 space-y-3 border-l border-slate-800">
                  {dynamicTercosLines.map((line) => (
                    <Link 
                      key={line} 
                      href={`/linha/${createSlug(line)}`} 
                      className="hover:text-amber-400 transition-colors uppercase"
                    >
                      {line}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Acessórios e Subcategorias */}
              <div className="space-y-3 pt-2">
                <span className="text-amber-400 text-[10px] uppercase tracking-widest block font-bold">Acessórios</span>
                <div className="flex flex-col pl-3 space-y-3 border-l border-slate-800">
                  {dynamicAcessoriosLines.map((sub) => (
                    <Link 
                      key={sub} 
                      href={`/acessorios/${createSlug(sub)}`} 
                      className="hover:text-amber-400 transition-colors uppercase"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Coleções Especiais */}
              {dynamicCollections.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-amber-400 text-[10px] uppercase tracking-widest block font-bold">Coleções Especiais</span>
                  <div className="flex flex-col pl-3 space-y-3 border-l border-slate-800">
                    {dynamicCollections.map((col) => (
                      <Link 
                        key={col} 
                        href={`/linha/colecao-${createSlug(col)}`} 
                        className="hover:text-amber-400 transition-colors uppercase"
                      >
                        Coleção {col}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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