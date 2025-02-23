import { LLM_API_URL, LLM_API_KEY } from "../config/dotenv";
import { createExtractionPrompt } from "./prompt_generator";

export const generateStructuredData = async (resumeText: string): Promise<string> => {
  const prompt = createExtractionPrompt(resumeText);

  try {
    const response = await fetch(`${LLM_API_URL}?key=${LLM_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({}));
      throw new Error(`Gemini API Error: ${errorResponse.error || response.statusText}`);
    }

    const data = await response.json();

    const candidateContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateContent) {
      throw new Error("Gemini API returned empty content.");
    }

    return candidateContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to process resume data");
  }
};
