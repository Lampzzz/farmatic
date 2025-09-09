import { ANALYZE_GREENHOUSE_PLANT } from "@/constants";
import { generateResult } from "@/utils/ai/generate-result";
import { getBase64Data } from "@/utils/image";
import { isPlantImage } from "./is-image-plant";

export const analyzePlant = async (
  plantName: string,
  uri: string,
  mimeType: string,
  base64?: string
) => {
  try {
    const base64Data = await getBase64Data(uri, base64);

    const isPlant = await isPlantImage(base64Data, mimeType);
    if (!isPlant) return null;

    const result = await generateResult(
      ANALYZE_GREENHOUSE_PLANT(plantName),
      base64Data,
      mimeType
    );

    return result;
  } catch (err) {
    console.error("AI Error:", err);
    return null;
  }
};
