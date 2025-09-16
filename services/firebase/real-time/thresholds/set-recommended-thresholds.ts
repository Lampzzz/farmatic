import { realTimeDB } from "@/services/firebase/config";
import { ref, set } from "firebase/database";

type Thresholds = {
  soilMoisture: number;
  lightLevel: number;
  temperature: number;
  humidity: number;
};

export const setRecommendedThresholds = async (
  zoneId: number,
  spotId: number,
  thresholds: Thresholds
) => {
  try {
    const path = `recommended_thresholds/zones/${zoneId}/spots/${spotId}`;

    await set(ref(realTimeDB, path), thresholds);

    console.log(`Thresholds set for Zone ${zoneId}, Spot ${spotId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error setting thresholds:", error);
    return { success: false, error: error.message };
  }
};
