import { model } from "@/services/firebase/config";

export const generateResult = async (
  prompt: string,
  base64Data: string,
  mimeType: string
) => {
  try {
    const resultAI = await model.generateContent([
      { text: prompt },
      { inlineData: { data: base64Data || "", mimeType } },
    ]);

    let text = resultAI.response.text().trim();
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (error: any) {
    console.error("Failed to generate result:", error.message);
    return null;
  }
};
