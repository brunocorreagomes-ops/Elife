import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Calculator, Award, ArrowRightLeft, Percent, Compass } from "lucide-react";

export default function KpisTab() {
  // Simulator state variables
  const [adSpend, setAdSpend] = useState<number>(450); 
  const [estimatedLeads, setEstimatedLeads] = useState<number>(180); 
  const [conversionRate, setConversionRate] = useState<number>(7); 
  const [avgTicket, setAvgTicket] = useState<number>(159); 

  // Derived metrics calculations
  const calculatedClients = useMemo(() => {
    return Math.round(estimatedLeads * (conversionRate / 100));
  }, [estimatedLeads, conversionRate]);

  const estimatedRevenue = useMemo(() => {
    return calculatedClients * avgTicket;
  }, [calculatedClients, avgTicket]);

  const calculatedCAC = useMemo(() => {
    if (calculatedClients === 0) return 0;
    return Math.round(adSpend / calculatedClients);
  }, [adSpend, calculatedClients]);

  const calculatedROAS = useMemo(() => {
    if (adSpend === 0) return 0;
    return (estimatedRevenue / adSpend).toFixed(1);
  }, [estimatedRevenue, adSpend]);

  const kpis = [
    { label: "Primeiros Pedidos Conclusos", sub: "Ativações bem-sucedidas em Indaiatuba", target: "30 Pedidos", deadline: "Mês 1 a 2" },
    { label: "Faturamento Mensal Bruto", sub: "Soma consolidada do canal WhatsApp", target: "R$ 15.000,00", deadline: "Mês 6" },
    { label: "Taxa de Recompra (90 dias)", sub: "Fidelidade e retenção de alunas", target: "20% ou mais", deadline: "Mês 6" },
    { label: "LTV (Customer Lifetime Value)", sub: "Gasto acumulado por cliente ativa", target: "R$ 450,00", deadline: "Mês 12" },
    { label: "NPS (Grau de Satisfação)", sub: "Classificação pós-venda em 7 dias", target: "NBS 85+", deadline: "Frequente" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Simulator Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-[#193E39] font-bold text-base">
          <Calculator className="w-5 h-5 text-[#06A791]" />
          <h4>Modelador do Funil de Atração &amp; ROI do Lançamento</h4>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          Ajuste as variáveis de mídia paga local para prever e avaliar cenários comerciais sobre o volume de clientes ativas, custo de aquisição e retorno de faturamento bruto:
        </p>

        <div className="space-y-4 mb-6">
          {/* Ad Spend */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#193E39] mb-1">
              <span>Custos Mensais de Patrocínio Mídia:</span>
              <span className="text-[#06A791] font-semibold">R$ {adSpend}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="3000" 
              step="50"
              value={adSpend} 
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full accent-[#06A791]"
            />
          </div>

          {/* Leads */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#193E39] mb-1">
              <span>Contatos Iniciados Estimados (WhatsApp / Direct):</span>
              <span className="text-[#06A791] font-semibold">{estimatedLeads} contatos</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="600" 
              step="10"
              value={estimatedLeads} 
              onChange={(e) => setEstimatedLeads(Number(e.target.value))}
              className="w-full accent-[#06A791]"
            />
          </div>

          {/* Conversion Rate */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#193E39] mb-1">
              <span>Taxa de Fechamento de Vendas:</span>
              <span className="text-[#06A791] font-semibold">{conversionRate}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="1"
              value={conversionRate} 
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-[#06A791]"
            />
          </div>

          {/* Avg Ticket */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#193E39] mb-1">
              <span>Ticket Médio Estimado por Sacola:</span>
              <span className="text-[#06A791] font-semibold">R$ {avgTicket}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="250" 
              step="5"
              value={avgTicket} 
              onChange={(e) => setAvgTicket(Number(e.target.value))}
              className="w-full accent-[#06A791]"
            />
          </div>
        </div>

        {/* Output Metrics Panels */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#E0F5F2]/45 p-4 rounded-xl border border-[#b2e5df]/55">
          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-[9px] font-extrabold text-gray-400 block uppercase">Clientes Ganhos</span>
            <span className="text-sm font-extrabold text-[#193E39]">{calculatedClients}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-[9px] font-extrabold text-gray-400 block uppercase">CAC Calculado</span>
            <span className="text-sm font-extrabold text-[#193E39]">R$ {calculatedCAC}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-[9px] font-extrabold text-gray-400 block uppercase">Faturamento Bruto</span>
            <span className="text-sm font-extrabold text-emerald-700">R$ {estimatedRevenue}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-[9px] font-extrabold text-gray-400 block uppercase">ROAS Gerado</span>
            <span className="text-sm font-extrabold text-[#DF5CBD]">{calculatedROAS}x</span>
          </div>
        </div>
      </div>

      {/* KPI Goals Panel */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-[#193E39] font-bold text-base">
          <Award className="w-5 h-5 text-[#DF5CBD]" />
          <h4>Histórico de Métricas e Performance Financeira</h4>
        </div>

        <div className="divide-y divide-gray-100">
          {kpis.map((k, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center py-3.5 gap-2">
              <div>
                <span className="text-xs font-bold text-slate-800 block">{k.label}</span>
                <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{k.sub}</span>
              </div>
              <div className="flex items-center gap-3 justify-between sm:justify-start">
                <span className="text-xs font-extrabold text-[#06A791] sm:text-right">{k.target}</span>
                <span className="bg-[#E0F5F2] text-[#06A791] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {k.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Royal Strategy Guideline */}
      <div className="p-5 bg-gradient-to-br from-[#193E39] to-[#046e60] text-white rounded-2xl shadow-sm">
        <h4 className="text-xs font-bold flex items-center gap-1.5 mb-2 uppercase tracking-wide">
          <Compass className="w-4 h-4 text-[#DF5CBD]" /> Filosofia de Performance Local
        </h4>
        <p className="text-xs text-white/95 leading-relaxed">
          Garantir 40 a 50 clientes maduras reais em Indaiatuba gerando recomendações orgânicas sinceras possui maior conversão e eficácia de longo prazo do que arrecadar milhares de seguidores fantasmagóricos fora da região. Invista nas fundações de microterritório para crescer de maneira vigorosa e tecnicamente blindada.
        </p>
      </div>
    </motion.div>
  );
}
