import * as FileSystem from "expo-file-system";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { uploadToCloudinary } from "../cloudinary";
import { db, model } from "./config";
import { createController } from "./controller";

export const addPlant = async (
  data: Pick<Plant, "name" | "imageUrl" | "datePlanted" | "zoneNumber">,
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
      createdAt: new Date(),
    });

    await createController(userId, data.zoneNumber);

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

export interface PlantAnalysis {
  scientific_name: string;
  common_name: string;
  description: string;
  healthStatus: string;
}

async function isPlantImage(
  base64Data: string,
  mimeType: string
): Promise<boolean> {
  try {
    const checkPrompt = `
      Determine if the provided photo is of a plant.
      Respond ONLY with "true" or "false".
    `;

    const result = await model.generateContent([
      { text: checkPrompt },
      { inlineData: { data: base64Data, mimeType } },
    ]);

    const answer = result.response.text().trim().toLowerCase();
    return answer === "true";
  } catch (err) {
    console.error("Plant check failed:", err);
    return false;
  }
}

export async function analyzePlantHealth(
  plantName: string,
  uri: string,
  mimeType: string,
  base64?: string
): Promise<string | null> {
  try {
    let base64Data: string | undefined = base64;

    if (!base64Data && uri) {
      base64Data = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }

    const isPlant = await isPlantImage(base64Data || "", mimeType);

    if (!isPlant) return null;

    const prompt = `
      You are a plant expert.
      Analyze the provided photo of a ${plantName}.
      Respond ONLY with plain text.
      Write a clear description of the plant's current condition
      in 3-5 sentences.
      Avoid JSON, bullet points, or extra formatting.
    `;

    const resultAI = await model.generateContent([
      { text: prompt },
      { inlineData: { data: base64Data || "", mimeType } },
    ]);

    const text = resultAI.response.text().trim();

    return text;
  } catch (err) {
    console.error("AI Error:", err);
    return "Failed to analyze the plant's condition.";
  }
}

export async function analyzePlantImage(
  uri: string,
  mimeType: string,
  base64?: string
): Promise<PlantAnalysis> {
  try {
    let base64Data: string | undefined = base64;

    if (!base64Data && uri) {
      base64Data = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }

    const isPlant = await isPlantImage(base64Data || "", mimeType);
    if (!isPlant) {
      return {
        scientific_name: "N/A",
        common_name: "Not a Plant",
        description: "The uploaded photo does not appear to be a plant.",
        healthStatus: "Unknown",
      };
    }

    const prompt = `
      You are a plant expert.
      Analyze the provided plant photo.
      Respond ONLY with valid JSON.
      Must include: "scientific_name", "common_name", "description", "healthStatus".
      Keep description 1-2 sentences.
      Health status must be one of: Healthy, Sick, Growing, Needs Attention
    `;

    const resultAI = await model.generateContent([
      { text: prompt },
      { inlineData: { data: base64Data || "", mimeType } },
    ]);

    let text = resultAI.response.text().trim();
    text = text.replace(/```json|```/g, "").trim();

    let data;
    try {
      data = JSON.parse(text || "{}");
    } catch {
      data = {
        scientific_name: "Unknown",
        common_name: "Unknown",
        description: "Could not parse analysis.",
        healthStatus: "Unknown",
      };
    }

    return data;
  } catch (err) {
    console.error("AI Error:", err);
    return {
      scientific_name: "Unknown",
      common_name: "Unknown",
      description: "Failed to analyze image.",
      healthStatus: "Unknown",
    };
  }
}

export const togglePlantBookmark = async (
  userId: string,
  plantId: string,
  plantName: string,
  plantImageUrl: string
) => {
  try {
    const bookmarksRef = collection(db, "plantBookmarks");

    const q = query(
      bookmarksRef,
      where("userId", "==", userId),
      where("plant.id", "==", plantId)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(docSnap.ref);
      });
    } else {
      await addDoc(bookmarksRef, {
        plant: {
          id: plantId,
          name: plantName,
          imageUrl: plantImageUrl,
        },
        userId,
        createdAt: new Date(),
      });
    }
  } catch (error: any) {
    console.error("Error toggling plant bookmark:", error);
    throw error;
  }
};
