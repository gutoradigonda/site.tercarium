import React from 'react';
import { Footer } from '@/src/components/Footer';
import { WhatsAppButton } from '@/src/components/WhatsAppButton';
import { Montserrat, Cinzel_Decorative } from 'next/font/google';
import { MessageCircle, ShieldCheck, Sparkles, Layers } from 'lucide-react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['700'],
});


export default function PersonalizePage() {
  const mensagemWhatsapp = encodeURIComponent('Olá, vim pelo site e quero um terço personalizado');
  const numeroWhatsapp = '5543996831654';

  return (
    <main className={`min-h-screen flex flex-col bg-slate-950 text-white ${montserrat.className}`}>
      
      <section className="pt-36 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full text-center">
        <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block mb-3">
          Ateliê Sob Medida
        </span>
        <h1 className={`${montserrat.className} text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 uppercase tracking-tight mb-4`}>
          Personalize o seu
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-12">
          Crie um instrumento de oração exclusivo escolhendo devoções, cordões e acabamentos diretamente com o nosso ateliê.
        </p>

        {/* Pilares da personalização */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Sparkles className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="font-bold text-white text-sm uppercase mb-2">Devoções</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Cruzes e medalhas selecionadas conforme a devoção do seu santo protetor.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Layers className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="font-bold text-white text-sm uppercase mb-2">Materiais</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Cordões de alta resistência em cores variadas e contas robustas de excelente empunhadura.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-amber-500 mb-3" />
            <h3 className="font-bold text-white text-sm uppercase mb-2">Atendimento Direto</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Acompanhamento de cada detalhe na montagem via WhatsApp com fotos e alinhamento do projeto.
            </p>
          </div>
        </div>

        {/* Botão de ação */}
        <div className="flex justify-center">
          <a
            href={`https://wa.me/${numeroWhatsapp}?text=${mensagemWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            <MessageCircle className="w-5 h-5" />
            Iniciar Personalização no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}