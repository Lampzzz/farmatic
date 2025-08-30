import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { app, auth, db } from "./config";

export interface UpdateUserData {
  name: string;
  email: string;
  phoneNumber?: string;
}

// Update user profile
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

// Create admin account
export const createAdmin = async (id: string, email: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (userDoc.exists()) {
      if (!userDoc.data()?.isAdmin) {
        return;
      }
      return;
    }

    await setDoc(doc(db, "users", id), {
      id,
      email,
      isAdmin: true,
      createdAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fetch user by id
export const getUserById = async (id: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    return { id: userDoc.id, ...userDoc.data() } as Staff | Admin;
  } catch (error: any) {
    console.log("Error getting user by id", error);
    return null;
  }
};

export interface CreateStaffData {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

// Create staff member
export const createStaffMember = async (staffData: CreateStaffData) => {
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
};

// Fetch all staff members
export const fetchAllStaffMembers = async (adminId: string) => {
  try {
    const staffQuery = query(
      collection(db, "users"),
      where("adminId", "==", adminId),
      where("isAdmin", "==", false)
    );

    const querySnapshot = await getDocs(staffQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error: any) {
    console.log("Error fetching all staff members", error);
    return [];
  }
};
