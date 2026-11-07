import React from 'react';
import { Cormorant_Garamond, Montserrat, Lato } from 'next/font/google';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400'],
});

export const HistorySection: React.FC = () => {
  return (
    <section className="w-full bg-slate-950 pb-12 sm:pb-16 pt-0 px-6 md:px-12 lg:px-20">
      
      {/* Divisor Ornamental quebra.png no topo com o respiro ajustado (-mt-2 / -mt-4) */}
      <div className="w-full flex justify-center items-center pb-10 sm:pb-12 -mt-2 sm:-mt-4 z-10 relative">
        <img 
          src="/quebra.png" 
          alt="Divisor Minimalista" 
          className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px] object-contain" 
        />
      </div>

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Cartão com Efeito 3D / Moldura Arredondada sobreposta ao fundo */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
          
          {/* Brilho decorativo sutil no fundo do card */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent pointer-events-none"></div>

          {/* Cabeçalho Centralizado dentro da moldura */}
          <div className="mb-10 text-center flex flex-col items-center justify-center space-y-2 relative z-10">
            <span className="text-amber-600 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
              Tradição e Devoção
            </span>
            <h2 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight`}>
              Uma história de fé que atravessa séculos
            </h2>
            <div className="w-16 h-1 bg-amber-500 mt-1"></div>
          </div>

          {/* Layout de Duas Colunas (Texto e Imagem) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
            
            {/* Coluna da Esquerda: Texto Explicativo Justificado */}
            <div className={`lg:col-span-7 text-slate-300 text-sm sm:text-base leading-relaxed text-justify space-y-5 ${lato.className}`}>
              <p>
                O Santo Terço tem suas raízes na tradição de oração da Igreja Católica, que desde os primeiros séculos cultivava o hábito de meditar sobre a vida de Jesus Cristo por meio da repetição de orações.
              </p>
              <p>
                Sua origem está ligada à prática dos monges, que rezavam os 150 Salmos. Com o passar do tempo, essa tradição inspirou os fiéis que não sabiam ler a substituir os Salmos pela repetição de 150 Ave-Marias, dando origem ao chamado Saltério de Maria.
              </p>
              
              <div className="pt-2">
                <h3 className={`${montserrat.className} text-amber-500 text-base sm:text-lg font-semibold mb-2 uppercase tracking-wide`}>
                  Mas por que o Terço tem pequenas contas?
                </h3>
                <p>
                  Antigamente, os fiéis utilizavam pedrinhas, sementes, nós em cordões e outros objetos para contar suas orações. Com o passar dos séculos, esses recursos deram lugar às pequenas contas que conhecemos hoje, organizadas em uma sequência que permite acompanhar cada Ave-Maria e cada mistério meditado, sem perder o ritmo da oração.
                </p>
              </div>

              <p>
                Ao longo dos séculos, essa devoção tomou a forma que conhecemos hoje, sendo tradicionalmente associada a São Domingos de Gusmão e difundida por toda a Igreja.
              </p>
              <p>
                Mais do que um objeto religioso, o Santo Terço é um caminho de contemplação dos mistérios da vida de Cristo, acompanhado pelo olhar e pela intercessão de Nossa Senhora.
              </p>
              <p className="font-bold text-white pt-2">
                Cada conta, uma oração. Cada mistério, uma oportunidade de se aproximar de Deus.
              </p>
            </div>

            {/* Coluna da Direita: Imagem Estática com moldura interna */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950">
                <img 
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop" 
                  alt="História do Santo Terço" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800-500/30 shadow-md">
                    Patrimônio Espiritual
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};