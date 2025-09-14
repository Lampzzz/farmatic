import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config";

export const getUser = async (id: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    return { id: userDoc.id, ...userDoc.data() } as Staff | Admin;
  } catch (error: any) {
    console.log("Error getting user by id", error);
    return null;
  }
};
