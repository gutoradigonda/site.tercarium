import React from 'react';
import { Footer } from '@/src/components/Footer';
import { WhatsAppButton } from '@/src/components/WhatsAppButton';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export default function QuemSomosPage() {
  return (
    <main className={`min-h-screen flex flex-col bg-slate-950 text-white ${montserrat.className}`}>
      
      <section className="pt-36 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        {/* Cabeçalho Centralizado */}
        <div className="text-center mb-10">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block mb-3">
            Nossa História, Nossa Essência
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 uppercase tracking-tight mb-4">
            Quem Somos
          </h1>
          <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
        </div>

        {/* Card Principal */}
        <div className="border border-slate-800 bg-slate-900/40 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base text-justify">
            <p>
              A <strong className="text-white font-bold">Terçarium</strong> nasceu em fevereiro de 2025, a partir do sonho de um casal católico apaixonado por Jesus e por Maria, que encontrou no trabalho artesanal uma forma de expressar sua fé e colocá-la a serviço de outras pessoas.
            </p>

            <p>
              Mais do que produzir terços e artigos religiosos, queremos criar instrumentos que acompanhem momentos de oração, fortaleçam a fé e estejam presentes na caminhada espiritual de cada pessoa.
            </p>

            <p>
              Aqui, cada peça é confeccionada individualmente, uma a uma, com dedicação, carinho, cuidado e, acima de tudo, oração. Não trabalhamos com produção em massa nem com grandes estoques. Cada produto ganha vida em nossas mãos, respeitando suas particularidades e tornando cada criação especial.
            </p>

            <p>
              Acreditamos que aquilo que é feito com amor carrega algo de quem o criou. Por isso, colocamos um pouco da nossa história, da nossa fé e das nossas orações em cada trabalho.
            </p>

            {/* Bloco de Encerramento: Frase + Assinatura e Logo subida à direita */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="flex items-start justify-between gap-6">
                
                {/* Lado Esquerdo: Frase em destaque + Assinatura logo abaixo */}
                <div className="space-y-4">
                  <p className="text-amber-400 font-bold text-base sm:text-lg italic tracking-wide max-w-xl">
                    Terçarium: mais do que peças artesanais, instrumentos de fé, oração e devoção.
                  </p>

                  <div className="text-slate-400 text-sm">
                    <p>Com carinho,</p>
                    <p className="font-bold text-white uppercase tracking-wider text-xs mt-0.5">
                      Família Terçarium
                    </p>
                  </div>
                </div>

                {/* Lado Direito: Logo alinhada no topo com a frase dourada */}
                <div className="shrink-0 transition-transform hover:scale-105 duration-300">
                  <img
                    src="/logo.png"
                    alt="Selo Terçarium"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_2px_15px_rgba(245,158,11,0.25)]"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}