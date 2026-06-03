import { Persona, CRMClient, UnboxingStep } from "./types";

export const COLORS = {
  darkGreen: "#193E39",
  teal: "#06A791",
  pink: "#DF5CBD",
  light: "#F2FAF9",
  offWhite: "#FAFAF8",
  gray: "#6B7280",
  lightTeal: "#E0F5F2",
  yellow: "#F59E0B",
  red: "#EF4444",
  purple: "#8B5CF6",
};

export const tabs = [
  { id: "brand", label: "🎨 Branding & Voz" },
  { id: "personas", label: "🎯 Personas" },
  { id: "swot", label: "⚡ SWOT Dinâmica" },
  { id: "4ps", label: "📦 Os 4 Ps" },
  { id: "crm", label: "👥 Segmentação de CRM" },
  { id: "plano", label: "📈 Plano & Checklist" },
  { id: "kpis", label: "📊 Simulador & ROI" },
];

export const personas: Persona[] = [
  {
    id: "ana",
    name: "Ana (A Executiva Ocupada)",
    age: "42 anos",
    role: "Gerente de Finanças / Mãe de Dois",
    emoji: "🏃‍♀️",
    color: COLORS.teal,
    bg: "#E0F5F2",
    bio: "Ana trabalha muito em Barueri/São Paulo mas mora em Indaiatuba. Sente que o corpo mudou após a maternidade. Pratica corrida de rua e funcional na Joolt 3 vezes na semana. Ela não gosta de roupas de academia exageradas ou infantis, busca sofisticação, peças que modelam o abdômen e garantem zero transparência em agachamentos.",
    pain: "Pouquíssimo tempo livre; medo de roupas transparentes; cós que fica escorregando e apertando a cintura.",
    trigger: "Anúncios em vídeo demonstrando o cós alto compressor anti-deslizamento com mulheres parecidas com ela.",
    journey: [
      { phase: "Descoberta", channel: "Reels geolocalizado de corredoras no Parque Ecológico de Indaiatuba." },
      { phase: "Atração", channel: "Lindo conteúdo focado na tecnologia do tecido premium duplo de alta compressão." },
      { phase: "Decisão", channel: "Contato direto via WhatsApp com consultoria imediata sobre tamanho e motoboy agendado." },
      { phase: "Fidelização", channel: "Cartão escrito à mão no unboxing de perfume único que gera post espontâneo no Instagram." }
    ]
  },
  {
    id: "beatriz",
    name: "Beatriz (O Bem-Estar no Pilates)",
    age: "58 anos",
    role: "Professora Aposentada / Praticante de Pilates",
    emoji: "🧘‍♀️",
    color: COLORS.pink,
    bg: "#FFF3F9",
    bio: "Beatriz faz pilates e caminhadas no Parque Ecológico. Valoriza tecidos naturais, macios, fáceis de vestir e designs elegantes que transitam entre a aula e o brunch com as amigas nos cafés tradicionais da cidade.",
    pain: "Marcas focam em público universitário; dificuldade com sites modernos de autosserviço; medo de errar tamanho online.",
    trigger: "Atendimento caloroso no WhatsApp com foto real de mulheres da sua faixa etária vestindo as roupas confortavelmente.",
    journey: [
      { phase: "Descoberta", channel: "Indicação boca a boca de amigas do estúdio de Pilates local." },
      { phase: "Atração", channel: "Amostras e exposição física exclusiva no showroom montado na Joolt." },
      { phase: "Decisão", channel: "Provador assistido com atendimento humanizado sem pressa." },
      { phase: "Fidelização", channel: "Desconto garantido em pré-vendas sazonais de novas cores." }
    ]
  },
  {
    id: "camila",
    name: "Camila (A Jovem Maratonista)",
    age: "31 anos",
    role: "Arquiteta Independente / Triatleta",
    emoji: "🚴‍♀️",
    color: COLORS.purple,
    bg: "#F5F3FF",
    bio: "Camila busca a melhor performance possível para suas maratonas de fim de semana. Quer tops de altíssima sustentação com bolsos embutidos para gel, shorts de corrida com fit firme e tecidos de secagem instantânea inteligente.",
    pain: "Falta de bolsos funcionais e costuras ásperas que causam assadura na corrida longa.",
    trigger: "Tabelas de performance com gramatura, proteção solar UV 50+ e durabilidade têxtil provada.",
    journey: [
      { phase: "Descoberta", channel: "Destaque em campeonatos de triathlon ou corrida de rua de Indaiatuba." },
      { phase: "Atração", channel: "Anúncios destacando a respirabilidade extrema e compressão seletiva por músculo." },
      { phase: "Decisão", channel: "Comodidade de compra pelo link personalizado de pagamento digital rápido." },
      { phase: "Fidelização", channel: "Inclusão no clube fechado de corrida Elife Runners." }
    ]
  }
];

