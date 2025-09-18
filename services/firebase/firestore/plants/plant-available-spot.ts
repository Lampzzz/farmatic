import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config";

interface Props {
  adminId: string;
  zoneNumber: number;
}

export const getPlantAvailableSpot = async ({ adminId, zoneNumber }: Props) => {
  try {
    const q = query(
      collection(db, "plants"),
      where("adminId", "==", adminId || ""),
      where("zoneNumber", "==", zoneNumber || 1)
    );
    const querySnapshot = await getDocs(q);
    const plants = querySnapshot.docs.map((doc) => doc.data());

    if (plants.length >= 3) return [];

    const allSpots = zoneNumber === 1 ? [1, 2, 3] : [4, 5, 6];
    const takenSpots = plants.map((p) => p.plantSpot);
    const available = allSpots.filter((spot) => !takenSpots.includes(spot));

    return available;
  } catch (error: any) {
    console.error("Error getting plant available spot:", error);
    return [];
  }
};
