import { ref, set } from "firebase/database";
import { realTimeDB } from "../../config";

export const toggleController = async (
  zoneNumber: number,
  type: "fan" | "light" | "sprinkler",
  plantSpot?: number,
  currentValue?: boolean
) => {
  try {
    const path =
      type === "sprinkler"
        ? `controllers/zones/${zoneNumber}/sprinklers/${plantSpot}`
        : `controllers/zones/${zoneNumber}/${type}`;

    const controllerRef = ref(realTimeDB, path);

    await set(controllerRef, !currentValue);
  } catch (err) {
    console.error("Error toggling controller:", err);
  }
};
