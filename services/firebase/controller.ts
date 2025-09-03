import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const createController = async (userId: string, zoneNumber: number) => {
  try {
    const controllerRef = collection(db, "controllers");

    await addDoc(controllerRef, {
      userId,
      zoneNumber,
      fan: false,
      light: false,
      sprinkler: false,
      createdAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const toggleController = async (
  id: string,
  value: boolean,
  name: string
) => {
  try {
    const controllerDocRef = doc(db, "controllers", id);
    await updateDoc(controllerDocRef, { [name]: value });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
