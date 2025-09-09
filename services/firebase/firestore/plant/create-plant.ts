import { cloudinaryUpload } from "@/services/cloudinary";
import { addDoc, collection } from "firebase/firestore";

export const createPlant = async (data: PlantData, userId: string) => {
  try {
    let imageUrl = null;

    if (data.imageUrl) {
      imageUrl = await cloudinaryUpload(data.imageUrl);
    }

    const ref = collection(db, "plants");

    await createController(userId, data.zoneNumber);

    const analysis = await analyzePlant(
      data.name,
      data.imageUrl,
      data.imageType
    );

    await addDoc(ref, {
      ...data,
      imageUrl,
      userId,
      createdAt: new Date(),
      analysis,
    });

    return { isSuccess: true, message: "Plant added successfully" };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
