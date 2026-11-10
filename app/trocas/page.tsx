import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, Mail, MessageCircle, AlertTriangle } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Trocas e Devoluções | Terçarium',
  description: 'Política oficial de trocas, devoluções, direito de arrependimento e garantia da Terçarium.',
};

export default function TrocasDevolucoesPage() {
  return (
    <main className={`min-h-screen bg-slate-950 text-slate-300 py-16 px-6 sm:px-12 lg:px-24 ${montserrat.className}`}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Voltar ao Início */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </Link>

        {/* Cabeçalho */}
        <header className="border-b border-slate-800 pb-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest">
            <RefreshCw className="w-4 h-4" />
            <span>Atendimento & Compromisso</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Política de Trocas e Devoluções
          </h1>
          <p className="text-xs text-slate-500">Última atualização: Novembro de 2026</p>
        </header>

        {/* Introdução Institucional */}
        <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-light">
          Na <strong>Terçarium</strong>, cada peça é forjada manualmente com autêntico Paracord 550 e componentes de alta densidade, pensada para acompanhar sua rotina com máxima resistência estrutural. Se por qualquer motivo você precisar trocar ou devolver um produto, nossa política segue com rigor o Código de Defesa do Consumidor, pautada pela clareza e pelo respeito a cada cliente.
        </p>

        {/* Blocos de Contato Oficial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-500">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">E-mail de Atendimento</p>
              <a href="mailto:contato@tercarium.com.br" className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                contato@tercarium.com.br
              </a>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-500">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Canal WhatsApp</p>
              <a href="https://wa.me/554396831654" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                (43) 99683-1654
              </a>
            </div>
          </div>
        </div>

        {/* Secções da Política */}
        <section className="space-y-8 text-sm sm:text-base leading-relaxed font-light">
          
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
              1. Devolução por Arrependimento (Até 7 dias corridos)
            </h2>
            <p className="text-slate-400">
              Caso receba a encomenda e opte por desistir da compra, você tem até <strong>7 (sete) dias corridos</strong>, contados a partir da data de entrega confirmada pela transportadora ou Correios, para solicitar o cancelamento e a restituição do valor pago (conforme o Artigo 49 do CDC).
            </p>
            <p className="text-slate-400 mt-2 font-normal text-slate-300">Condições:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
              <li>O produto não pode apresentar qualquer sinal, marca ou indício de uso.</li>
              <li>A peça deve ser devolvida acompanhada de sua embalagem original e de todos os componentes que a acompanharam (tags, saquinhos de proteção ou brindes).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
              2. Troca Voluntária Dentro do Prazo Legal (Até 7 dias corridos)
            </h2>
            <p className="text-slate-400">
              A solicitação de troca por outro modelo ou cor no prazo de até <strong>7 (sete) dias corridos</strong> após a entrega deve ser comunicada aos nossos canais de atendimento com o número do pedido. O produto deverá estar impecável, sem uso e em sua embalagem original.
            </p>
          </div>

          {/* Destaque: Trocas após o prazo */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>3. Trocas Solicitadas Após o Prazo de 7 Dias</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Decorrido o prazo legal de 7 (sete) dias corridos a partir da data de recebimento:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-400">
              <li>Qualquer intenção de troca <strong>deverá ser previamente submetida à avaliação da equipe Terçarium</strong>.</li>
              <li>Caso a troca seja julgada viável e autorizada pelo ateliê após análise do caso, <strong>todos os custos logísticos de frete (envio da peça para nosso ateliê e reenvio do novo produto) correrão integralmente por conta do cliente</strong>.</li>
              <li>Não serão aceitas peças que apresentem sinais de desgaste por atrito abrasivo indevido, marcas de corte, queima ou contato com substâncias químicas corrosivas.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
              4. Avaria no Transporte ou Defeito de Fabricação
            </h2>
            <div className="space-y-3 text-slate-400">
              <p>
                <strong className="text-white">Avaria no Transporte:</strong> Caso perceba qualquer violação na embalagem ou dano evidente causado durante o trajeto de entrega, entre em contato imediatamente com nossa equipe em até <strong>7 (sete) dias corridos</strong> após o recebimento, enviando fotos nítidas do pacote e do item danificado.
              </p>
              <p>
                <strong className="text-white">Defeito de Fabricação:</strong> Por se tratar de um bem durável, você tem até <strong>90 (noventa) dias corridos</strong> a contar do recebimento para acionar a garantia legal (Artigo 26 do CDC) em caso de falha de confecção na amarração ou ruptura espontânea do Paracord.
              </p>
              <p>
                Para acionar a análise, envie seu nome completo, número do pedido e um breve relato com fotos ou vídeos que demonstrem o defeito. Constatada a falha de fabricação, o conserto ou a substituição será feito sem custo adicional.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
              5. Procedimento de Envio e Logística Reversa
            </h2>
            <p className="text-slate-400">
              Nos casos de direito de arrependimento (até 7 dias), avaria no transporte ou defeito comprovado de confecção, as despesas de frete são assumidas pela Terçarium através de um <strong>código de postagem reversa nos Correios</strong>.
            </p>
            <p className="text-slate-400 mt-2">
              A loja não cobre despesas com a compra de caixas ou envelopes novos nas agências dos Correios. Recomendamos reutilizar a própria embalagem de entrega (se preservada) ou acondicionar a peça em uma embalagem resistente e segura contra impactos durante o transporte.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
              6. Restituição de Valores
            </h2>
            <p className="text-slate-400">
              Após a devolução da encomenda à nossa base em Londrina/PR e a conclusão da vistoria física do produto (realizada em até 3 dias úteis após a entrega):
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li><strong>Pagamentos via PIX:</strong> O reembolso integral é realizado via transferência PIX na conta bancária de mesma titularidade do comprador.</li>
              <li><strong>Pagamentos via Cartão de Crédito:</strong> O estorno é solicitado junto ao intermediador de pagamento, e o lançamento do crédito na fatura ocorrerá de acordo com os ciclos e prazos da administradora do seu cartão.</li>
            </ul>
          </div>

        </section>

      </div>
    </main>
  );
}