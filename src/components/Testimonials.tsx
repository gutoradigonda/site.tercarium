import React from 'react';
import { Star } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      initials: 'P C',
      author: 'Padre, cliente via WhatsApp',
      text: '"Sou Padre Católico e grande devoto do Terço. Rezo todos os dias. Entretanto meus terços acabam se rebentando muito rápido. Além da durabilidade achei muito bonito o trabalho de vocês. Deus os abençoe!"'
    },
    {
      initials: 'C F',
      author: 'Cliente fiel, mensagem num pedido',
      text: '"Já perdi as contas de quantos terços já comprei com vocês. São lindos e muito bem feitos, mas o principal, vêm de boas mãos, de uma família de oração, de Deus. Que Jesus e Nossa Senhora abençoem o trabalho de vocês."'
    },
    {
      initials: 'C V',
      author: 'Cliente via WhatsApp',
      text: '"Recebemos com muita alegria os lindos terços! Ficamos encantados mais uma vez com a qualidade impecável de cada detalhe, um trabalho feito com muito cuidado e dedicação. Agradecemos também pela agilidade na entrega."'
    }
  ];

  return (
    <section className={`w-full bg-slate-950 pb-10 pt-0 px-6 md:px-12 lg:px-20 ${montserrat.className}`}>
      
      {/* Divisor Ornamental quebra.png no topo com o respiro ajustado (-mt-2 / -mt-4) */}
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
            Provas Reais
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Mais de 70 Avaliações Reais de Clientes
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Deixadas aqui na loja, no Instagram e no WhatsApp
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/60 border border-amber-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-colors hover:border-amber-500/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-950 border border-amber-500/30 text-amber-500 font-black text-xs flex items-center justify-center tracking-wider">
                    {item.initials}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {item.author}
                  </span>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};