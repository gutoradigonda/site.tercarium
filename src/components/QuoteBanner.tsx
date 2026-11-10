import React from 'react';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic'],
});

// Importando a fonte Montserrat com o peso SemiBold (600)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'],
});

export const QuoteBanner = () => {
  return (
    <section className="w-full bg-[#0b0f19] py-10 md:py-12 px-6 border-y border-amber-500/30 relative">
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        
        <div className="w-8 h-0.5 bg-amber-500/60 mb-3.5"></div>

        <h2 className={`${cormorant.className} text-2xl md:text-3xl lg:text-4xl text-slate-200 leading-snug mb-3 font-medium`}>
          “Dai-me um exército que reze o rosário e vencerei o mundo.”
        </h2>
        
        {/* Atribuição atualizada com fonte Montserrat SemiBold e tracking calibrado para o novo tamanho de texto */}
        <span className={`${montserrat.className} text-amber-500 font-semibold uppercase tracking-[0.18em] text-[10px] sm:text-xs max-w-2xl leading-relaxed`}>
          Frase tradicionalmente atribuída aos papas Pio IX e São Pio X
        </span>

      </div>
    </section>
  );
};