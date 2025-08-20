import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

export interface AddStaffData {
  name: string;
  email: string;
  phoneNumber?: string;
}

export const addStaffMember = async (staffData: AddStaffData) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in to add staff");
  }

  const newStaffData = {
    name: staffData.name.trim(),
    email: staffData.email.trim().toLowerCase(),
    phoneNumber: staffData.phoneNumber?.trim() || "",
    role: "staff" as const,
    isActive: true,
    createdAt: serverTimestamp(),
    adminId: currentUser.uid,
  };

  const docRef = await addDoc(collection(db, "users"), newStaffData);
  return { id: docRef.id, ...newStaffData };
};
