import React from 'react';
import { Shield, Hammer, Flame } from 'lucide-react';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['600', '700', '500'],
  style: ['normal', 'italic'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex flex-col justify-center overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('/img-fundo.jpg')] bg-cover bg-center bg-no-repeat opacity-50"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 flex flex-col items-start pt-40">
        
        <h1 className={`${cormorant.className} italic text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] mb-6 max-w-4xl tracking-wide`}>
          A força da Fé <br />
          <span className="text-amber-500">forjada à mão</span>
        </h1>

        <p className={`${montserrat.className} text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mb-12`}>
          Esqueça as peças frágeis. Os nossos terços são verdadeiras armas espirituais.
          Construídos com Paracord 550, pedras naturais e metais maciços para durar uma vida inteira.
        </p>
        
      </div>

      {/* AJUSTE IMAGEM 1: justify-center para centralizar os itens perfeitamente */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-800/50 bg-slate-950/60 backdrop-blur-sm py-5">
        <div className="w-full px-6 md:px-12 lg:px-20 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">Resistência Extrema</span>
          </div>
          <div className="flex items-center gap-3">
            <Hammer className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">100% Artesanal</span>
          </div>
          <div className="flex items-center gap-3">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">Fé Inabalável</span>
          </div>
        </div>
      </div>
    </section>
  );
};