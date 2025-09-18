import { getFirebaseErrorMessage } from "@/utils/firebase";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, auth, db } from "../../config";

export interface CreateStaffData {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export const createStaff = async (staffData: CreateStaffData) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("You must be logged in to add staff");
    }

    const newStaffData = {
      name: staffData.name.trim(),
      email: staffData.email.trim().toLowerCase(),
      phoneNumber: staffData.phoneNumber?.trim() || "",
      isAdmin: false,
      isActive: true,
      createdAt: new Date(),
      adminId: currentUser.uid,
    };

    const secondaryApp = initializeApp(app.options, "Secondary");
    const staffAuth = getAuth(secondaryApp);

    const userCredential = await createUserWithEmailAndPassword(
      staffAuth,
      staffData.email,
      staffData.password
    );

    await signOut(staffAuth);

    const userDocRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userDocRef, newStaffData);

    return { id: userCredential.user.uid, ...newStaffData };
  } catch (error: any) {
    if (error.code) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  }
};
