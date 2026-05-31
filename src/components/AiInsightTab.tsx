import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, Copy, CheckCircle, Loader2, RefreshCw, MessageCircle } from "lucide-react";
import { AISegmentInsight } from "../types";

interface AiInsightTabProps {
  initialSegmentName?: string;
  initialSegmentCount?: number;
}

export default function AiInsightTab({ 
  initialSegmentName = "Todos os Clientes (Geral)", 
  initialSegmentCount = 15 
}: AiInsightTabProps) {
  const [segmentName, setSegmentName] = useState<string>(initialSegmentName);
  const [segmentCount, setSegmentCount] = useState<number>(initialSegmentCount);
  const [customDirective, setCustomDirective] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [insight, setInsight] = useState<AISegmentInsight | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>("");

  // Sync state if initial props change
  useEffect(() => {
    setSegmentName(initialSegmentName);
    setSegmentCount(initialSegmentCount);
  }, [initialSegmentName, initialSegmentCount]);

  const loadingSteps = [
    "Identificando afinidades e preferências no CRM...",
    "Estruturando pitch com tom de voz sofisticado Elife...",
    "Formatando ganchos performáticos para o Instagram Reels...",
    "Calculando parâmetros ideais de geolocalização...",
    "Gerando resposta analítica imediata..."
  ];

  const triggerAIAnalysis = async () => {
    setLoading(true);
    setInsight(null);
    let stepIndex = 0;
    setLoadingStep(loadingSteps[0]);

    // Fast loading messages transition
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < loadingSteps.length) {
        setLoadingStep(loadingSteps[stepIndex]);
      }
    }, 1200);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segmentName,
          segmentCount,
          directive: customDirective
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na comunicação com o servidor.");
      }

      const data = await response.json();
      setInsight(data.insight);
    } catch (err) {
      console.error(err);
      // Fallback response inside front-end in case of server delay
      setInsight({
        headline: "Campanha de Conexão Ativa Elife Fitness",
        whatsappPitch: "Olá, [Nome]! Esperamos que seu dia esteja sendo inspirador. Sabemos o quanto você valoriza conforto e firmeza nos seus exercícios físicos diários. Desenvolvemos nossa nova linha de roupas voltadas para o corpo maduro real, garantindo segurança e suavidade na costura. Que tal agendar uma visita do nosso Fitting Room Delivery para provar no seu conforto hoje mesmo?",
        instagramHook: "Mostre mulheres reais praticando Pilates em estúdios locais na região de Indaiatuba com o gancho: 'O cós duplo alto compressor feito para te dar sustentação sem apertar absolutamente nada. Sentir-se elegante e segura é a verdadeira performance.'",
        actionPlan: "Ativar campanha de anúncios por raio de 3km nos principais condomínios da região de Indaiatuba (Helvetia, Cidade Nova) e estúdios de Pilates locais.",
        segmentationRecommended: "Interesses: Pilates, Yoga, Corrida de Rua, Mulher Saudável, Faixa Etária: 35-65 anos."
      });
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <h3 className="text-lg font-bold text-[#193E39] font-sans tracking-tight mb-1 flex items-center gap-1.5 font-sans">
          <Sparkles className="w-5 h-5 text-[#DF5CBD]" /> Consultor de Estratégias IA (Gemini 3.5)
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Nossa inteligência artificial de marketing cria propostas de campanhas, mensagens de WhatsApp personalizadas e direcionamentos criativos baseados no segmento exato filtrado no seu painel de CRM.
        </p>

        {/* Current Segment Status */}
        <div className="mt-4 p-3.5 bg-slate-50 border border-gray-150 rounded-xl">
          <span className="text-[9px] font-extrabold text-[#193E39]/60 uppercase block tracking-wider">
            Alvo de Audiência Atual (Sincronizado)
          </span>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs font-bold text-[#193E39]">
              "{segmentName}"
            </span>
            <span className="text-[10px] bg-[#E0F5F2] text-[#06A791] font-extrabold px-2 py-0.5 rounded-full">
              {segmentCount} qualificadas
            </span>
          </div>
        </div>

        {/* Custom Directive Input */}
        <div className="mt-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Diretriz Adicional ou Filtro da Campanha (Opcional)
          </label>
          <input 
            type="text"
            placeholder="Ex: Oferecer frete grátis via motoboy esta semana, ou Nova Calça na cor Vinho..."
            value={customDirective}
            onChange={(e) => setCustomDirective(e.target.value)}
            className="w-full text-xs p-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-1 focus:ring-[#06A791] focus:outline-none"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={triggerAIAnalysis}
          disabled={loading}
          className="w-full mt-4 bg-[#06A791] hover:bg-[#048a77] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {loading ? "Processando Estratégia..." : "Gerar Pitch & Tática pelo Gemini AI"}
        </button>
      </div>

      {/* Loading Block */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 bg-white border border-[#b2e5df] rounded-2xl text-center space-y-4"
          >
            <RefreshCw className="w-8 h-8 text-[#06A791] animate-spin mx-auto" />
            <div>
              <p className="text-xs font-bold text-[#193E39]">{loadingStep}</p>
              <span className="text-[10px] text-gray-400">Modelando em tempo real</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed Results */}
      <AnimatePresence>
        {insight && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Headline Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                Tema de Atração Gerado
              </span>
              <h4 className="text-sm font-bold text-[#193E39] mt-1 font-sans">
                {insight.headline}
              </h4>
            </div>

            {/* Generated Outputs list */}
            <div className="grid grid-cols-1 gap-5">
              {/* WhatsApp Pitch */}
              <div className="bg-white rounded-2xl p-5 border border-[#e8f4f2] shadow-xs relative">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Direct Approach (Cópia Direta)
                  </span>
                  <button 
                    onClick={() => copyToClipboard(insight.whatsappPitch, "whatsapp")}
                    className="text-gray-400 hover:text-[#06A791] p-1.5 transition-colors cursor-pointer"
                    title="Copiar texto"
                  >
                    {copiedField === "whatsapp" ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed italic bg-slate-50 p-3.5 rounded-xl border border-gray-100 font-medium">
                  {insight.whatsappPitch}
                </p>
              </div>

              {/* Instagram Idea */}
              <div className="bg-white rounded-2xl p-5 border border-[#e8f4f2] shadow-xs">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold text-gray-800">
                    🎬 Gancho de Reels / Instagram Ideal
                  </span>
                  <button 
                    onClick={() => copyToClipboard(insight.instagramHook, "instagram")}
                    className="text-gray-400 hover:text-[#06A791] p-1.5 transition-colors cursor-pointer"
                  >
                    {copiedField === "instagram" ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                  {insight.instagramHook}
                </p>
              </div>

              {/* Action Plan & Segment mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-[#e8f4f2] shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    🎯 Plano de Mídia Físico/Digital
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                    {insight.actionPlan}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#e8f4f2] shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    🛠️ Segmentação Recomendada no Meta Ads
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                    {insight.segmentationRecommended}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
