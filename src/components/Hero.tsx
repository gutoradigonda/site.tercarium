'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Hammer, Flame } from 'lucide-react';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import { supabase } from '@/src/lib/supabase';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['600', '700', '500'],
  style: ['normal', 'italic'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export interface HeroData {
  bgImage: string;
  tituloLinha1: string;
  tituloDestaque: string;
  subtitulo: string;
}

interface HeroProps {
  data?: HeroData;
}

export const Hero: React.FC<HeroProps> = ({ data: initialData }) => {
  const [heroData, setHeroData] = useState<HeroData | null>(initialData || null);
  const [isLoaded, setIsLoaded] = useState(Boolean(initialData));

  useEffect(() => {
    const fetchActiveBanner = async () => {
      try {
        const { data } = await supabase
          .from('banners_hero')
          .select('imagem_url, titulo_linha1, titulo_destaque, subtitulo')
          .eq('ativo', true)
          .single();
        
        if (data) {
          setHeroData({
            bgImage: data.imagem_url || '',
            tituloLinha1: data.titulo_linha1 || '',
            tituloDestaque: data.titulo_destaque || '',
            subtitulo: data.subtitulo || ''
          });
        }
      } catch (err) {
        console.error('Erro ao procurar o banner ativo do Hero:', err);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchActiveBanner();
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex flex-col justify-center overflow-hidden bg-slate-950">
      
      {/* Imagem de Fundo com Efeito Cinematográfico (Fade + Zoom Out Lento) */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out transform ${
          isLoaded && heroData?.bgImage 
            ? 'opacity-50 scale-100' 
            : 'opacity-0 scale-105'
        }`}
        style={heroData?.bgImage ? { backgroundImage: `url('${heroData.bgImage}')` } : undefined}
      ></div>
      
      {/* Gradiente de Sobreposição */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent pointer-events-none"></div>

      {/* Conteúdo Principal com Entrada Suave (Fade-in + Deslocamento vertical sutil) */}
      <div 
        className={`relative z-10 w-full px-6 md:px-12 lg:px-20 flex flex-col items-start pt-40 transition-all duration-700 ease-out delay-150 transform ${
          isLoaded && heroData 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        {heroData && (
          <>
            <h1 className={`${cormorant.className} italic text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] mb-6 max-w-4xl tracking-wide`}>
              {heroData.tituloLinha1} <br />
              <span className="text-amber-500">{heroData.tituloDestaque}</span>
            </h1>

            <p className={`${montserrat.className} text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mb-12`}>
              {heroData.subtitulo}
            </p>
          </>
        )}
      </div>

      {/* Barra de Atributos fixa no rodapé */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-800/50 bg-slate-950/60 backdrop-blur-sm py-5 z-20">
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