import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config";

export const getPlantById = async (plantId: string) => {
  try {
    const plantRef = doc(db, "plants", plantId);
    const plantDoc = await getDoc(plantRef);

    if (plantDoc.exists()) return null;

    return {
      id: plantDoc.id,
      ...plantDoc.data(),
    };
  } catch (error: any) {
    console.error("Error getting plant by ID:", error);
    throw error;
  }
};
