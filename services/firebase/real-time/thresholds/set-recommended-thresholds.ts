import { realTimeDB } from "@/services/firebase/config";
import { ref, set } from "firebase/database";

interface Thresholds {
  soilMoisture: number;
  lightLevel: number;
  temperature: number;
  humidity: number;
}

export const setRecommendedThresholds = async (
  zoneNumber: number,
  plantSpot: number,
  thresholds: Thresholds
) => {
  try {
    const path = `thresholds/zones/${zoneNumber}/spots/${plantSpot}`;

    await set(ref(realTimeDB, path), thresholds);

    return { success: true };
  } catch (error: any) {
    console.error("Error setting thresholds:", error);
    return { success: false, error: error.message };
  }
};
