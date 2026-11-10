import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Termos de Serviço | Terçarium',
  description: 'Condições gerais de compra, envio, garantia e produção artesanal.',
};

export default function TermosServicoPage() {
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
            <FileText className="w-4 h-4" />
            <span>Condições Comerciais</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Termos de Serviço
          </h1>
          <p className="text-xs text-slate-500">Última atualização: Novembro de 2026</p>
        </header>

        {/* Conteúdo Institucional */}
        <section className="space-y-8 text-sm sm:text-base leading-relaxed font-light">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">1. Natureza Artesanal e Materiais</h2>
            <p className="text-slate-400">
              Cada peça da <strong>Terçarium</strong> é confeccionada manualmente com foco em alta durabilidade, utilizando autêntico Paracord 550 e contas de alta densidade e resistência estrutural. Por se tratar de um processo artesanal, pequenas variações milimétricas de amarração e acabamento podem ocorrer, atestando a exclusividade e identidade de cada peça forjada.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">2. Prazos de Produção e Postagem</h2>
            <p className="text-slate-400">
              O prazo exibido na simulação de frete <strong>não contempla o prazo de produção das peças</strong>. A Terçarium não trabalha com estoque a pronta entrega: todos os pedidos são confeccionados um a um, de forma manual e dedicada. Por essa razão, temos um prazo de <strong>até 7 (sete) dias úteis para a confecção</strong> do pedido, ao qual deve ser somado o prazo estimado de entrega da transportadora escolhida. Assim que a encomenda for postada em nossa base logística em Londrina, o código de rastreamento é gerado e disponibilizado para acompanhamento.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">3. Cupons de Desconto e Campanhas Promocionais</h2>
            <p className="text-slate-400">
              Os cupons promocionais fornecidos pela <strong>Terçarium</strong> ou por campanhas sazonais são de uso único por cliente, possuem prazos de validade estabelecidos e não são cumulativos com outras promoções ativas, salvo aviso prévio e explícito na própria campanha.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">4. Trocas, Devoluções e Direito de Arrependimento</h2>
            <p className="text-slate-400">
              Em respeito ao Código de Defesa do Consumidor (Artigo 49), o cliente possui o prazo de até 7 (sete) dias corridos a partir do recebimento da encomenda para solicitar a devolução por arrependimento. O produto deve ser remetido em sua embalagem original, sem marcas de uso ou avarias causadas por manuseio indevido.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">5. Garantia e Resistência Estrutural</h2>
            <p className="text-slate-400">
              Nossos terços e acessórios são construídos para suportar o combate espiritual diário. Oferecemos garantia contra defeitos de confecção na amarração e rompimento espontâneo da estrutura de Paracord. A garantia não cobre desgastes provocados por corte, fogo, contato com solventes químicos agressivos ou tração com ferramentas inadequadas.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">6. Legislação e Foro</h2>
            <p className="text-slate-400">
              Estes termos são regidos integralmente pelas normas vigentes da República Federativa do Brasil. Fica estipulado o foro da Comarca de Londrina, Estado do Paraná, para dirimir eventuais dúvidas ou controvérsias decorrentes das operações realizadas neste site.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}