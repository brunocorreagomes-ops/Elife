import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Filter, Users, DollarSign, Activity, MapPin, CheckCircle, HelpCircle, Copy, Check, Sparkles, MessageSquare, Compass, Gift } from "lucide-react";
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

  // State to control viewing the localized campaign panel
  const [showCampaign, setShowCampaign] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeCampaign = useMemo(() => {
    const isBuyer = purchasedBefore === "true";
    const isLeadOnly = purchasedBefore === "false";
    
    // Choose primary theme based on interest
    let headline = "Alta Compressão e Modelagem Real: Tecnologia que Cuida de Você";
    let whatsappPitch = "";
    let instagramHook = "Roteiro: Close elegante nas costuras da legging durante agachamentos. Frase: 'Feita para mulheres reais de Indaiatuba que buscam o equilíbrio perfeito de suporte muscular e sofisticação.'";
    let actionPlan = "Ativação de showroom físico itinerante no lobby da Academia Joolt para moradoras e alunas locais.";
    let segmentationRecommended = "Mulheres maduras, Moda fitness premium, Bem-estar feminino, Tecidos antiodor, Indaiatuba Parque Ecológico.";

    if (selectedInterest === "Corrida") {
      headline = "Velocidade sem Distrações - Modelagem que Acompanha Seu Ritmo";
      whatsappPitch = `Olá, [Nome]! Como estão os treinos de corrida? 🏃‍♀️ Passando para contar que nossa nova calça de alta compressão com bolso traseiro firme e cós duplo extra alto já está bombando. Ela não escorrega em passos longos e modela o abdômen sem apertar a cintura. No seu endereço de ${selectedCity === "All" ? "Indaiatuba" : selectedCity} a entrega por motoboy é imediata para teste de tamanhos. Quer agendar uma vistoria de malinha?`;
      instagramHook = "Roteiro de Reels: Mostre um close na costura dupla flat de reforço de quem corre no Parque Ecológico de Indaiatuba. Frase: 'A escolha de quem corre focada no asfalto, não em ajustar a roupa.'";
      actionPlan = "Disparar convites físicos aromáticos com sachets hidratantes no deck de caminhada do Parque Ecológico no final de semana.";
      segmentationRecommended = "Corrida de rua, Meia Maratona, Gramatura têxtil dupla, Fit firme para caminhadas, Parque Ecológico.";
    } else if (selectedInterest === "Pilates") {
      headline = "Fluidez e Alta Modelagem - Liberdade a Cada Movimento no Pilates";
      whatsappPitch = `Olá, [Nome], tudo bem? 🧘‍♀️ Nossas clientes do Pilates elogiam muito a maciez do nosso tecido duplo inteligente, porque ele dá 100% de flexibilidade e garante zero transparência em qualquer postura. Que tal podermos te enviar uma malinha selecionada em ${selectedCity === "All" ? "Indaiatuba" : selectedCity} com as novas cores exclusivas para você provar sem compromisso?`;
      instagramHook = "Roteiro de Reels: Exibição estética da suavidade das costuras em close-up. Frase de efeito: 'Menos tempo se preocupando com costuras apertando, mais tempo focando no seu equilíbrio.'";
      actionPlan = "Parceria com estúdios de Pilates de Indaiatuba, deixando uma calça modelo no manequim com cupom direcionado de desconto.";
      segmentationRecommended = "Pilates clínico, Alongamento postural, Tecido biodegradável premium, Autocuidado feminino maduro.";
    } else if (selectedInterest === "Yoga") {
      headline = "Toque Aveludado e Consciência - Moda Esportiva com Propósito";
      whatsappPitch = `Olá, [Nome]! Passando para te apresentar com exclusividade as peças Elife focadas em práticas integrativas. Compostas por poliamida de alta qualidade e cós bem alto, garantem conforto térmico e discrição absoluta. Podemos agendar uma visita personalizada com provador assistido?`;
      instagramHook = "Roteiro de Reels: Prática suave de asana com silhueta filtrada no showroom. focado na leveza e caimento real da peça. Frase: 'Roupas que respiram com você no tapete.'";
      actionPlan = "Degustação de chás orgânicos aromatizados com capim-limão nas salas de meditação locais na região metropolitana.";
      segmentationRecommended = "Yogini, Equilíbrio mental, Roupas fitness sem transparência, Joolt fitness.";
    } else {
      // Default / Mixed Interests
      whatsappPitch = `Olá, [Nome]! Tudo bem? Esperamos que sim. ✨ Preparamos uma curadoria especial com nossas leggings de alta compressão Elife fitness que esculpem e sustentam a musculatura, reduzindo o cansaço do pós-treino sem incômodos na barriga. Gostaria de receber nosso catálogo interativo ou experimentar as peças físicas em nosso provador parceiro na Academia Joolt?`;
    }

    // Adjust offer according to customer historical context
    if (isBuyer) {
      whatsappPitch += " Como você já é nossa cliente VIP, preparamos frete grátis garantido e uma consultoria personalizada de novas cores antes do lançamento oficial!";
    } else if (isLeadOnly) {
      whatsappPitch += " Garanta um sachet aromático exclusivo para gavetas de brinde em sua primeira compra física ou entrega agendada!";
    }

    return {
      headline,
      whatsappPitch,
      instagramHook,
      actionPlan,
      segmentationRecommended
    };
  }, [selectedCity, selectedInterest, purchasedBefore]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCreateCampaign = () => {
    setShowCampaign(true);
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

      {/* Dynamic Segment Local Action Console */}
      <div className="bg-[#193E39] text-white rounded-2xl p-6 border border-[#06A791]/30 shadow-md space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-[#06A791]/20">
          <div>
            <div className="flex items-center gap-1.5 text-[#06A791] text-[10px] uppercase font-bold tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Ativação Direta & Plano de Ação
            </div>
            <h4 className="text-sm font-bold text-white mt-1">
              "{computedSegmentName}" ({filteredClients.length} contatos)
            </h4>
          </div>
          <button
            onClick={() => handleCopy(activeCampaign.whatsappPitch, "all")}
            disabled={filteredClients.length === 0}
            className="text-[10px] bg-[#06A791]/20 hover:bg-[#06A791]/40 border border-[#06A791]/40 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
          >
            {copiedText === "all" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copiedText === "all" ? "Copiado!" : "Copiar WhatsApp"}
          </button>
        </div>

        {filteredClients.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Selecione filtros no CRM que contenham clientes para prever campanhas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Left Area - Copywriting Text */}
            <div className="space-y-4">
              {/* Campaign Headline */}
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Estratégia e Slogan Geral</span>
                <p className="font-bold text-white text-xs leading-snug">{activeCampaign.headline}</p>
              </div>

              {/* Whatsapp Script */}
              <div className="bg-white/5 rounded-xl p-3.5 border border-[#06A791]/15 space-y-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-[#06A791] uppercase tracking-wide flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Abordagem no WhatsApp (Personalizada)
                  </span>
                  <button
                    onClick={() => handleCopy(activeCampaign.whatsappPitch, "whatsapp")}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copiar mensagem"
                  >
                    {copiedText === "whatsapp" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-gray-250 leading-relaxed italic bg-black/10 p-2.5 rounded-lg border border-black/5">
                  "{activeCampaign.whatsappPitch}"
                </p>
                <div className="text-[9px] text-gray-400 flex items-center gap-1">
                  <span>💡 Use placeholders como [Nome] ao disparar individualmente.</span>
                </div>
              </div>
            </div>

            {/* Right Area - Tactics & Geolocalized Settings */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4">
              {/* Local Activation / Physical Plan */}
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                <span className="text-[9px] font-bold text-[#DF5CBD] uppercase tracking-wide flex items-center gap-1 mb-1.5">
                  <Gift className="w-3.5 h-3.5" /> Ação Física de Ativação (Showroom / Parcerias)
                </span>
                <p className="text-gray-300 leading-relaxed text-[11px]">
                  {activeCampaign.actionPlan}
                </p>
              </div>

              {/* Instagram Idea */}
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wide block mb-1.5">🎥 Reels / Instagram Hook Recomendado</span>
                <p className="text-gray-300 leading-relaxed text-[11px]">
                  {activeCampaign.instagramHook}
                </p>
              </div>

              {/* Meta Ads Recommended Settings */}
              <div className="bg-white/5 rounded-xl p-3.5 border border-[#06A791]/10">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-1">
                  <Compass className="w-3 h-3 text-gray-400" /> Palavras-chave & Segmentos no Meta Ads
                </span>
                <p className="text-gray-300 text-[10px] leading-relaxed font-mono">
                  {activeCampaign.segmentationRecommended}
                </p>
              </div>
            </div>
          </div>
        )}
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
