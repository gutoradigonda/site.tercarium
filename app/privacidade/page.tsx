import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Política de Privacidade | Terçarium',
  description: 'Transparência e segurança no tratamento dos seus dados pessoais.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className={`min-h-screen bg-slate-950 text-slate-300 py-16 px-6 sm:px-12 lg:px-24 ${montserrat.className}`}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Voltar */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </Link>

        {/* Cabeçalho */}
        <header className="border-b border-slate-800 pb-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Segurança & LGPD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Política de Privacidade
          </h1>
          <p className="text-xs text-slate-500">Última atualização: Novembro de 2026</p>
        </header>

        {/* Conteúdo Institucional */}
        <section className="space-y-8 text-sm sm:text-base leading-relaxed font-light">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">1. Compromisso com a sua Privacidade</h2>
            <p className="text-slate-400">
              O ateliê <strong>Terçarium</strong> preza pela segurança, confidencialidade e integridade dos dados de cada cliente e irmão na fé. Esta Política detalha como tratamos suas informações em total respeito à Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">2. Coleta de Informações</h2>
            <p className="text-slate-400 mb-2">Coletamos apenas os dados essenciais para operacionalizar e entregar seus pedidos com precisão:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Dados de Cadastro e Envio:</strong> Nome completo, CPF (obrigatório para emissão de nota fiscal/declaração de conteúdo), endereço completo, CEP, telefone e e-mail.</li>
              <li><strong>Comunicações e Ofertas:</strong> E-mail fornecido voluntariamente em nossos formulários de cupons e novidades do Clube Terçarium.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">3. Segurança dos Pagamentos</h2>
            <p className="text-slate-400">
              Todas as transações de pagamento (PIX ou cartão de crédito) são processadas por gateways de pagamento seguros e certificados. A <strong>Terçarium não armazena dados de cartões de crédito</strong> em seus servidores.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">4. Compartilhamento com Terceiros</h2>
            <p className="text-slate-400 mb-2">Não comercializamos nem alugamos informações de clientes. Os dados são compartilhados única e exclusivamente com:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Empresas de logística parceiras (Correios e transportadoras integradas) exclusivamente para etiquetagem e entrega no seu endereço.</li>
              <li>Plataformas fiscais e órgãos tributários para cumprimento estrito da legislação brasileira.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">5. Seus Direitos e Contato</h2>
            <p className="text-slate-400">
              Você tem direito de solicitar acesso, correção ou a exclusão do seu e-mail de nossas bases a qualquer momento. Basta entrar em contato com nosso atendimento pelo canal oficial via WhatsApp ou e-mail de suporte.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}