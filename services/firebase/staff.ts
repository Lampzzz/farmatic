import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { app, auth, db } from "./config";

export interface CreateStaffData {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export const createStaffMember = async (staffData: CreateStaffData) => {
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

  const staffAuth = getAuth(app);

  const userCredential = await createUserWithEmailAndPassword(
    staffAuth,
    staffData.email,
    staffData.password
  );

  await signOut(staffAuth);

  const userDocRef = doc(db, "users", userCredential.user.uid);
  await setDoc(userDocRef, newStaffData);

  return { id: userCredential.user.uid, ...newStaffData };
};
