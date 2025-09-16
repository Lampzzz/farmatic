import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config";

export const getPlantAvailableSpot = async ({
  adminId,
  zoneNumber,
}: {
  adminId: string;
  zoneNumber: number;
}) => {
  try {
    const q = query(
      collection(db, "plants"),
      where("adminId", "==", adminId || ""),
      where("zoneNumber", "==", zoneNumber || 1)
    );
    const querySnapshot = await getDocs(q);
    const plants = querySnapshot.docs.map((doc) => doc.data());

    if (plants.length >= 6) {
      return [];
    }

    const allSpots = [1, 2, 3];
    const takenSpots = plants.map((p) => p.plantSpot);
    const available = allSpots.filter((spot) => !takenSpots.includes(spot));

    return available;
  } catch (error: any) {
    console.error("Error getting plant available spot:", error);
    return [];
  }
};
