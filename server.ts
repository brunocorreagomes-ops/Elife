import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI securely on the server
// Note: User-Agent set to 'aistudio-build' is required for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for marketing campaign generation using Gemini 3.5 Flash
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { segmentName, segmentCount, directive } = req.body;

    const systemInstruction = 
      "Você é o Diretor Estratégico de Marketing Digital da Elife Fitness, especializado em estratégias baseadas em dados (data-driven), CRM e comunicação humanizada para o público feminino maduro (30 a 60 anos) em Indaiatuba/SP. " +
      "Seu tom de voz deve ser elegante, sofisticado, motivador, empático, sério e de alto valor percebido. " +
      "Evite termos infantis ou clichês de academia jovem (gírias, fofuras) e valorize a segurança física, costuras acolhedoras e a modelagem real.";

    const promptMessage = 
      `Gere uma campanha tática para o seguinte segmento de público do CRM: "${segmentName}" (${segmentCount} contatos identificados).\n` +
      `Diretriz adicional do usuário: "${directive || "Aumentar a conversão focando em bem-estar e experimentar as calças..."}"\n\n` +
      `Gere obrigatoriamente um objeto em JSON no formato especificado contendo:\n` +
      `1. headline: Um título ou tema chamativo e de alto impacto para a campanha.\n` +
      `2. whatsappPitch: Uma mensagem calorosa, direta e impecavelmente elegante para disparo no WhatsApp (use placeholders como [Nome] se necessário).\n` +
      `3. instagramHook: Uma ideia concisa e poderosa para post ou Reels (descrevendo imagens recomendadas e uma fala de impacto).\n` +
      `4. actionPlan: Um plano tático de distribuição física ou anúncio geolocalizado em Indaiatuba (ex: Parque Ecológico, condomínios premium, Joolt).\n` +
      `5. segmentationRecommended: Recomendações de palavras-chave de interesse para segmentar anúncios pagos no Facebook/Instagram Ads.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { 
              type: Type.STRING, 
              description: "Um título ou slogan chamativo para a campanha tática." 
            },
            whatsappPitch: { 
              type: Type.STRING, 
              description: "Mensagem persuasiva e acolhedora de abordagem individualizada no WhatsApp." 
            },
            instagramHook: { 
              type: Type.STRING, 
              description: "Proposta criativa de conteúdo no Instagram Reels com roteiro." 
            },
            actionPlan: { 
              type: Type.STRING, 
              description: "Tática física de ativação ou panfletagem no showroom." 
            },
            segmentationRecommended: { 
              type: Type.STRING, 
              description: "Termos e filtros ideais para aplicar no gerenciador de negócios do Meta Ads." 
            }
          },
          required: ["headline", "whatsappPitch", "instagramHook", "actionPlan", "segmentationRecommended"]
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("Resposta vazia da inteligência artificial.");
    }

    const insightData = JSON.parse(outputText.trim());
    res.json({ success: true, insight: insightData });

  } catch (err: any) {
    console.error("AI Generation Error:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message || "Erro interno na geração de inteligência artificial de marketing." 
    });
  }
});

// Setup Vite Development Middleware or Production Static Assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running securely at http://localhost:${PORT}`);
  });
}

setupServer();
export default app;