export const swotActions = {
  forces: {
    title: "Como Potencializar Nossas Forças:",
    items: [
      "Alavancar a identidade sofisticada e o selo premium Elife para justificar valor agregado superior (ticket médio ~R$160) vs fast-fashion comum.",
      "Usar a parceria estratégica física na Academia Joolt para capturar o público de maior poder aquisitivo no momento de alto engajamento pré/pós-treino.",
      "Transformar o unboxing olfativo / papelaria em viral orgânico compartilhado por influenciadoras locais em Indaiatuba."
    ]
  },
  weaknesses: {
    title: "Como Mitigar Nossas Fraquezas:",
    items: [
      "Implantar o 'Fitting Room em Casa' (envio de malinhas via motoboy parceiro em Indaiatuba) para mitigar a ausência de provador de rua físico.",
      "Reforçar o atendimento personalizado pelo WhatsApp com guia de biotipos para neutralizar o receio do público mais sênior em errar a modelagem.",
      "Adotar o slogan de suporte nacional 'Ative seu Movimento' nas postagens para amadurecer e fixar a marca com significado simples."
    ]
  },
  opportunities: {
    title: "Como Capturar Oportunidades:",
    items: [
      "Mapear e patrocinar 6 micro-influenciadoras de alta conexão feminina local em Indaiatuba (obstetras, nutricionistas, decoradoras influentes).",
      "Criar o programa 'Pilates Partners' concedendo cupons especiais para estúdios parceiros que deixarem peças de amostra.",
      "Desenvolver conteúdos explicativos em vídeo abordando as queixas comuns de transpiração e as vantagens dos tecidos de alta tecnologia antiodor."
    ]
  },
  threats: {
    title: "Como Bloquear as Ameaças:",
    items: [
      "Rejeitar guerras de preço contra marcas industriais ou Shein. Educar o público no quesito 'custo por uso' (uma calça que dura 3 anos vs descartável).",
      "Garantir canais de pós-venda que dão resposta em menos de 10 minutos para formar uma barreira de lealdade indestrutível contra imitações locais.",
      "Manter o banco de dados de CRM de clientes sempre atualizado com compras históricas para oferecer campanhas preventivas personalizadas."
    ]
  }
};

export const unboxingSteps: UnboxingStep[] = [
  { 
    title: "🎁 A Caixa de Proteção", 
    desc: "Papelão reciclado kraft premium e resistente com carimbo ecológico: 'Ative seu Movimento'. Sem fita plástica barata, fita gomada customizada." 
  },
  { 
    title: "🌸 Assinatura de Aroma", 
    desc: "Ao abrir, aroma leve e relaxante de alecrim e capim-limão. Roupas envolvidas em papel de seda de alta gramatura com selo de borboleta em cera ou lacre ecológico." 
  },
  { 
    title: "✉️ Carta Nominal Escrita", 
    desc: "Nota manuscrita personalizada pelo nome da cliente, agradecendo por incentivar o movimento saudável e a jornada da marca Elife." 
  },
  { 
    title: "🏷️ Tag Explicativa Premium", 
    desc: "Nas roupas, tags sofisticadas de papel texturizado com QR Code exclusivo direcionando para guias de autocuidado e canal VIP de atendimento." 
  }
];

