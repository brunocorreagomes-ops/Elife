import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, CreditCard, MapPin, Radio, Gift, HelpCircle, CheckCircle2 } from "lucide-react";
import { unboxingSteps } from "../data";

export default function FourPsTab() {
  const [unboxingIndex, setUnboxingIndex] = useState<number>(0);

  const ps = [
    {
      title: "1ª P — Produto & Modelagem",
      subtitle: "Caimento inteligente e proteção superior",
      icon: <ShoppingBag className="w-5 h-5 text-[#06A791]" />,
      points: [
        "Zero Transparência: Tecido duplo blackout de alta gramatura testado sob forte tração em movimentos de Pilates e agachamentos.",
        "Modelagem Real Body: Curvas ajustadas para os biotipos reais brasileiros (tamanhos P ao G4) com reforço abdominal suave de cós duplo.",
        "Toque Ecológico: Fiapos e costuras macias antialérgicas que evitam assaduras no calor de Indaiatuba."
      ]
    },
    {
      title: "2ª P — Preço & Posicionamento",
      subtitle: "Valor agregado e compra recorrente",
      icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      points: [
        "Estratégia Mid-Premium: Peças variando de R$ 119 a R$ 189, preenchendo o vácuo entre marcas básicas baratas e importações exorbitantes.",
        "Clube de Ativação Elife: Desconto de 15% na recompra para clientes que retornam no prazo de 45 dias, estimulando maior LTV corporativo.",
        "Transparência de Margem: Garante robustez financeira de 3.2x sobre o custo fabril para subsidiar custos logísticos locais."
      ]
    },
    {
      title: "3ª P — Praça & Canais Locais",
      subtitle: "Distribuição consultiva integrada",
      icon: <MapPin className="w-5 h-5 text-[#193E39]" />,
      points: [
        "Venda Conversacional no WhatsApp: Catálogo interativo e fechamento em menos de 5 minutos com suporte de tamanho humanizado.",
        "Showrooms Itinerantes: Parcerias físicas de demonstração na Academia Joolt para toque sensorial no material.",
        "Fitting Room Delivery: Envio de sacolas exclusivas com variados tamanhos via motoboy para teste privativo em domicílio."
      ]
    },
    {
      title: "4ª P — Promoção & Micro-Influência",
      subtitle: "Engajamento local e atração orgânica",
      icon: <Radio className="w-5 h-5 text-[#DF5CBD]" />,
      points: [
        "Campanhas Hiper-Focalizadas: Anúncios pagos geolocalizados em Indaiatuba no entorno de condomínios fechados e estúdios fitness.",
        "Líderes de Opinião: Sem influencers genéricas de dancinha. Apoio de acadêmicas, médicas e treinadoras locais maduras.",
        "Indique e Ganhe: Bônus de crédito recíproco para indicações bem-sucedidas em grupos de WhatsApp de corrida e Pilates."
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Intro */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <h3 className="text-lg font-bold text-[#193E39] font-sans tracking-tight mb-1 flex items-center gap-1.5">
          <CheckCircle2 className="w-5 h-5 text-[#06A791]" /> Pilares Estratégicos (Os 4 Ps do Marketing de Valor)
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Definimos o mix de marketing de Elife focados na entrega de valor excepcional, com custo de operação extremamente enxuto e escalabilidade baseada no WhatsApp:
        </p>
      </div>

      {/* Grid of the 4 Ps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ps.map((p, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100/50">
                {p.icon}
                <div>
                  <h4 className="text-xs font-bold text-[#193E39]">{p.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{p.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-1.5 mt-2">
                {p.points.map((pt, pIdx) => {
                  const labelParts = pt.split(":");
                  return (
                    <li key={pIdx} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06A791] mt-1.5 flex-shrink-0" />
                      <div>
                        <strong>{labelParts[0]}:</strong>{labelParts[1]}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Unboxing Showcase */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-[#193E39] font-bold text-base">
          <Gift className="w-5 h-5 text-[#DF5CBD]" />
          <h4>Ritual Ofativo de Unboxing Elife</h4>
        </div>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Como não possuímos provador de shopping físico tradicional, o momento de abrir a caixa é onde ocorre o maior encantamento tátil e sensorial da cliente. Clique nas fases abaixo e vivencie o fluxo:
        </p>

        {/* Phase Selectors */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {unboxingSteps.map((step, idx) => (
            <button
              id={`btn-unboxing-step-${idx}`}
              key={idx}
              onClick={() => setUnboxingIndex(idx)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                unboxingIndex === idx
                  ? "bg-[#06A791] text-white shadow-sm"
                  : "bg-slate-50 text-gray-600 border border-gray-200 hover:bg-slate-100"
              }`}
            >
              Fase 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Display Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={unboxingIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="p-4 bg-[#E0F5F2] border border-[#b2e5df] rounded-xl flex items-start gap-3"
          >
            <HelpCircle className="w-5 h-5 text-[#06A791] mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-xs text-[#193E39] block mb-0.5">
                {unboxingSteps[unboxingIndex].title}
              </strong>
              <p className="text-[11px] text-[#374151] leading-relaxed">
                {unboxingSteps[unboxingIndex].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
