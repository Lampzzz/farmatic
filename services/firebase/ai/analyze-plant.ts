import { ANALYZE_GREENHOUSE_PLANT, ANALYZE_PLANT_BY_IMAGE } from "@/constants";
import { cloudinaryUpload } from "@/services/cloudinary";
import { generateResult } from "@/utils/ai/generate-result";
import { getBase64Data } from "@/utils/image";
import { createAnalysis } from "../firestore/plants/create-analysis";
import { setRecommendedThresholds } from "../real-time/thresholds";
import { isPlantImage } from "./is-image-plant";

interface Props {
  plantId: string | null;
  analyzerId: string;
  adminId: string;
  plantName: string;
  imageUri: string;
  imageType: string;
  base64?: string;
  zoneNumber?: number;
  plantSpot?: number;
  type?: "analyze" | "identify";
}

export const analyzePlant = async ({
  plantId,
  analyzerId,
  adminId,
  plantName,
  imageUri,
  imageType,
  base64,
  zoneNumber,
  plantSpot,
  type = "analyze",
}: Props) => {
  try {
    let image = null;

    if (imageUri) {
      image = await cloudinaryUpload(imageUri);
    }
    const base64Data = await getBase64Data(imageUri, base64);

    const isPlant = await isPlantImage(base64Data, imageType);
    if (!isPlant) return null;

    const result = await generateResult(
      type === "analyze"
        ? ANALYZE_GREENHOUSE_PLANT(plantName)
        : ANALYZE_PLANT_BY_IMAGE,
      base64Data,
      imageType
    );

    await createAnalysis({
      plantId: plantId || null,
      analyzerId,
      adminId,
      analysis: { ...result.analysis, imageUrl: image },
    });

    if (zoneNumber && plantSpot && result.thresholds) {
      await setRecommendedThresholds(zoneNumber, plantSpot, {
        soilMoisture: result.thresholds.sprinkler.soilMoisture,
        lightLevel: result.thresholds.light.lightLevel,
        temperature: result.thresholds.fan.temperature,
        humidity: result.thresholds.fan.humidity,
      });
    }

    return result;
  } catch (err) {
    console.error("AI Error:", err);
    return null;
  }
};
