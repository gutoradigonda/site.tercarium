import React from 'react';
import Link from 'next/link';
import { Shield, Flame, Anchor, ArrowRight } from 'lucide-react';
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
      description: 'A nossa linha premium. Terços robustos, forjados com pedras naturais pesadas e metais de alta resistência.',
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      borderHover: 'hover:border-amber-500/50',
      shadowHover: 'hover:shadow-amber-500/10'
    },
    {
      slug: 'fidelis',
      title: 'Linha Fidelis',
      description: 'Tradição e leveza. Peças clássicas e intemporais, mantendo a durabilidade do ateliê.',
      icon: <Flame className="w-6 h-6 text-amber-500" />,
      borderHover: 'hover:border-amber-500/50',
      shadowHover: 'hover:shadow-amber-500/10'
    },
    {
      slug: 'essencia',
      title: 'Linha Essência',
      description: 'A pureza da fé. Modelos focados no essencial, com design minimalista e altamente resistente.',
      icon: <Anchor className="w-6 h-6 text-amber-500" />,
      borderHover: 'hover:border-amber-500/50',
      shadowHover: 'hover:shadow-amber-500/10'
    }
  ];

  return (
    <section className={`w-full bg-slate-950 pb-10 pt-0 px-6 md:px-12 lg:px-20 ${montserrat.className}`}>
      
      {/* Divisor Ornamental puxado para cima com margem negativa (-mt-8 / -mt-12) */}
      <div className="w-full flex justify-center items-center pb-10 -mt-2 sm:-mt-4 z-10 relative">
        <img 
          src="/quebra.png" 
          alt="Divisor Minimalista" 
          className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] object-contain" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center justify-center mb-12 text-center space-y-2">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">
            O Nosso Armamento Principal
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Conheça Nossas Linhas de Terços
          </h2>
          <div className="w-16 h-1 bg-amber-500 mt-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lines.map((line) => (
            <Link 
              key={line.slug}
              href={`/linha/${line.slug}`}
              className={`bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${line.borderHover} hover:shadow-2xl ${line.shadowHover} group cursor-pointer`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
                  {line.icon}
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-wide group-hover:text-amber-400 transition-colors">
                  {line.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {line.description}
                </p>
              </div>

              <div className="pt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 group-hover:text-amber-400 transition-colors">
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};