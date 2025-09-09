import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

export const deletePlant = async (plantId: string) => {
  try {
    const plantRef = doc(db, "plants", plantId);

    await deleteDoc(plantRef);

    return { isSuccess: true, message: "Plant deleted successfully" };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
