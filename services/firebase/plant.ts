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
import { db } from "./config";

export const addPlant = async (
  data: Pick<Plant, "name" | "imageUrl" | "datePlanted">,
  userId: string
) => {
  try {
    const ref = collection(db, "plants");

    await addDoc(ref, {
      ...data,
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

    // Query plants for the specific user, ordered by creation date
    const q = query(
      plantsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    // Set up real-time listener
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

    // Return unsubscribe function so caller can clean up
    return unsubscribe;
  } catch (error: any) {
    console.error("Error setting up plants listener:", error);
    if (onError) {
      onError(error);
    }
    return () => {}; // Return empty function if setup fails
  }
};

// Alternative function without user filtering (gets all plants)
export const getAllPlantsRealtime = (
  callback: (plants: Plant[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    const plantsRef = collection(db, "plants");

    // Query all plants, ordered by creation date
    const q = query(plantsRef, orderBy("createdAt", "desc"));

    // Set up real-time listener
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

    // Return unsubscribe function so caller can clean up
    return unsubscribe;
  } catch (error: any) {
    console.error("Error setting up plants listener:", error);
    if (onError) {
      onError(error);
    }
    return () => {}; // Return empty function if setup fails
  }
};

// Get a single plant by ID
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

// Delete a plant by ID
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
