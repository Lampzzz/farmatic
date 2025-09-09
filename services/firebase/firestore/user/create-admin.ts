import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config";

export const createAdmin = async (id: string, email: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (userDoc.exists()) {
      if (!userDoc.data()?.isAdmin) {
        return;
      }
      return;
    }

    await setDoc(doc(db, "users", id), {
      id,
      email,
      isAdmin: true,
      createdAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
