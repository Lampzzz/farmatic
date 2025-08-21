import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { uploadToCloudinary } from "../cloudinary";
import { db } from "./config";

export const addPlant = async (
  data: Pick<Plant, "name" | "imageUrl" | "datePlanted">,
  userId: string
) => {
  try {
    let imageUrl = null;
    if (data.imageUrl) {
      imageUrl = await uploadToCloudinary(data.imageUrl);
    }

    const ref = collection(db, "plants");

    await addDoc(ref, {
      ...data,
      imageUrl,
      userId,
      createdAt: Timestamp.now(),
    });

    return { isSuccess: true, message: "Plant added successfully" };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getPlantsRealtime = (
  userId: string,
  callback: (plants: Plant[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    const plantsRef = collection(db, "plants");

    const q = query(
      plantsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const plants: Plant[] = [];
        snapshot.forEach((doc) => {
          plants.push({
            id: doc.id,
            ...doc.data(),
          } as Plant);
        });
        callback(plants);
      },
      (error) => {
        console.error("Error getting plants:", error);
        if (onError) {
          onError(error);
        }
      }
    );

    return unsubscribe;
  } catch (error: any) {
    console.error("Error setting up plants listener:", error);
    if (onError) {
      onError(error);
    }

    return () => {};
  }
};

export const getAllPlantsRealtime = (
  callback: (plants: Plant[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    const plantsRef = collection(db, "plants");

    const q = query(plantsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const plants: Plant[] = [];
        snapshot.forEach((doc) => {
          plants.push({
            id: doc.id,
            ...doc.data(),
          } as Plant);
        });
        callback(plants);
      },
      (error) => {
        console.error("Error getting plants:", error);
        if (onError) {
          onError(error);
        }
      }
    );

    return unsubscribe;
  } catch (error: any) {
    console.error("Error setting up plants listener:", error);
    if (onError) {
      onError(error);
    }
    return () => {};
  }
};

export const getPlantById = async (plantId: string): Promise<Plant | null> => {
  try {
    const plantRef = doc(db, "plants", plantId);
    const plantDoc = await getDoc(plantRef);

    if (plantDoc.exists()) {
      return {
        id: plantDoc.id,
        ...plantDoc.data(),
      } as Plant;
    }

    return null;
  } catch (error: any) {
    console.error("Error getting plant by ID:", error);
    throw error;
  }
};

export const deletePlant = async (
  plantId: string
): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    const plantRef = doc(db, "plants", plantId);
    await deleteDoc(plantRef);
    return { isSuccess: true, message: "Plant deleted successfully" };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error?.message || "Failed to delete plant",
    };
  }
};
