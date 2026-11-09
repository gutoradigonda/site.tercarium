import React from 'react';
import { supabase } from '@/src/lib/supabase';
import { Star } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

// Removemos o React.FC e adicionamos o 'async' para podermos comunicar com o Supabase
export async function Testimonials() {
  // 1. Busca os textos dinâmicos do cabeçalho
  const { data: config } = await supabase
    .from('secoes_metadata')
    .select('*')
    .eq('secao', 'avaliacoes')
    .single();

  // 2. Busca as avaliações ativas
  const { data: avaliacoes } = await supabase
    .from('avaliacoes_site')
    .select('*')
    .eq('ativo', true)
    .order('ordem', { ascending: true })
    .order('created_at', { ascending: false });

  // Se não houver avaliações ativas no banco, a secção oculta-se para não ficar um buraco vazio
  if (!avaliacoes || avaliacoes.length === 0) return null;

  // Fallbacks de segurança
  const slogan = config?.slogan || 'Provas Reais';
  const titulo = config?.titulo || 'Mais de 70 Avaliações Reais de Clientes';
  const subtitulo = config?.subtitulo || 'Deixadas aqui na loja, no Instagram e no WhatsApp';

  return (
    <section className={`w-full bg-slate-950 pb-10 pt-0 px-6 md:px-12 lg:px-20 ${montserrat.className}`}>
      
      {/* Divisor Ornamental mantido intacto */}
      <div className="w-full flex justify-center items-center pb-10 -mt-2 sm:-mt-4 z-10 relative">
        <img 
          src="/quebra.png" 
          alt="Divisor Minimalista" 
          className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] object-contain" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da Secção Dinâmico */}
        <div className="flex flex-col items-center justify-center mb-12 text-center space-y-2">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">
            {slogan}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {titulo}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {subtitulo}
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-2"></div>
        </div>

        {/* Grid de Avaliações Dinâmicas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {avaliacoes.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900/60 border border-amber-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-colors hover:border-amber-500/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-950 border border-amber-500/30 text-amber-500 font-black text-xs flex items-center justify-center tracking-wider shrink-0">
                    {item.iniciais}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white leading-snug">
                    {item.nome_origem}
                  </span>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < (item.estrelas || 5) ? 'fill-amber-500 text-amber-500' : 'fill-slate-700 text-slate-700'}`} 
                    />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{item.texto}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}