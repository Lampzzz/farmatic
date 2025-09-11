import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config";

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
