import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateTitles(keyword: string): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 5 viral, high-CTR YouTube video titles for the keyword: "${keyword}". Return them as a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse titles", e);
    return [];
  }
}

export async function generateHashtags(keyword: string): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 10 trending YouTube hashtags for the keyword: "${keyword}". Include # symbol. Return them as a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse hashtags", e);
    return [];
  }
}

export async function generateDescription(keyword: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a professional, SEO-optimized YouTube video description for the topic: "${keyword}". Include a hook, a summary of the video, and a call to action. Keep it under 150 words.`,
  });

  return response.text || "";
}

export async function generateThumbnailIdeas(keyword: string): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 4 catchy, short text phrases (2-4 words each) to put on a YouTube thumbnail for a video about: "${keyword}". Return them as a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse thumbnail ideas", e);
    return [];
  }
}
