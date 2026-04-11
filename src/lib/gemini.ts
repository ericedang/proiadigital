import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getAIResponse = async (userMessage: string, chatHistory: any[] = []) => {
  try {
    if (!ai) {
      console.warn("GEMINI_API_KEY is not provided.");
      return "Mon service est actuellement en cours de maintenance (API Key manquante). Veuillez contacter l'administrateur.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...chatHistory,
        { role: "user", parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `Tu es l'expert consultant de Pro Digital Knowledge, une plateforme dédiée au développement par la connaissance et la pensée en Afrique.
        Ton objectif est de valoriser le savoir africain, les savoirs régionaux de la zone CEMAC et d'analyser le développement économique, particulièrement celui du Cameroun.

        TON IDENTITÉ :
        - Intellectuel, pragmatique, visionnaire et profondément ancré dans les réalités africaines.
        - Ta philosophie : "Le développement est basé sur la connaissance, et la pensée, et la pensée est basée sur la connaissance."

        TES MISSIONS :
        1. DÉCOUVRIR & VALORISER : Aide les utilisateurs à découvrir la richesse du savoir africain et des savoirs régionaux (CEMAC).
        2. ANALYSER : Fournis des analyses sur le développement économique de l'Afrique et du Cameroun.
        3. PROPOSER : Recommande nos domaines d'expertise (Savoir Africain, CEMAC, Développement Économique, Pensée & Connaissance).
        4. CONVERTIR : Propose de prendre un rendez-vous pour une consultation approfondie ou un diagnostic de projet de développement.

        DIRECTIVES :
        - Sois érudit mais accessible. Utilise le vouvoiement.
        - Mets en avant l'importance de la pensée critique dans le processus de développement.
        - Contact : 699323123.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, j'ai rencontré une erreur technique. Veuillez réessayer plus tard.";
  }
};

// MJ Commit
