import { model } from "../config";

export const isPlantImage = async (base64Data: string, mimeType: string) => {
  try {
    const checkPrompt = `
        Determine if the provided photo is of a plant.
        Respond ONLY with "true" or "false".
    `;

    const result = await model.generateContent([
      { text: checkPrompt },
      { inlineData: { data: base64Data, mimeType } },
    ]);

    const answer = result.response.text().trim().toLowerCase();

    return answer === "true";
  } catch (error: any) {
    console.error("Plant check failed:", error.message);
    return false;
  }
};
