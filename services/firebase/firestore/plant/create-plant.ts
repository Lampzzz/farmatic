import { cloudinaryUpload } from "@/services/cloudinary";
import { addDoc, collection } from "firebase/firestore";
import { analyzePlant } from "../../ai";
import { db } from "../../config";
import { createController } from "../../controller";

export const createPlant = async (data: any, userId: string) => {
  try {
    let imageUrl = null;

    if (data.imageUrl) {
      imageUrl = await cloudinaryUpload(data.imageUrl);
    }

    const ref = collection(db, "plants");

    const plantRef = await addDoc(ref, {
      ...data,
      imageUrl,
      userId,
      createdAt: new Date(),
    });

    const plantId = plantRef.id;

    await createController(userId, data.zoneNumber);

    await analyzePlant({
      plantId,
      analyzerId: userId,
      adminId: userId,
      plantName: data.name,
      imageUri: data.imageUrl,
      imageType: data.imageType,
    });

    return { isSuccess: true, message: "Plant added successfully" };
  } catch (error: any) {
    console.error("Error creating plant:", error);
    return { isSuccess: false, message: error.message };
  }
};
