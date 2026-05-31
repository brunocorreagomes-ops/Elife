import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ListChecks, AlertCircle, ArrowUpRight, ShieldAlert, Sparkles, CheckSquare } from "lucide-react";
import { swotActions } from "../data";

export default function SwotTab() {
  const [activeSquare, setActiveSquare] = useState<"forces" | "weaknesses" | "opportunities" | "threats" | null>(null);

  const keyDetails = {
    forces: {
      emoji: "💪",
      color: "text-[#06A791]",
      bg: "bg-teal-50 border-teal-200"
    },
    weaknesses: {
      emoji: "⚠️",
      color: "text-[#F59E0B]",
      bg: "bg-amber-50 border-amber-200"
    },
    opportunities: {
      emoji: "🚀",
      color: "text-[#8B5CF6]",
      bg: "bg-purple-50 border-purple-200"
    },
    threats: {
      emoji: "⚡",
      color: "text-[#EF4444]",
      bg: "bg-red-50 border-red-200"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Overview Block */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <h3 className="text-lg font-bold text-[#193E39] font-sans tracking-tight mb-1 flex items-center gap-1.5">
          <ListChecks className="w-5 h-5 text-[#06A791]" /> Matriz SWOT de Posicionamento Digital
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Nossa competitividade foi mapeada com base em dados de mercado de Indaiatuba e na infraestrutura enxuta da marca. 
          <strong> Toque em qualquer quadrante da matriz</strong> para obter o plano tático interativo de amplificação ou bloqueio correspondente:
        </p>

        {/* Quadrantes SWOT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {/* FORÇAS */}
          <div 
            onClick={() => setActiveSquare(activeSquare === "forces" ? null : "forces")}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
              activeSquare === "forces" 
                ? "bg-emerald-50 border-emerald-400 shadow-sm ring-2 ring-emerald-100" 
                : "bg-white border-gray-150 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#06A791]" /> Forças (Interno)
              </span>
              <span className="text-lg">💪</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Branding visual impecável, exclusividade de biotipos maduros e parceria direta na Academia Joolt.
            </p>
          </div>

          {/* FRAQUEZAS */}
          <div 
            onClick={() => setActiveSquare(activeSquare === "weaknesses" ? null : "weaknesses")}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
              activeSquare === "weaknesses" 
                ? "bg-amber-50 border-amber-400 shadow-sm ring-2 ring-amber-100" 
                : "bg-white border-gray-150 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Fraquezas (Interno)
              </span>
              <span className="text-lg">⚠️</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Marca nova sem prova social local, ausência de provador físico próprio e slogan corporativo estrangeiro.
            </p>
          </div>

          {/* OPORTUNIDADES */}
          <div 
            onClick={() => setActiveSquare(activeSquare === "opportunities" ? null : "opportunities")}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
              activeSquare === "opportunities" 
                ? "bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-100" 
                : "bg-white border-gray-150 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-[#8B5CF6]" /> Oportunidades (Externo)
              </span>
              <span className="text-lg">🚀</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Alto poder aquisitivo em Indaiatuba, mercado de Pilates expandindo e carência de roupas de fitness dignas 40+.
            </p>
          </div>

          {/* AMEAÇAS */}
          <div 
            onClick={() => setActiveSquare(activeSquare === "threats" ? null : "threats")}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
              activeSquare === "threats" 
                ? "bg-red-50 border-red-400 shadow-sm ring-2 ring-red-100" 
                : "bg-white border-gray-150 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-500" /> Ameaças (Externo)
              </span>
              <span className="text-lg">⚡</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Fast-fashion de importação (Shein), gigantes globais dominando anúncios digitais gerais e imitadores locais de microbairro.
            </p>
          </div>
        </div>
      </div>

      {/* Plano Cruzado estratégico reativo */}
      <AnimatePresence mode="wait">
        {activeSquare ? (
          <motion.div
            key={activeSquare}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 rounded-2xl border ${keyDetails[activeSquare].bg} shadow-sm`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{keyDetails[activeSquare].emoji}</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#193E39]">
                {swotActions[activeSquare].title}
              </h4>
            </div>

            <div className="space-y-2.5">
              {swotActions[activeSquare].items.map((action, idx) => (
                <div key={idx} className="flex gap-2.5 items-start p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-gray-100 shadow-2xs">
                  <span className={`text-xs font-extrabold font-mono ${keyDetails[activeSquare].color} mt-0.5`}>
                    0{idx + 1}
                  </span>
                  <p className="text-xs text-gray-800 font-medium leading-relaxed">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="p-6 bg-slate-50/70 border border-slate-100 rounded-2xl text-center">
            <Sparkles className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium font-sans">
              Interaja clicando em qualquer quadrante SWOT acima para analisar as ações práticas correspondentes.
            </p>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
