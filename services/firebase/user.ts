import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./config";

export interface UpdateUserData {
  name: string;
  email: string;
  phoneNumber?: string;
}

export const updateUserProfile = async (
  userId: string,
  userData: UpdateUserData
) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in to update profile");
  }

  // Get current user's data to check role
  const currentUserDocRef = doc(db, "users", currentUser.uid);
  const currentUserDoc = await getDoc(currentUserDocRef);

  if (!currentUserDoc.exists()) {
    throw new Error("Current user data not found");
  }

  const currentUserData = currentUserDoc.data();
  const isAdmin = currentUserData.role === "admin";
  const isOwnProfile = currentUser.uid === userId;

  // Only allow editing own profile or if admin editing staff profile
  if (!isOwnProfile && !isAdmin) {
    throw new Error("You don't have permission to edit this profile");
  }

  // If admin is editing staff profile, ensure they're not editing another admin
  if (isAdmin && !isOwnProfile) {
    const targetUserDocRef = doc(db, "users", userId);
    const targetUserDoc = await getDoc(targetUserDocRef);

    if (targetUserDoc.exists()) {
      const targetUserData = targetUserDoc.data();
      if (targetUserData.role === "admin") {
        throw new Error("Admins cannot edit other admin profiles");
      }
    }
  }

  const updatedData = {
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    phoneNumber: userData.phoneNumber?.trim() || "",
  };

  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, updatedData);

  return { id: userId, ...updatedData };
};

export const createAdmin = async (id: string, email: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (userDoc.exists()) return;

    await setDoc(doc(db, "users", id), {
      id,
      email,
      isAdmin: true,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
