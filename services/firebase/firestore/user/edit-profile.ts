import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config";

export interface UpdateUserData {
  name: string;
  email: string;
  phoneNumber?: string;
}

export const editProfile = async (userId: string, userData: UpdateUserData) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in to update profile");
  }

  const currentUserDocRef = doc(db, "users", currentUser.uid);
  const currentUserDoc = await getDoc(currentUserDocRef);

  if (!currentUserDoc.exists()) {
    throw new Error("Current user data not found");
  }

  const currentUserData = currentUserDoc.data();
  const isAdmin = currentUserData.isAdmin;
  const isOwnProfile = currentUser.uid === userId;

  if (!isOwnProfile && !isAdmin) {
    throw new Error("You don't have permission to edit this profile");
  }

  if (isAdmin && !isOwnProfile) {
    const targetUserDocRef = doc(db, "users", userId);
    const targetUserDoc = await getDoc(targetUserDocRef);

    if (targetUserDoc.exists()) {
      const targetUserData = targetUserDoc.data();
      if (targetUserData.isAdmin) {
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
