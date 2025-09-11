import { ANALYZE_GREENHOUSE_PLANT } from "@/constants";
import { generateResult } from "@/utils/ai/generate-result";
import { getBase64Data } from "@/utils/image";
import { createAnalysis } from "../firestore/plant/create-analysis";
import { isPlantImage } from "./is-image-plant";

interface Props {
  plantId: string | null;
  analyzerId: string;
  adminId: string;
  plantName: string;
  imageUri: string;
  imageType: string;
  base64?: string;
}

export const analyzePlant = async ({
  plantId,
  analyzerId,
  adminId,
  plantName,
  imageUri,
  imageType,
  base64,
}: Props) => {
  try {
    const base64Data = await getBase64Data(imageUri, base64);

    const isPlant = await isPlantImage(base64Data, imageType);
    if (!isPlant) return null;

    const result = await generateResult(
      ANALYZE_GREENHOUSE_PLANT(plantName),
      base64Data,
      imageType
    );

    await createAnalysis({
      plantId: plantId || null,
      analyzerId,
      adminId,
      analysis: { ...result, imageUrl: imageUri },
    });

    // console.log(JSON.stringify(result, null, 2));

    return result;
  } catch (err) {
    console.error("AI Error:", err);
    return null;
  }
};
