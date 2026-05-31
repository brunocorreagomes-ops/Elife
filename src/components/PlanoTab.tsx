import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Rocket, Sparkles, CheckSquare, Milestone, ShieldAlert, BadgeInfo } from "lucide-react";

export default function PlanoTab() {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    f1_insta: true,
    f1_whats: true,
    f1_fotos: false,
    f1_joolt: true,
    f1_influs: false,
    f2_show: false,
    f2_depo: false,
    f2_emb: false,
    f2_patr: false,
    f3_whats: false,
    f3_acad: false,
    f3_col: false,
    f3_fidel: false,
    f4_event: false,
    f4_site: false,
    f4_indic: false,
  });

  const toggleTask = (key: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const readinessScore = useMemo(() => {
    const total = Object.keys(checkedTasks).length;
    const completed = Object.values(checkedTasks).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, [checkedTasks]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Dynamic Readiness Card */}
      <div className="bg-gradient-to-br from-[#193E39] to-[#06A791] text-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center">
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Cronograma Operacional
          </span>
          <span className="text-xs font-mono font-bold text-emerald-200">Mapeamento de Maturidade</span>
        </div>
        <h3 className="text-xl font-bold mt-2 font-sans tracking-tight flex items-center gap-1.5">
          <Rocket className="w-5 h-5 text-[#DF5CBD]" /> Índice de Prontidão do Lançamento: {readinessScore}%
        </h3>
        
        {/* Progress Bar */}
        <div className="w-full bg-black/20 h-2.5 rounded-full mt-3.5 overflow-hidden">
          <div 
            className="bg-[#DF5CBD] h-full transition-all duration-500 ease-out" 
            style={{ width: `${readinessScore}%` }} 
          />
        </div>
        
        <p className="text-[11px] text-white/90 mt-2.5 leading-relaxed">
          Marque os checks nos cartões de tarefas abaixo conforme forem concluídos na prática para acompanhar a maturação até o dia do go-live oficial de Elife.
        </p>
      </div>

      {/* Fase 1 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100/70 text-[#193E39] font-bold text-sm">
          <Milestone className="w-4 h-4 text-[#06A791]" />
          <h4>Fase 1 — Mês 1 a 2: Fundações Digitais & Canal Joolt</h4>
        </div>
        
        <div className="space-y-3">
          {[
            { key: "f1_insta", label: "Otimizar perfil do Instagram da Elife (re-design de bio, paleta escura, destaques de biotipo)." },
            { key: "f1_whats", label: "Configurar catálogo ativo do WhatsApp Business com as fotos das primeiras leggings blackout." },
            { key: "f1_fotos", label: "Produzir sessão fotográfica com mulheres reais correndo no Parque Ecológico de Indaiatuba." },
            { key: "f1_joolt", label: "Ativar display e QR Code promocional da marca na recepção e vestiários da Academia Joolt." },
            { key: "f1_influs", label: "Enviar o primeiro lote de kits de unboxing olfativo para as 5 micro-influenciadoras selecionadas." }
          ].map(task => (
            <label key={task.key} className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-gray-700 select-none">
              <input 
                type="checkbox" 
                checked={checkedTasks[task.key]} 
                onChange={() => toggleTask(task.key)}
                className="w-4.5 h-4.5 rounded border-gray-300 text-[#06A791] focus:ring-[#06A791] mt-0.5 cursor-pointer"
              />
              <span className={checkedTasks[task.key] ? "line-through text-gray-400 font-medium" : "font-semibold"}>{task.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fase 2 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100/70 text-[#193E39] font-bold text-sm">
          <Milestone className="w-4 h-4 text-purple-600" />
          <h4>Fase 2 — Mês 3 a 4: Validação Directa & Showrooms</h4>
        </div>
        
        <div className="space-y-3">
          {[
            { key: "f2_show", label: "Realizar o primeiro showroom físico interativo de experimentação na Joolt com café gourmet." },
            { key: "f2_depo", label: "Coletar e estruturar em vídeo os primeiros 10 relatos sinceros das primeiras alunas clientes." },
            { key: "f2_emb", label: "Implementar o programa de créditos para embaixadoras de marca selecionadas no showroom." },
            { key: "f2_patr", label: "Patrocinar corrida de rua ou caminhada ecológica local organizada em Indaiatuba." }
          ].map(task => (
            <label key={task.key} className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-gray-700 select-none">
              <input 
                type="checkbox" 
                checked={checkedTasks[task.key]} 
                onChange={() => toggleTask(task.key)}
                className="w-4.5 h-4.5 rounded border-gray-300 text-[#06A791] focus:ring-[#06A791] mt-0.5 cursor-pointer"
              />
              <span className={checkedTasks[task.key] ? "line-through text-gray-400 font-medium" : "font-semibold"}>{task.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fase 3 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100/70 text-[#193E39] font-bold text-sm">
          <Milestone className="w-4 h-4 text-[#DF5CBD]" />
          <h4>Fase 3 — Mês 5 a 8: Escala da Comunidade de Recompra</h4>
        </div>
        
        <div className="space-y-3">
          {[
            { key: "f3_whats", label: "Lançar clube VIP de bem-estar no WhatsApp com informativos de saúde para as cadastradas." },
            { key: "f3_acad", label: "Expandir o formato de provador itinerante para mais dois estúdios de Pilates em Indaiatuba ou Itu." },
            { key: "f3_col", label: "Desenvolver uma cor cápsula exclusiva de calça legging em parceria com uma assessora esportiva renomada." },
            { key: "f3_fidel", label: "Instalar mensagens pós-venda em 45 dias com desconto para a segunda peça, visando LTV." }
          ].map(task => (
            <label key={task.key} className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-gray-700 select-none">
              <input 
                type="checkbox" 
                checked={checkedTasks[task.key]} 
                onChange={() => toggleTask(task.key)}
                className="w-4.5 h-4.5 rounded border-gray-300 text-[#06A791] focus:ring-[#06A791] mt-0.5 cursor-pointer"
              />
              <span className={checkedTasks[task.key] ? "line-through text-gray-400 font-medium" : "font-semibold"}>{task.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Plano de Contingência */}
      <div className="bg-white rounded-2xl p-5 border border-red-50 shadow-xs">
        <div className="flex items-center gap-2 mb-3 text-red-700 font-bold text-sm">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <h4>Ações de Contingência e Mitigação de Riscos</h4>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
            <span className="text-[10px] font-extrabold text-red-700 uppercase tracking-wide">Risco: Tráfego local do Instagram com lead fraco</span>
            <p className="text-xs text-gray-700 mt-1 leading-relaxed">
              <strong>Ação Preventiva:</strong> Cortar e realocar orçamento de criativos estáticos gerais e focar 100% no impulsionamento de reels que possuem as professoras de Pilates demonstrando a mobilidade extrema da marca.
            </p>
          </div>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
            <span className="text-[10px] font-extrabold text-red-700 uppercase tracking-wide">Risco: Resistência ao valor do ticket (R$ 169)</span>
            <p className="text-xs text-gray-700 mt-1 leading-relaxed">
              <strong>Ação Preventiva:</strong> Oferecer parcelamento em 3x sem juros nativo e promover kits promocionais (Dupla: Legging + Top) para embutir o preço de forma suave.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
