import React from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const CategoryBento: React.FC = () => {
  const lines = [
    {
      slug: 'raizes',
      title: 'Linha Raízes',
      src: '/raizes.webp',
    },
    {
      slug: 'fidelis',
      title: 'Linha Fidelis',
      src: '/fidelis.webp',
    },
    {
      slug: 'essencia',
      title: 'Linha Essência',
      src: '/essencia.webp',
    },
  ];

  return (
    <section className={`w-full bg-slate-950 pb-10 pt-0 px-6 md:px-12 lg:px-20 ${montserrat.className}`}>
      
      {/* Divisor Ornamental */}
      <div className="w-full flex justify-center items-center pb-10 -mt-2 sm:-mt-4 z-10 relative">
        <img 
          src="/quebra.png" 
          alt="Divisor Minimalista" 
          className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] object-contain" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center justify-center mb-12 text-center space-y-2">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">
            O Nosso Armamento Principal
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Conheça Nossas Linhas de Terços
          </h2>
          <div className="w-16 h-1 bg-amber-500 mt-1"></div>
        </div>

        {/* Grid com apenas as imagens dos cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lines.map((line) => (
            <Link 
              key={line.slug}
              href={`/linha/${line.slug}`}
              prefetch={false}
              className="group block overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={line.src}
                  alt={line.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};