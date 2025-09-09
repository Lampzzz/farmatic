import { ANALYZE_PLANT_BY_IMAGE } from "@/constants";
import { generateResult } from "@/utils/ai/generate-result";
import { getBase64Data } from "@/utils/image";
import { isPlantImage } from "./is-image-plant";

export const identifyPlant = async (
  uri: string,
  mimeType: string,
  base64?: string
) => {
  try {
    const base64Data = await getBase64Data(uri, base64);

    const isPlant = await isPlantImage(base64Data, mimeType);
    if (!isPlant) return null;

    const result = await generateResult(
      ANALYZE_PLANT_BY_IMAGE,
      base64Data,
      mimeType
    );

    return result;
  } catch (err) {
    console.error("AI Error:", err);
    return null;
  }
};
