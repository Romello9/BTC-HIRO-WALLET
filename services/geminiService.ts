
import { GoogleGenAI } from "@google/genai";

// IMPORTANT: The API key is sourced from environment variables.
// Do not hardcode or expose it in the client-side code.
// This service assumes `process.env.API_KEY` is available in the execution environment.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

/**
 * Generates a text response from the Gemini model for a given prompt.
 * @param prompt The text prompt to send to the model.
 * @returns A promise that resolves to the model's text response.
 */
export async function getGeminiResponse(prompt: string): Promise<string> {
  if (!apiKey) {
    return "Error: Gemini API key not configured.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Errore Gemini API:', error);
    if (error instanceof Error) {
        return `Error calling Gemini API: ${error.message}`;
    }
    return "An unknown error occurred with the Gemini API.";
  }
}

/**
 * Sends transaction data to the Gemini model for analysis and insights.
 * @param txData An object containing transaction data.
 * @returns A promise that resolves to the model's analysis.
 */
export async function analyzeTransaction(txData: any): Promise<string> {
  const prompt = `Analizza questa transazione Bitcoin/Stacks e fornisci insights in italiano. Spiega cosa sta succedendo in termini semplici, identifica eventuali rischi o punti di interesse e riassumi l'impatto sul wallet. Dati transazione: ${JSON.stringify(txData, null, 2)}`;
  return getGeminiResponse(prompt);
}
