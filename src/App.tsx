import React, { useState } from "react";
import { tabs, COLORS } from "./data";
import BrandingTab from "./components/BrandingTab";
import PersonasTab from "./components/PersonasTab";
import SwotTab from "./components/SwotTab";
import FourPsTab from "./components/FourPsTab";
import CrmTab from "./components/CrmTab";
import PlanoTab from "./components/PlanoTab";
import KpisTab from "./components/KpisTab";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("brand");
  
  // Segment state from CRM
  const [selectedSegment, setSelectedSegment] = useState<string>("Todos os Clientes (Geral)");
  const [selectedSegmentCount, setSelectedSegmentCount] = useState<number>(15);

  const handleSelectSegment = (segmentName: string, count: number) => {
    setSelectedSegment(segmentName);
    setSelectedSegmentCount(count);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "brand":
        return <BrandingTab />;
      case "personas":
        return <PersonasTab />;
      case "swot":
        return <SwotTab />;
      case "4ps":
        return <FourPsTab />;
      case "crm":
        return <CrmTab onSelectSegment={handleSelectSegment} />;
      case "plano":
        return <PlanoTab />;
      case "kpis":
        return <KpisTab />;
      default:
        return <BrandingTab />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#FAFAF8] pb-16 antialiased selection:bg-[#06A791]/30 text-gray-900"
      style={{ fontFamily: "'Bai Jamjuree', 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Google fonts link */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&display=swap" 
        rel="stylesheet" 
      />

      {/* Header element */}
      <header className="sticky top-0 z-50 bg-[#193E39] text-white border-b border-[#06A791]/30">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-pulse">🦋</span>
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#06A791] uppercase block">
                  Plano Estratégico de Marketing Digital
                </span>
                <h1 className="text-xl font-bold tracking-tight font-sans">
                  elife <span className="text-[#DF5CBD] font-extrabold">fitness</span>
                </h1>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase font-mono font-bold text-gray-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block" /> Live Data-Driven Studio
            </div>
          </div>

          {/* Quick Tab Selectors */}
          <nav className="flex flex-wrap gap-2 pb-1 select-none">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  id={`tab-btn-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-[#193E39] shadow-md font-extrabold"
                      : "bg-[#06A791]/15 text-white/90 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Primary container */}
      <main className="max-w-3xl mx-auto px-4 mt-6">
        {renderTabContent()}
      </main>

      {/* Simple decorative footer */}
      <footer className="text-center py-8 text-gray-400 text-[10px] font-medium max-w-lg mx-auto">
        elife fitness • Todos os direitos reservados. Projeto Idealizado e desenvolvido por <a href="https://www.orvalia.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-[#06A791] underline transition-colors">Orvalia Studio</a>
      </footer>
    </div>
  );
}
