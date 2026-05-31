import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, AlertTriangle, Eye, Palette, MessageSquare } from "lucide-react";
import { COLORS } from "../data";

export default function BrandingTab() {
  const [voiceScenario, setVoiceScenario] = useState<"venda" | "duvida" | "evento">("venda");

  const scenarios = {
    venda: {
      title: "Venda de Legging Premium (Canais Sociais)",
      wrong: "🔥 Meninas! Olhem que babado essa legging maravilhosa com uma vibe super cool pra arrasar nos treinos! Corre pra garantir a sua, miga! 🏃‍♀️✨",
      correct: "Nossa nova legging foi desenvolvida com tecido de alta densidade e tecnologia blackout para oferecer sustentação impecável ao corpo. Uma peça elegante e testada para que você sinta máxima segurança e liberdade em cada movimento.",
      why: "Elimina gírias saturadas ('babado', 'miga') que infantilizam a cliente. Prioriza termos de tecnologia têxtil, elegância e modelagem anatômica real."
    },
    duvida: {
      title: "Dúvida de tamanho no WhatsApp (Público de Pilates)",
      wrong: "Oii amada, tudo bom? Ah, depende do seu corpo né fofa! Olha nossa tabela lá no site e escolhe um maiorzinho se tiver com medo da barriguinha haha Beijos! 😘",
      correct: "Olá, Beatriz. Entendemos perfeitamente seu receio. Para facilitar sua escolha, nossas modelagens são desenhadas considerando a variação natural de curvas. Se preferir, compartilhe sua altura e peso estimado para indicarmos o caimento ideal.",
      why: "Remove vocativos excessivos ou capacitistas ('amada', 'fofa', 'barriguinha'). Adota postura consultiva séria, atenciosa e de alta empatia com a maturidade."
    },
    evento: {
      title: "Convite para Lançamento do Showroom local",
      wrong: "Hey galera! Super evento rolando na Joolt! Venha curtir essa vibe fitness incrível com música e muita animação! Não perca! 🥳 de graça!!",
      correct: "Convidamos você para conhecer o Fitting Room exclusivo Elife na Academia Joolt. Venha conhecer a textura dos nossos fios biodegradáveis, experimentar as modelagens e desfrutar de um café com atendimento acolhedor feito para você.",
      why: "Garante sofisticação no convite. Transforma o 'evento agitado' e barulhento em uma experiência sensorial calorosa e exclusiva, sintonizada com a saúde física."
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Intro Header */}
      <div className="bg-gradient-to-br from-[#193E39] to-[#06A791] text-white rounded-2xl p-6 shadow-md">
        <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Diretrizes de Marca
        </span>
        <h3 className="text-xl font-bold mt-2 font-sans tracking-tight">
          Identidade Premium, Acolhedora e Sofisticada
        </h3>
        <p className="text-xs text-white/95 mt-1 leading-relaxed">
          O storytelling do rebranding (da borboleta em transformação) gera forte identificação com mulheres modernas que buscam resgatar a saúde e a vitalidade sem a futilidade estética comum em academias tradicionais.
        </p>
      </div>

      {/* Cores Seção */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <div className="flex items-center gap-2.5 mb-4 text-[#193E39] font-bold text-base">
          <Palette className="w-5 h-5 text-[#06A791]" />
          <h4>Análise Estratégica da Paleta Crítica</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <div style={{ background: COLORS.darkGreen }} className="w-full h-14 rounded-lg mb-2 shadow-inner" />
            <span className="text-xs font-bold text-gray-800">Verde Forest Forest</span>
            <span className="text-[10px] text-gray-500 font-mono mt-0.5">{COLORS.darkGreen}</span>
            <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">Transmite autoridade clínica, acolhimento ecológico saudável e diferenciação de marcas baratas.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <div style={{ background: COLORS.teal }} className="w-full h-14 rounded-lg mb-2 shadow-inner" />
            <span className="text-xs font-bold text-gray-800">Verde Teal Ativo</span>
            <span className="text-[10px] text-gray-500 font-mono mt-0.5">{COLORS.teal}</span>
            <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">Energia de cura, movimento ativo equilibrado, limpeza tecnológica e frescor de vida.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <div style={{ background: COLORS.pink }} className="w-full h-14 rounded-lg mb-2 shadow-inner" />
            <span className="text-xs font-bold text-gray-800">Rosa Magenta Accent</span>
            <span className="text-[10px] text-gray-500 font-mono mt-0.5">{COLORS.pink}</span>
            <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">Poder, atitude e vitalidade feminina. Usado em pequenos toques para atrair atenção instantânea.</p>
          </div>
        </div>

        {/* Cores Checklist */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
            <Check className="w-5 h-5 text-[#06A791] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-emerald-800">Diferenciação Estética</span>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Utilizar proporções de 60% Forest Green (elegância sutil), 30% Off-White limpo e 10% Magenta para manter uma marca clean e com apelo premium em Indaiatuba.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-800">Acessibilidade / Contraste Textual</span>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Para o público sênior (50+), evite textos pequenos em rosa claro ou verde turquesa sobre fundo branco. Prefira contrastes profundos de Forest Green ou preto para legibilidade total.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulador de Diálogos */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8f4f2] shadow-sm">
        <div className="flex items-center gap-2.5 mb-3 text-[#193E39] font-bold text-base">
          <MessageSquare className="w-5 h-5 text-[#DF5CBD]" />
          <h4>Simulador de Tom de Voz da Equipe</h4>
        </div>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Veja a diferença tática entre a comunicação comum estigmatizada e a linguagem de autoridade recomendada para a marca Elife:
        </p>

        {/* Buttons to shift scenario */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
            <button
              id={`btn-scenario-${key}`}
              key={key}
              onClick={() => setVoiceScenario(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                voiceScenario === key
                  ? "bg-[#193E39] text-white shadow-sm"
                  : "bg-[#FAFAF8] text-gray-600 border border-gray-150 hover:bg-slate-100"
              }`}
            >
              {scenarios[key].title}
            </button>
          ))}
        </div>

        {/* Dialogue comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50/60 border border-red-100 rounded-xl">
            <div className="text-[10px] font-bold text-red-600 tracking-wider uppercase mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Comunicação Clichê Juvenilizada
            </div>
            <p className="text-xs text-gray-700 italic leading-relaxed">
              "{scenarios[voiceScenario].wrong}"
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <div className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase mb-1.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#06A791]" /> Linguagem Consultiva Elife
            </div>
            <p className="text-xs text-slate-800 font-semibold leading-relaxed">
              "{scenarios[voiceScenario].correct}"
            </p>
          </div>
        </div>

        {/* Rationale feedback */}
        <div className="mt-4 p-3.5 bg-gray-50 rounded-xl border border-gray-150 flex items-start gap-2.5">
          <Eye className="w-4 h-4 text-[#06A791] mt-0.5" />
          <div className="text-xs text-gray-700 leading-relaxed">
            <strong className="text-[#193E39]">Por que essa mudança funciona?</strong> {scenarios[voiceScenario].why}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
