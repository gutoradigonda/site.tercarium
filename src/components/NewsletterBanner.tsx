'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { CheckCircle2 } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const NewsletterBanner = () => {
  const [config, setConfig] = useState<any>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [cupomGanho, setCupomGanho] = useState('');

  useEffect(() => {
    async function carregarBanner() {
      try {
        const { data } = await supabase
          .from('site_banner_promocao')
          .select('*')
          .eq('id', 1)
          .single();

        if (data) {
          setConfig(data);
        }
      } catch (err) {
        console.error('Erro ao carregar banner:', err);
      } finally {
        setLoadingConfig(false);
      }
    }

    carregarBanner();

    // Inscrição em Tempo Real (Realtime): se alterar ou ocultar no ERP, reflete na hora no site
    const channel = supabase
      .channel('banner_promocao_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_banner_promocao' },
        (payload: any) => {
          if (payload.new) {
            setConfig(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 1. Enquanto está consultando o banco, não renderiza nada (evita piscar o fallback desnecessariamente)
  if (loadingConfig) return null;

  // 2. Se a configuração carregou e o banner estiver desativado/oculto, esconde 100%
  if (config && config.ativo === false) return null;

  // 3. Se por algum motivo o banco estiver vazio e não houver config, não exibe
  if (!config) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setSucesso(true);
        setCupomGanho(data.cupom);
        setEmail('');
      } else {
        alert(data.error || 'Erro ao cadastrar.');
      }
    } catch {
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  const renderizarTitulo = (texto: string) => {
    const raw = texto || '';
    const partes = raw.split(/(\[[^\]]+\])/g);
    return partes.map((parte: string, index: number) => {
      if (parte.startsWith('[') && parte.endsWith(']')) {
        return (
          <span key={`destaque-${index}`} className="text-amber-400">
            {parte.slice(1, -1)}
          </span>
        );
      }
      return <React.Fragment key={`texto-${index}`}>{parte}</React.Fragment>;
    });
  };

  return (
    <section className={`w-full bg-white py-12 px-6 ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        
        {/* Lado Esquerdo: Tag, Título, Descrição e Regras */}
        <div className="w-full lg:max-w-xl text-left space-y-3 z-10">
          <span className="text-amber-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block">
            {config.tag_superior || 'CLUBE TERÇARIUM'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
            {renderizarTitulo(config.titulo)}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {config.descricao}
          </p>
          
          {config.regras && (
            <p className="text-slate-500 text-[11px] leading-tight pt-1 italic">
              {config.regras}
            </p>
          )}
        </div>

        {/* Lado Direito: Formulário ou Cupom */}
        <div className="w-full lg:w-auto z-10">
          {sucesso ? (
            <div className="bg-emerald-950/40 border border-emerald-500/50 p-5 rounded-2xl flex items-center gap-4 text-emerald-400">
              <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Cupom Liberado!</p>
                <p className="text-base font-black text-white mt-0.5">
                  Use o código: <span className="text-amber-400 font-mono tracking-wider">{cupomGanho}</span>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full sm:w-[460px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.placeholder_input || 'O seu melhor e-mail'}
                className="flex-1 bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm px-5 py-3.5 rounded-xl outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 shrink-0 cursor-pointer"
              >
                {loading ? 'Cadastrando...' : (config.texto_botao || 'GARANTIR CUPOM')}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};