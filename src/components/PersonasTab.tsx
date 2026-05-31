import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, XCircle, Zap, ShieldCheck } from "lucide-react";
import { personas, COLORS } from "../data";

export default function PersonasTab() {
  const [activeId, setActiveId] = useState<string>("ana");

  const currentPersona = personas.find(p => p.id === activeId) || personas[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <h3 className="text-lg font-bold text-[#193E39] font-sans tracking-tight mb-1 flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-[#DF5CBD]" /> Personas Ativas & Segmentos de Audiência
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Nossa marca não se comunica com 'qualquer praticante esportivo'. Desenvolvemos estratégias separadas para os perfis majoritários identificados na região Metropolitana de Indaiatuba. Selecione um perfil para ver sua ficha profunda e seu funil estratégico personalizado:
        </p>

        {/* Buttons to switch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {personas.map((p) => {
            const isActive = p.id === activeId;
            return (
              <button
                id={`btn-persona-${p.id}`}
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className="flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200"
                style={{
                  borderColor: isActive ? p.color : "#E8F4F2",
                  background: isActive ? p.bg : "#fff",
                  boxShadow: isActive ? `0 4px 12px ${p.color}15` : "none"
                }}
              >
                <div 
                  style={{ background: isActive ? `${p.color}30` : "#f3f4f6" }} 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                >
                  {p.emoji}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#193E39] truncate">{p.name.split(" ")[0]}</div>
                  <div className="text-[10px] text-gray-400 font-mono truncate">{p.age} • {p.role.split(" / ")[0]}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Persona Deep Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Ficha Geral */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-gray-100">
              <span className="text-2xl">{currentPersona.emoji}</span>
              <div>
                <h4 className="text-base font-bold text-[#193E39]">{currentPersona.name}</h4>
                <p className="text-[11px] text-gray-500 font-medium">{currentPersona.role}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">Biografia & Estilo de Vida</span>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">{currentPersona.bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100">
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100/55">
                <span className="text-[10px] uppercase font-extrabold text-red-600 tracking-wider flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Maiores Impedimentos (Dores)
                </span>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed font-medium">
                  {currentPersona.pain}
                </p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/55">
                <span className="text-[10px] uppercase font-extrabold text-[#06A791] tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Gatilho de Atração Directa
                </span>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed font-semibold">
                  {currentPersona.trigger}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline da Jornada */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#06A791]" />
              <h4 className="text-sm font-bold text-[#193E39] font-sans tracking-tight">
                Funil de Engajamento e Jornada de Decisão
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {currentPersona.journey.map((step, idx) => {
                const stepColors = [
                  { label: "Descoberta", bg: "bg-teal-50 border-teal-100", text: "text-teal-700" },
                  { label: "Atração", bg: "bg-purple-50 border-purple-100", text: "text-[#8B5CF6]" },
                  { label: "Decisão", bg: "bg-pink-50 border-pink-100", text: "text-[#DF5CBD]" },
                  { label: "Loyalty", bg: "bg-emerald-50 border-emerald-100", text: "text-emerald-700" }
                ];
                const c = stepColors[idx] || stepColors[0];

                return (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-xl border ${c.bg} shadow-xs flex flex-col justify-between h-full`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-[9px] uppercase font-extrabold tracking-widest ${c.text}`}>
                          {step.phase}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono font-bold">0{idx+1}</span>
                      </div>
                      <p className="text-xs text-gray-800 font-medium leading-normal">
                        {step.channel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
