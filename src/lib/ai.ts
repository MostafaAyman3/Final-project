import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_PRIORITY = [
  "gemini-3-pro-preview",
  "gemini-2.5-pro",
  "gemini-flash-latest",
];

const isRateOrQuotaError = (error: unknown) => {
  if (!error) return false;

  const maybeAny = error as {
    status?: number;
    code?: number;
    message?: string;
  };
  const message = maybeAny.message?.toLowerCase() ?? "";

  return (
    maybeAny.status === 429 ||
    maybeAny.code === 429 ||
    message.includes("rate limit") ||
    message.includes("resource exhausted") ||
    message.includes("quota")
  );
};

type GenerateContentPayload = Parameters<
  GoogleGenAI["models"]["generateContent"]
>[0];

export async function generateContentWithFallback(
  payload: Omit<GenerateContentPayload, "model">
) {
  let lastError: unknown;

  for (const model of MODEL_PRIORITY) {
    try {
      return await ai.models.generateContent({
        ...payload,
        model,
      });
    } catch (error) {
      lastError = error;

      if (isRateOrQuotaError(error)) {
        console.warn(
          `[AI] Model "${model}" failed due to rate/quota limits. Trying next fallback.`
        );
        continue;
      }

      throw error;
    }
  }

  throw lastError ?? new Error("All Gemini models failed.");
}