// Mock realistic CRM Database for Advanced Segmentation (Indaiatuba and microregion)
export const crmClients: CRMClient[] = [
  { id: "1", name: "Patrícia Menezes", age: 34, activityInterest: "Corrida", purchasedBefore: true, engagementScore: "Alta", city: "Indaiatuba", lastPurchaseDaysAgo: 14, spendAmount: 380, whatsappOptIn: true },
  { id: "2", name: "Helena de Souza", age: 53, activityInterest: "Pilates", purchasedBefore: true, engagementScore: "Alta", city: "Indaiatuba", lastPurchaseDaysAgo: 28, spendAmount: 490, whatsappOptIn: true },
  { id: "3", name: "Amanda Rodrigues", age: 41, activityInterest: "Funcional", purchasedBefore: true, engagementScore: "Média", city: "Indaiatuba", lastPurchaseDaysAgo: 45, spendAmount: 180, whatsappOptIn: true },
  { id: "4", name: "Sônia Regina", age: 62, activityInterest: "Yoga", purchasedBefore: false, engagementScore: "Alta", city: "Salto", lastPurchaseDaysAgo: 0, spendAmount: 0, whatsappOptIn: true },
  { id: "5", name: "Mariana Costa", age: 29, activityInterest: "Corrida", purchasedBefore: true, engagementScore: "Alta", city: "Campinas", lastPurchaseDaysAgo: 12, spendAmount: 620, whatsappOptIn: false },
  { id: "6", name: "Tereza Cristina", age: 57, activityInterest: "Pilates", purchasedBefore: true, engagementScore: "Média", city: "Indaiatuba", lastPurchaseDaysAgo: 90, spendAmount: 320, whatsappOptIn: true },
  { id: "7", name: "Letícia Ramos", age: 45, activityInterest: "Musculação", purchasedBefore: false, engagementScore: "Baixa", city: "Indaiatuba", lastPurchaseDaysAgo: 0, spendAmount: 0, whatsappOptIn: true },
  { id: "8", name: "Renata Abreu", age: 38, activityInterest: "Funcional", purchasedBefore: true, engagementScore: "Alta", city: "Itu", lastPurchaseDaysAgo: 18, spendAmount: 250, whatsappOptIn: true },
  { id: "9", name: "Juliana Viegas", age: 49, activityInterest: "Yoga", purchasedBefore: true, engagementScore: "Baixa", city: "Indaiatuba", lastPurchaseDaysAgo: 120, spendAmount: 190, whatsappOptIn: true },
  { id: "10", name: "Vera Lúcia Barbosa", age: 61, activityInterest: "Pilates", purchasedBefore: true, engagementScore: "Alta", city: "Indaiatuba", lastPurchaseDaysAgo: 22, spendAmount: 560, whatsappOptIn: true },
  { id: "11", name: "Cláudia Guimarães", age: 50, activityInterest: "Musculação", purchasedBefore: false, engagementScore: "Alta", city: "Salto", lastPurchaseDaysAgo: 0, spendAmount: 0, whatsappOptIn: true },
  { id: "12", name: "Karina Soares", age: 33, activityInterest: "Corrida", purchasedBefore: true, engagementScore: "Alta", city: "Indaiatuba", lastPurchaseDaysAgo: 5, spendAmount: 780, whatsappOptIn: true },
  { id: "13", name: "Isabela Negrão", age: 37, activityInterest: "Funcional", purchasedBefore: true, engagementScore: "Média", city: "Itu", lastPurchaseDaysAgo: 60, spendAmount: 210, whatsappOptIn: false },
  { id: "14", name: "Regina Scarelli", age: 55, activityInterest: "Yoga", purchasedBefore: true, engagementScore: "Alta", city: "Indaiatuba", lastPurchaseDaysAgo: 35, spendAmount: 430, whatsappOptIn: true },
  { id: "15", name: "Aline Faria", age: 43, activityInterest: "Musculação", purchasedBefore: true, engagementScore: "Baixa", city: "Indaiatuba", lastPurchaseDaysAgo: 150, spendAmount: 120, whatsappOptIn: true }
];
