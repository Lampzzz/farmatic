import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";

interface Props {
  plantId: string | null;
  analyzerId: string;
  adminId: string;
  analysis: any;
}

export const createAnalysis = async ({
  plantId,
  analyzerId,
  adminId,
  analysis,
}: Props) => {
  try {
    const ref = collection(db, "analyses");

    await addDoc(ref, {
      plantId,
      analyzerId,
      adminId,
      analysis,
      createdAt: new Date(),
    });
  } catch (error: any) {
    console.error("Error creating analysis:", error);
  }
};
