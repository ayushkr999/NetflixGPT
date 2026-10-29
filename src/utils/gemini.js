import { GoogleGenAI } from "@google/genai";
import { getEnv } from "./constant.js";

const SYSTEM_INSTRUCTION = `You are an intelligent movie recommendation assistant powered by Google Gemini.

Understand the user's movie request and recommend relevant real movie titles.

Return ONLY valid JSON in this format:

{
  "movies": ["Movie 1", "Movie 2", "Movie 3"]
}

Recommend real movies.
Never invent movie titles.
Do not return descriptions, ratings, posters, URLs, or IMDb IDs.
Return between 5 and 10 movie titles.`;

/**
 * Cleans markdown code fences and returns pure string
 */
const cleanJsonFence = (rawText = "") => {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/i, "").replace(/```\s*$/i, "");
  }
  return cleaned.trim();
};

/**
 * Requests movie recommendations from Gemini using natural language in English, Hindi, or Spanish.
 * Returns an array of real movie title strings.
 *
 * @param {string} userQuery
 * @returns {Promise<string[]>} Array of 5-10 movie titles
 */
export const recommendMoviesWithGemini = async (userQuery) => {
  const query = userQuery?.trim();
  if (!query) {
    throw new Error("Please enter a query or description for movie recommendations.");
  }

  const apiKey = getEnv("REACT_APP_GEMINI_API_KEY");
  if (!apiKey || apiKey === "your_gemini_api_key") {
    throw new Error(
      "Gemini API key is not configured. Please add your REACT_APP_GEMINI_API_KEY in the .env file."
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const contents = `User movie request (can be English, Hindi, Spanish, etc.): "${query}"
Recommend 5 to 10 relevant real movie titles that best match this intent.
Return strictly the JSON object: {"movies": ["Title 1", "Title 2", ...]}`;

    const modelName = getEnv("REACT_APP_GEMINI_MODEL", "gemini-3.8-flash");

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const rawText =
      response?.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    const cleanedText = cleanJsonFence(rawText);

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch {
      // Regex extraction fallback
      const jsonMatch = cleanedText.match(/\{[\s\S]*"movies"[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Malformed JSON received from AI model.");
      }
    }

    if (!parsed || !Array.isArray(parsed.movies)) {
      throw new Error("Invalid recommendation format returned by Gemini.");
    }

    // Sanitize and filter titles
    const titles = parsed.movies
      .map((title) => (typeof title === "string" ? title.trim() : ""))
      .filter((title) => title.length > 0)
      .slice(0, 10);

    if (titles.length === 0) {
      throw new Error("No movie titles returned. Please try rephrasing your search.");
    }

    return titles;
  } catch (error) {
    console.error("Gemini API Error:", error);

    let message = error?.message || "";
    try {
      const parsedErr = JSON.parse(message);
      if (parsedErr?.error?.message) {
        message = parsedErr.error.message;
      }
    } catch {}

    if (message.includes("API key not valid") || message.includes("UNAUTHENTICATED")) {
      throw new Error("Invalid Gemini API key. Please check your REACT_APP_GEMINI_API_KEY.");
    }
    if (message.includes("quota") || message.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("Gemini API rate limit exceeded. Please try again in a few moments.");
    }
    if (message.includes("NetworkError") || message.includes("Failed to fetch")) {
      throw new Error("Network connection error. Please verify your internet connection.");
    }
    if (message.startsWith("Gemini API key is not configured") || message.startsWith("Please enter")) {
      throw error;
    }

    throw new Error(message || "AI recommendations are temporarily unavailable. Please try again.");
  }
};

export default recommendMoviesWithGemini;
