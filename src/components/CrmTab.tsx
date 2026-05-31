import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Filter, Users, DollarSign, Activity, MapPin, CheckCircle, HelpCircle } from "lucide-react";
import { crmClients } from "../data";
import { CRMClient } from "../types";

interface CrmTabProps {
  onSelectSegment: (segmentName: string, count: number) => void;
}

export default function CrmTab({ onSelectSegment }: CrmTabProps) {
  // Filter states
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedInterest, setSelectedInterest] = useState<string>("All");
  const [selectedEngagement, setSelectedEngagement] = useState<string>("All");
  const [purchasedBefore, setPurchasedBefore] = useState<string>("All");

  // Dynamic filter processing
  const filteredClients = useMemo(() => {
    return crmClients.filter((client) => {
      if (selectedCity !== "All" && client.city !== selectedCity) return false;
      if (selectedInterest !== "All" && client.activityInterest !== selectedInterest) return false;
      if (selectedEngagement !== "All" && client.engagementScore !== selectedEngagement) return false;
      if (purchasedBefore !== "All") {
        const isBought = purchasedBefore === "true";
        if (client.purchasedBefore !== isBought) return false;
      }
      return true;
    });
  }, [selectedCity, selectedInterest, selectedEngagement, purchasedBefore]);

  // Real-time metric computations
  const totalSpend = useMemo(() => {
    return filteredClients.reduce((acc, current) => acc + current.spendAmount, 0);
  }, [filteredClients]);

  const averageAge = useMemo(() => {
    if (filteredClients.length === 0) return 0;
    const sum = filteredClients.reduce((acc, current) => acc + current.age, 0);
    return Math.round(sum / filteredClients.length);
  }, [filteredClients]);

  const whatsappSafeCount = useMemo(() => {
    return filteredClients.filter(c => c.whatsappOptIn).length;
  }, [filteredClients]);

  // Compute label for selected segment
  const computedSegmentName = useMemo(() => {
    let parts: string[] = [];
    if (selectedCity !== "All") parts.push(`em ${selectedCity}`);
    if (selectedInterest !== "All") parts.push(`focadas em ${selectedInterest}`);
    if (selectedEngagement !== "All") parts.push(`com engajamento ${selectedEngagement}`);
    if (purchasedBefore !== "All") {
      parts.push(purchasedBefore === "true" ? "já clientes" : "leads frias");
    }

    if (parts.length === 0) return "Todos os Clientes (Geral)";
    return `Mulheres ${parts.join(", ")}`;
  }, [selectedCity, selectedInterest, selectedEngagement, purchasedBefore]);

  const handleCreateCampaign = () => {
    onSelectSegment(computedSegmentName, filteredClients.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Intro Block */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <h3 className="text-lg font-bold text-[#193E39] font-sans tracking-tight mb-1 flex items-center gap-1.5">
          <Filter className="w-5 h-5 text-[#06A791]" /> Motor de Segmentação Avançada (CRM)
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Nossa base integrada de clientes e leads frias de Indaiatuba, Salto e região. 
          Use os filtros abaixo para agrupar públicos em tempo real por comportamento e interesse para tomada de decisão ágil:
        </p>

        {/* Filters Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-gray-100">
          {/* City */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Cidade</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-gray-200 rounded-lg text-gray-800 font-medium focus:ring-1 focus:ring-[#06A791] focus:outline-none"
            >
              <option value="All">Todas as Cidades</option>
              <option value="Indaiatuba">Indaiatuba</option>
              <option value="Salto">Salto</option>
              <option value="Itu">Itu</option>
              <option value="Campinas">Campinas</option>
            </select>
          </div>

          {/* Activity Interest */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Interesse</label>
            <select
              value={selectedInterest}
              onChange={(e) => setSelectedInterest(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-gray-200 rounded-lg text-gray-800 font-medium focus:ring-1 focus:ring-[#06A791] focus:outline-none"
            >
              <option value="All">Todos os Esportes</option>
              <option value="Corrida">Corrida</option>
              <option value="Pilates">Pilates</option>
              <option value="Funcional">Funcional</option>
              <option value="Yoga">Yoga</option>
              <option value="Musculação">Musculação</option>
            </select>
          </div>

          {/* Engagement Score */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Engajamento Social</label>
            <select
              value={selectedEngagement}
              onChange={(e) => setSelectedEngagement(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-gray-200 rounded-lg text-gray-800 font-medium focus:ring-1 focus:ring-[#06A791] focus:outline-none"
            >
              <option value="All">Todos os Níveis</option>
              <option value="Alta">Engajamento Alto</option>
              <option value="Média">Engajamento Médio</option>
              <option value="Baixa">Engajamento Baixo</option>
            </select>
          </div>

          {/* Purchased Before */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Histórico Comercial</label>
            <select
              value={purchasedBefore}
              onChange={(e) => setPurchasedBefore(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-gray-200 rounded-lg text-gray-800 font-medium focus:ring-1 focus:ring-[#06A791] focus:outline-none"
            >
              <option value="All">Todos os Contatos</option>
              <option value="true">Já Compraram (Cliente)</option>
              <option value="false">Não Compraram (Lead)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Relatório Analítico em Tempo Real */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric Card 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#e8f4f2] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-2 text-[#06A791]">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-gray-400 uppercase block mb-0.5">Tamanho do Segmento</span>
          <span className="text-xl font-extrabold text-[#193E39]">{filteredClients.length}</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Mulheres ativas</span>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#e8f4f2] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-2 text-[#8B5CF6]">
            <DollarSign className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-gray-400 uppercase block mb-0.5">Faturamento Acumulado</span>
          <span className="text-xl font-extrabold text-[#193E39]">R$ {totalSpend}</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Investido na marca</span>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#e8f4f2] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-2 text-[#DF5CBD]">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-gray-400 uppercase block mb-0.5">Média de Idade</span>
          <span className="text-xl font-extrabold text-[#193E39]">{averageAge} <span className="text-xs font-normal text-gray-500">anos</span></span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Adulto maduro</span>
        </div>

        {/* Metric Card 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#e8f4f2] shadow-xs text-center">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-2 text-emerald-600">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-gray-400 uppercase block mb-0.5">WhatsApp Autorizado</span>
          <span className="text-xl font-extrabold text-emerald-700">{whatsappSafeCount} <span className="text-xs font-normal text-gray-400">/{filteredClients.length}</span></span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Prontas para disparo</span>
        </div>
      </div>

      {/* Dynamic Segment CTA Banner */}
      <div className="bg-gradient-to-r from-[#193E39] to-[#06A791] p-5 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="text-[9px] font-bold text-white/70 uppercase">Segmento Selecionado</div>
          <h4 className="text-xs font-extrabold text-white mt-1 leading-snug max-w-md">
            "{computedSegmentName}"
          </h4>
          <p className="text-[10px] text-white/80 mt-0.5">
            Totalize {filteredClients.length} clientes qualificadas para receber uma abordagem personalizada gerada por inteligência artificial.
          </p>
        </div>
        <button
          onClick={handleCreateCampaign}
          disabled={filteredClients.length === 0}
          className="bg-[#DF5CBD] hover:bg-[#c94fa9] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          🔮 Gerar Ativação no Planejador IA
        </button>
      </div>

      {/* Client List table and profile */}
      <div className="bg-white rounded-2xl border border-[#e8f4f2] shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-gray-150 flex items-center justify-between">
          <span className="text-xs font-bold text-[#193E39]">Contatos Filtrados ({filteredClients.length})</span>
          <span className="text-[10px] text-gray-400 font-medium">Cidade / Interesse</span>
        </div>

        {filteredClients.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <HelpCircle className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-xs font-medium">Nenhum cliente atende aos requisitos exatos de filtros selecionados.</p>
          </div>
        ) : (
          <motion.div 
            key={`${selectedCity}-${selectedInterest}-${selectedEngagement}-${purchasedBefore}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="divide-y divide-gray-100 max-h-80 overflow-y-auto"
          >
            {filteredClients.map((client, idx) => (
              <motion.div 
                key={client.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.2), ease: "easeOut" }}
                className="p-3.5 hover:bg-slate-50/50 flex justify-between items-center transition-colors"
              >
                <div className="flex gap-2.5 items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-gray-600">
                    {client.name.split(" ")[0][0]}{client.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      {client.name} 
                      <span className="text-[10px] text-gray-400 font-normal">({client.age} anos)</span>
                    </h5>
                    <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                      <span className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                        <Activity className="w-2.5 h-2.5" /> {client.activityInterest}
                      </span>
                      <span className="bg-[#FAFAF8] text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5" /> {client.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-[#193E39]">
                    {client.purchasedBefore ? `R$ ${client.spendAmount}` : "Lead Sêco"}
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-extrabold ${
                    client.engagementScore === "Alta" ? "text-emerald-600" : client.engagementScore === "Média" ? "text-amber-500" : "text-gray-400"
                  }`}>
                    Engajamento {client.engagementScore}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
