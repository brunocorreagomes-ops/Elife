export interface Persona {
  id: string;
  name: string;
  age: string;
  role: string;
  emoji: string;
  color: string;
  bg: string;
  bio: string;
  pain: string;
  trigger: string;
  journey: {
    phase: string;
    channel: string;
  }[];
}

export interface SwotCategory {
  title: string;
  items: string[];
}

export interface UnboxingStep {
  title: string;
  desc: string;
}

export interface CRMClient {
  id: string;
  name: string;
  age: number;
  activityInterest: "Corrida" | "Pilates" | "Funcional" | "Yoga" | "Musculação";
  purchasedBefore: boolean;
  engagementScore: "Alta" | "Média" | "Baixa";
  city: string;
  lastPurchaseDaysAgo: number;
  spendAmount: number;
  whatsappOptIn: boolean;
}

export interface CampaignSimulationInput {
  segmentName: string;
  selectedFilterCount: number;
  adSpend: number;
  estimatedLeads: number;
  conversionRate: number;
  avgTicket: number;
}

export interface AISegmentInsight {
  headline: string;
  whatsappPitch: string;
  instagramHook: string;
  actionPlan: string;
  segmentationRecommended: string;
}
